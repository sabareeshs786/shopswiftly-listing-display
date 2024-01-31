const url = require('url');
const querystring = require('querystring');
const { isvalidInputData } = require('../utils/utilFunctions');
const Category = require('../models-admin/categories');

const getCategories = async (req, res) => {
    try {
        const fields = ["-_id", "category"];
        const categories = await Category.find().select(fields.join(' '));
        if (!categories || categories.length === 0) return res.status(204).json({ 'message': `No data found` });
        return res.json(categories);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getCategories };