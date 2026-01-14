const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const { authorization } = require('../middlewares/authorize');

router.get('/', authorization, cartController.getCart);
router.post('/add', authorization, cartController.addToCart);
router.put('/', authorization, cartController.updateCartItem);

module.exports = router;
