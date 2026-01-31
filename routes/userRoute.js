import express from 'express';

import {
  forgotPassword,
  login,
  logout,
  protect,
  resetPassword,
  restrictTo,
  signup,
  updatePassword,
} from '../controller/authController.js';

import {
  createUser,
  deleteMe,
  deleteUser,
  getMe,
  getUserById,
  getUsers,
  updateMe,
  updateUser,
  uploadUserPhoto,
  resizeUserPhoto,
} from '../controller/userController.js';

 const router = express.Router();

// ============================================
// Public Routes (لا تحتاج authentication)
// ============================================
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// ============================================
// Protected Routes (تحتاج authentication)
// ============================================
router.use(protect);

router.patch('/updatePassword', updatePassword);
router.get('/me', getMe, getUserById);
router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);
router.delete('/deleteMe', deleteMe);

// ============================================
// Admin/Lead-Guide Only Routes
// ============================================
router.use(restrictTo('admin', 'lead-guide'));

router.route('/')
  .get(getUsers)
  .post(createUser);

// ⚠️ هذا الـ route يجب أن يكون الأخير!
router.route('/:id')
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

export default router;
