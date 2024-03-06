// Validate each and every property of the product object

const { getUserFromId } = require("../jwtHelpers");

/** Helper function to validate Product Title */
function titleValidator(title) {
  // Check for string
  if (typeof title !== "string") {
    return false;
  }
  // Check for length
  if (title.length < 6 || title.length > 255) {
    return false;
  }
  return true;
}

/** Helper function to validate Product Description */
function descriptionValidator(description) {
  // Check for string
  if (typeof description !== "string") {
    return false;
  }
  // Check for length
  if (description.length < 6 || description.length > 255) {
    return false;
  }
  return true;
}

/** Helper function to validate Product Stock */
function stockValidator(stock) {
  // Check for number
  if (typeof stock !== "number") {
    return false;
  }
  // Check for minimum value
  if (stock < 0) {
    return false;
  }
  return true;
}

/** Helper function to validate Product Thumbnail URL */
function thumbnailUrlValidator(thumbnailUrl) {
  // Check for string
  if (typeof thumbnailUrl !== "string") {
    return false;
  }
  // Check for length
  if (thumbnailUrl.length < 6 || thumbnailUrl.length > 255) {
    return false;
  }
  // Also maybe try to fetch and check if the url is active
  return true;
}

/** Helper function to validate Product Images */
function imagesValidator(images) {
  // Check for array
  if (!Array.isArray(images)) {
    return false;
  }
  return true;
}

/** Helper function to validate Product Price */
function priceValidator(price) {
  // Check for number
  if (typeof price !== "number") {
    return false;
  }
  // Check for minimum value
  if (price < 0) {
    return false;
  }
  return true;
}

/** Helper function to validate Product Discount Price */
function discountPriceValidator(discountPrice, price) {
  // Check for number
  if (typeof discountPrice !== "number") {
    return false;
  }
  // Check for minimum value
  if (discountPrice < 0) {
    return false;
  }

  // Check if discount price is less than the original price
  if (discountPrice > price) {
    return false;
  }

  return true;
}

/** Helper function to validate Product Category */
function categoryValidator(category) {
  // Check for string
  if (typeof category !== "string") {
    return false;
  }
  // Check for length
  if (category.length < 6 || category.length > 255) {
    return false;
  }
  return true;
}

/** Helper function to validate Product Seller */
async function sellerValidator(sellerId) {
  // Check if the user exists
  const user = await getUserFromId(sellerId);
  if (!user) {
    return false;
  }

  // Check if the user is a seller
  if (!user.role === "seller") {
    return false;
  }

  return true;
}

// Validate if a category exists in the database
function isValidCategory(category) {
  const validCategories = ['Electronics', 'Clothing', 'Books', 'Toys']; // Needs to be replaced with databse
  return validCategories.includes(category);
}

// Validate if a rating is between 1 and 5
function isValidRating(rating) {
    if (isNaN(rating) || rating < 1 || rating > 5) {
        return false
    }
  return true;
}

// Validate if a price is not negative and greater than or equal to 10
function isValidPrice(price) {
    if (isNaN(price) || price < 10) {
        return false
    }
  return true;
}



// Regex to check existence of alphanumeric characters
function isAlphaNumeric(str) {
  return /^[a-zA-Z0-9]+$/.test(str);
}

// Validate search query
function queryValidator(query){
  if(!isAlphaNumeric(query)) {
    return false
  }
  
  return true; // Indicates validation success
}

module.exports = {
  titleValidator,
  descriptionValidator,
  stockValidator,
  thumbnailUrlValidator,
  imagesValidator,
  priceValidator,
  discountPriceValidator,
  categoryValidator,
  sellerValidator,
  isValidCategory,
  isValidRating,
  isValidPrice,
  isAlphaNumeric,
  queryValidator,
  
};
