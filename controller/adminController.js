import Meal from '../models/mealModel.js';
import Offer from '../models/offerModel.js';
import Order from '../models/orderModel.js';
import AppError from '../utils/appError.js';


// loginAdmin -----------------------------------------------------------------------------------
export const loginAdmin = async (req, res, next) => {
  try {
    res.status(200).render('admin/login', {
      title: 'Admin Login',
    });
  } catch (err) {
    return next(new AppError('No document found with that ID', 404));
  }
};

// adminPage -----------------------------------------------------------------------------------
export const adminPage = async (req, res, next) => {
  try {
    const { password } = req.params;

    if (password === process.env.ADMIN_PASSWORD) {
      const meals = await Meal.find();
      const offers = await Offer.find();
      const orders = await Order.find().sort({ createdAt: -1 });
      const ordersDone = await Order.find({ status: 'done'  }).sort({ createdAt: -1 });

      const totalRevenue = orders.reduce(
        (sum, order) => sum + (order.totalPrice || 0),
        0
      );

      res.render('admin/dashboard', {
        title: ' Dashboard',
        meals: meals || [],
        offers: offers || [],
        orders: orders || [],
        ordersDone: ordersDone || [],
        totalRevenue: totalRevenue || 0,
      });
    } else {
      res.render('admin/login', {
        title: 'Admin Login',
        error: 'الرقم السري غير صحيح',
      });
    }
  } catch (err) {
    console.error('Error in adminPage:', err);
    return next(new AppError('خطأ في تحميل لوحة التحكم', 500));
  }
};


// show Bills -----------------------------------------------------------------------------------
export const showBillsPage = async (req, res, next) => {
  try {
    const { password } = req.params;

    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(403).send('Access denied: wrong password');
    }
const orders = await Order.find({ status: 'pending' }).sort({
  createdAt: -1,
});

    res.status(200).render('admin/showBills', {
      orders,
      title: 'Bills',
    });

  } catch (err) {
    return next(new AppError('No document found with that ID', 404));
  }
};

