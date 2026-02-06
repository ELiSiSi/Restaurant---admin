import express from 'express';
import AppError from '../utils/appError.js';

//---------------------------------------------------------------------------------------------------
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

//---------------------------------------------------------------------------------------------------
const handleDuplicateFieldsDB = (err) => {
  if (!err.keyValue) {
    return new AppError('Duplicate field value detected!', 400);
  }
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field] || 'unknown';
  const message = `Duplicate field value: "${value}". Please use another value for ${field}!`;

  return new AppError(message, 400);
};

//---------------------------------------------------------------------------------------------------
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

//---------------------------------------------------------------------------------------------------
const handleJWTError = () => {
  return new AppError('The user no longer exists.', 401); // ✅ Add return
};

//---------------------------------------------------------------------------------------------------
const handleJWTExpiredError = () => {
  return new AppError(' your Token has expired !!! please log in again ', 401);
};

//---------------------------------------------------------------------------------------------------
const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    // ← ده اللي هيشتغل لو الـ URL مش /api
    res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  }
};

//---------------------------------------------------------------------------------------------------
const sendErrorPro = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

//---------------------------------------------------------------------------------------------------
export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = err;
    error.message = err.message;

    if (err.name === 'CastError') {
      error = handleCastErrorDB(err);
    } else if (err.code === 11000) {
      error = handleDuplicateFieldsDB(err);
    } else if (err.name === 'ValidationError') {
      error = handleValidationErrorDB(err);
    } else if (err.name === 'jsonWebTokenError') {
      error = handleJWTError();
    } else if (err.name === 'TokenExpiredError') {
      error = handleJWTExpiredError();
    }

    sendErrorPro(error, res);
  }
};
