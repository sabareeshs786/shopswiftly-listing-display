const url = require('url');
const querystring = require('querystring');
const mongoose = require('mongoose');
const { getModelByCategory } = require('../utils/models/utilFunctions');

const getBrandsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const fields = ["-_id", "brand",];
        const model = getModelByCategory(category);
        const brands = await model.distinct('brand');
        res.json(brands);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = { getBrandsByCategory };