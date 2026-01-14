const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Product description is required']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price must be non-negative']
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
        trim: true
    },
    stock: {
        type: Number,
        required: [true, 'Product stock is required'],
        min: [0, 'Stock must be non-negative'],
        default: 0
    },
    image: {
        type: String,
        required: [false, 'Product image is required'] // Made optional initially to ease creation if image upload fails, but typically required.
    }
}, { timestamps: true });

// Add text index for search
productSchema.index({ name: 'text', description: 'text', category: 'text' });

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
