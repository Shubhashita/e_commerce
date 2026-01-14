const Product = require('../models/product.model');

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, image } = req.body;

        // Use the imageURL provided in
        const imageUrl = image || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80';

        const product = new Product({
            name,
            description,
            price,
            category,
            stock,
            image: imageUrl
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // If image URL is provided in body, it will be in 'updates' object automatically if we spread it or assign it.
        // Nothing special needed other than removing file logic.

        const product = await Product.findByIdAndUpdate(id, updates, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const { search, category } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (category) {
            query.category = category;
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalProduct = await Product.countDocuments(query);
        const products = await Product.find(query).skip(skip).limit(limit);

        res.json({
            products,
            currentPage: page,
            totalPages: Math.ceil(totalProduct / limit),
            totalProducts: totalProduct
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
