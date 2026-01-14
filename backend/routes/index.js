const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const productRoutes = require('./product.routes');
const cartRoutes = require('./cart.routes');
const adminRoutes = require('./admin.routes');


router.use('/api/auth', userRoutes);

router.use('/api/products', productRoutes);

router.use('/api/cart', cartRoutes);

router.use('/api/admin', adminRoutes);

module.exports = router;
