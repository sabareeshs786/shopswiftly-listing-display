const url = require('url');
const querystring = require('querystring');
const mongoose = require('mongoose');
const { getGenericFilters, getNumVal, getIntVal, removeEmptyFields } = require('../utils/utilFunctions');
const { getModelByCategory } = require('../utils/models/utilFunctions');

const getProducts = async (req, res) => {
    try {
        const parsedUrl = url.parse(req.url);
        const queryParams = querystring.parse(parsedUrl.query);
        const category = req.params.category;
        const preview = req.query.preview !== "false";
        const sort = req.query.sort || "lth";
        const sortOrder = {};
        const page = getIntVal(queryParams['page'], 1) || 1;
        const pageSize = getIntVal(queryParams['pageSize'], 5) || 5;
        const skip = (page - 1) * pageSize;
        sortOrder.sp = sort == "htl" ? -1 : 1;

        const model = getModelByCategory(category);
        const mongodbQuery = getGenericFilters(req);
        const fieldsToRetrieve = ['-_id', '-createdAt', '-updatedAt', '-__v'];
        // const ftr = ["skuid", "pname", "sp"];

        const items = await model.find(mongodbQuery)
            .select(fieldsToRetrieve.join(' '))
            .skip(preview ? 0 : skip)
            .limit(preview ? 5 : pageSize)
            .sort(sortOrder);

        if (!items) return res.status(204).json({ 'message': `No items found for the category ${category}` });
        res.json(items);
    } catch (error) {
        console.log(error);
    }
}

const getMinMax = async (req, res) => {
    const category = req.params.category;
    if (!category)
        return res.status(400).json({ message: 'Invalid input data' });
    const brand = req.query.brand;
    const mongodbQuery = removeEmptyFields({ brand: { $in: brand?.split(',') } });

    const model = getModelByCategory(category);
    try {
        const mongodbDocs = await model.find(mongodbQuery);
        const mongodbDocIds = mongodbDocs.map(doc => doc._id);
        const result = await model.aggregate([
            {
                $match: {
                    _id: { $in: mongodbDocIds }
                }
            },
            {
                $group: {
                    _id: null,
                    minValue: { $min: "$sp" },
                    maxValue: { $max: "$sp" }
                }
            }]);
        const { minValue, maxValue } = result[0];
        res.json({ minValue, maxValue });
    } catch (error) {
        console.log(error);
    }
}

const getMetaDataForPagination = async (req, res) => {
    try {
        const category = req.params.category;
        if (!category)
            return res.status(400).json({ message: 'Invalid input data' });

        const mongodbQuery = getGenericFilters(req);
        const model = getModelByCategory(category);

        const countOfDocs = await model.countDocuments(mongodbQuery);
        if (!countOfDocs) return res.status(204).json({ 'message': `No items found for the category ${category}` });
        res.json({ countOfDocs });
    } catch (error) {
        console.log(error);
    }
}

const getProduct = async (req, res) => {
    const id = req.query.id;
    const category = req.params.category?.toLowerCase() || "mobiles";
    if (!category || !id)
        return res.status(400).json({ message: 'Invalid input data' });
    const model = getModelByCategory(category);
    try {
        const item = await model.find({ skuid: id });
        if (!item) return res.status(204).json({ 'message': `No item found` });
        res.json(item);
    } catch (error) {
        console.log(error);
        res.status(400);
    }
}

module.exports = { getProducts, getMinMax, getMetaDataForPagination, getProduct };