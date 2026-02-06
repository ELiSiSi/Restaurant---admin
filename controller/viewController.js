import mongoose from 'mongoose';

import Meal from '../models/mealModel.js';
import Offer from '../models/offerModel.js';
import AppError from '../utils/appError.js';


// homepage -----------------------------------------------------------------------------------
export const homepage = async (req, res, next) => {
  try {
    const meals = await Meal.find();
    res.status(200).render('home', {
      meals,
      title: 'Home',
    });
  } catch (err) {
    return next(new AppError('No document found with that ID', 404));
  }
};

//  menupage -----------------------------------------------------------------------------------
export const menupage = async (req, res, next) => {
  try {
    const meals = await Meal.find();
    res.status(200).render('menu', {
      meals,
      title: 'Menu',
    });
  } catch (err) {
    return next(new AppError('No document found with that ID', 404));
  }
};

// offersPage -----------------------------------------------------------------------------------
 export const offersPage = async (req, res, next) => {
  try {
    const offers = await Offer.find();


    res.status(200).render('offers', {
      offersList: offers,
      title: 'Offers',
    });
  } catch (err) {
    console.error('❌ Error:', err); // 👈 وهذا
    return next(new AppError('Failed to load offers page', 500));
  }
};


// cartpage -----------------------------------------------------------------------------------
export const cartpage = async (req, res, next) => {
  try {
     res.status(200).render('cart', {
       title: 'Cart',
    });
  } catch (err) {
    return next(new AppError('No document found with that ID', 404));
  }
};




