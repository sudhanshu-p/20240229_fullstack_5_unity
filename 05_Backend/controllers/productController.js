// Internal Imports
const Review = require("../models/Review")
const Product = require("../models/Product")

const {
    checkAbusiveWords,
    validateReviewLength,
    validateRating,
} = require("../dependencies/validators/Reviews");

const {
    isValidCategory,
    isValidRating,
    isValidPrice,
    queryValidator
} = require("../dependencies/validators/Product");

// Sample array to store reviews
let reviews = [];

// Controller for adding a review
async function addReview(req, res) {
    const { review_id } = req.params;
    const {
        title,
        description,
        ratings,
        productId
    } = req.body;

    if (!validateRating(req, res)) {
        return res.status(400).json({ error: 'Rating should be a number between 1 and 5 (inclusive).' });
    }


    try {
        const newReview = { review_id, title, description, ratings, productId };
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
    // /search?search_query=abcd&category=efgh&...
    const { search_query } = req.query;

    // Handle filtering
    const {
        category,
        ratings,
        price,
        sort
    } = req.query;
    // Perform the actual search logic 
    let results = await Product.find({})

    try {
        if (search_query) {
            // validate the query
            const queryError = queryValidator(search_query);
            if (!queryError) {
                // If there's an error, return a 400 status with the error message
                return res.status(400).json({ message: 'Please check the spelling or try searching for something else' });
            }
            results = results.filter(product =>
                product.title.toLowerCase().includes(search_query.toLowerCase())
            );
        }
        if (category) {
            if (isValidCategory(category)) {
                // results = filterResultsByCategory(results, category);
                // product.category.toLowerCase() === categoryFilter.toLowerCase()
                results = results.filter(product =>
                    product.category.toLowerCase() === categoryFilter.toLowerCase()
                );
            }
            else {
                res.status(400)
            }
        }
        if (ratings) {
            if (isValidRating(ratings)) {
                results = filterResultsByRating(results, ratings);
                // product.rating >= minRating && product.rating <= maxRating
                results = results.filter(product =>
                    product.ratings >= minRating && product.ratings <= maxRating
                );
            } else {
                return res.status(400).json({ message: "Rating should be between 1 and 5" });
            }
        }
        
        if (price) {
            // Check if price is a valid number
            if (isValidPrice(price)) {
                // Filter results using a function (e.g., filterResultsByPrice) if needed
                results = filterResultsByPrice(results, price);
        
                // OR directly filter the array based on the price range
                results = results.filter(product =>
                    product.price >= minPrice && product.price <= maxPrice
                );
            } else {
                return res.status(400).json({ message: "Price should be a number greater than or equal to 10." });
            }
        }
        
        // Handle sorting
        if (sort) {
            results = sortResults(results, sort);
        }

        res.json({ results });
    } 
    catch (error) {
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
