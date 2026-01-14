const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { authorization } = require('../middlewares/authorize');
const { permit } = require('../middlewares/admin.middleware');


router.get('/', productController.getProducts);

router.post('/', authorization, permit('admin'), productController.createProduct);
router.put('/:id', authorization, permit('admin'), productController.updateProduct);
router.delete('/:id', authorization, permit('admin'), productController.deleteProduct);

module.exports = router;
