import express from 'express';

import { protect, restrictTo } from '../controller/authController.js';
import {
  createBooking,
  deleteBooking,
  getAllBooking,
  getBooking,
  getCheckoutSession,
  updateBooking,
} from '../controller/bookingController.js';

const router = express.Router({ mergeParams: true });

router.use(protect);

router.get('/checkout-session/:tourID', getCheckoutSession);

router.use(restrictTo('admin', 'lead-guide'));

router.route('/').
    get(getAllBooking)
    .post(createBooking);

router.route('/:id').get(getBooking).patch(updateBooking).delete(deleteBooking);

export default router;
