const getModelByCategory = (category) => {

    switch (category) {
        case 'mobiles':
            return require('../../models/products/electronics/mobiles')
        case 'laptops':
            return require('../../models/products/electronics/laptops')
        case 'desktops':
            return require('../../models/products/electronics/desktop');
        case 'tablets':
            return require('../../models/products/electronics/tablets')
        case 'topwears':
            return require('../../models/products/fashion/clothing_and_accessories/topwear')
        case 'bottomwears':
            return require('../../models/products/fashion/clothing_and_accessories/bottomwear')
        case 'footwears':
            return require('../../models/products/fashion/footwear')
        default:
            console.log("No valid category");
            return null;
    }
}

module.exports = { getModelByCategory };