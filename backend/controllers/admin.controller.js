const User = require('../models/users.model');
const Product = require('../models/product.model');

const adminController = {};

adminController.getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();

        // Return stats relevant to E-Commerce
        res.json({
            totalUsers,
            totalProducts
        });
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ error: "Failed to fetch stats" });
    }
};

adminController.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

module.exports = adminController;