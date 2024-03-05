// Internal Imports
const Product = require("../models/Product");

const { checkAbusiveWords, validateReviewLength, validateRating, checkReviewIDExists } = require("../dependencies/validators/Reviews");
const { isAlphaNumeric, sortResults, filterResultsByCategory, filterResultsByRating, filterResultsByPrice } = require("../dependencies/validators/Product");

// Sample array to store reviews
let reviews = [];

// Controller for adding a review
async function addReview(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;
    try {

        const newReview = { id, title, description };
        reviews.push(newReview);

        res.json({ reviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

/** Controller for handling product search and sorting */

// Search and filter products
async function searchProducts(req, res) {
    const { query } = req.query;

    // Perform the actual search logic 
    let results = products;
    try {

        // Handle filtering
        const { category, rating, price, sort } = req.query;
        if (query) {
            if (!query || !isAlphaNumeric(query)) {
                return res.json({ message: 'Please check the spelling or try searching for something else' });
            }
            results = results.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );
        }

        if (category) {
            results = filterResultsByCategory(results, category);
        }
        if (rating) {
            results = filterResultsByRating(results, rating);
        }
        if (price) {
            results = filterResultsByPrice(results, price);
        }

        // Handle sorting
        if (sort) {
            results = sortResults(results, sort);
        }

        res.json({ results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Controller to get trending products
async function getTrendingProductsController(req, res) {
    const { role } = req.user;
    try {

        if (role === 'seller') {
            // Assuming seller-specific logic to fetch seller's products
            // Modify this based on your actual data structure
            const sellerProducts = products.filter(product => product.seller_id === userId);
            res.json({ sellerProducts });
        } else if (role === 'user') {
            const trendingProducts = getTrendingProducts(products);
            res.json({ trendingProducts });
        } else {
            res.status(403).json({ message: 'Invalid role' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Regex to check existence of alphanumeric characters
function isAlphaNumeric(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
}

// Implement your logic to sort by rating, price, or default to sorting by name
function sortResults(results, sortField) {
    switch (sortField) {
        case 'rating':
            results.sort((a, b) => a.rating - b.rating);
            break;
        case 'price':
            results.sort((a, b) => a.price - b.price);
            break;
        default:
            results.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    return results;
}

// Implement your logic to filter by category
function filterResultsByCategory(results, category) {
    return results.filter(product => product.category === category);
}

// Implement your logic to filter by rating
function filterResultsByRating(results, rating) {
    return results.filter(product => product.rating >= parseFloat(rating));
}

// Implement your logic to filter by price range
function filterResultsByPrice(results, priceRange) {
    const [minPrice, maxPrice] = priceRange.split('-').map(parseFloat);
    return results.filter(product => product.price >= minPrice && product.price <= maxPrice);
}

function getTrendingProducts(products) {
    return products.filter(product => product.trending);
}

module.exports = {
    addReview,
    searchProducts,
    getTrendingProductsController,
};
