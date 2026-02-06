import mongoose from "mongoose";
import asyncHandler from 'express-async-handler';


import AppError from '../utils/appError.js';


// Create One -----------------------------------------------------------------------------------
export const createOne = (Model) =>
  asyncHandler(async (req, res, next) => {

    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

// Get All -----------------------------------------------------------------------------------
  export const getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
      const docs = await Model.find().select('-__v');
        res.status(200).json({
          status: 'success',
          results: docs.length,
          data: {
            data: docs,
          },
        });
  });

// Get One -----------------------------------------------------------------------------------
export const getOne = (Model, popOptions) =>
  asyncHandler(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
  // Update One -----------------------------------------------------------------------------------
  export const updateOne = (Model) =>
    asyncHandler(async (req, res, next) => {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!doc) {
        return next(new AppError('No document found with that ID', 404));
      }
      res.status(200).json({
        status: 'success',
        data: {
          data: doc,
        },
      });
    });

// Delete One -----------------------------------------------------------------------------------
export const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

// Delete All -----------------------------------------------------------------------------------
export const deleteAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.deleteMany();
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

