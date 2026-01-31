import { protect, isLoggedIn  } from '../controller/authController.js';

import express from 'express';
const router = express.Router();

import {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
  updateUserData,
  getMyTours,
  getSignupForm,
} from '../controller/viewController.js';

import { createBookingCheckout } from '../controller/bookingController.js';


router.get('/', createBookingCheckout, isLoggedIn, getOverview);
router.get('/tour/:slug', isLoggedIn, getTour);
router.get('/login', isLoggedIn, getLoginForm);
router.get('/singup', isLoggedIn, getSignupForm);
router.get('/me', protect, getAccount);
router.get('/my-tours', protect, getMyTours);
router.post('/submit-user-data', protect, updateUserData);

export default router;
