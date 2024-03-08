// Middleware to check for abusive words
function checkAbusiveWords(req, res, next) {
    const abusiveWords = ['shit', 'fuck', 'asshole']; // Add your list of abusive words
    const reviewText = req.body.description + ' ' + req.body.title;
  
    for (const word of abusiveWords) {
      if (reviewText.toLowerCase().includes(word)) {
        return res.status(400).json({ error: 'Please avoid usage of inappropriate and abusive language.' });
      }
    }
  
    next();
  }
  
  // Middleware to validate review title and description length
  function validateReviewLength(req, res, next) {
    const { ratingTitle, ratingDescription } = req.body;
  
    if (ratingTitle.split(' ').length > 5) {
      return res.status(400).json({ error: 'Rating should be between 1 and 5' });
    }
  
    if (ratingDescription.split(' ').length > 100) {
      return res.status(400).json({ error: 'Exceeding limit of 100 words ' }); ;
    }
    next()
  }
  
  // Middleware to validate rating
  function validateRating(req, res) {
    const { ratings } = req.body;
  
    if (isNaN(ratings) || ratings < 1 || ratings > 5) {
      return false
    }
  
    return true
  }
  
  // Middleware to check if review ID exists
  function checkReviewIDExists(req, res, next) {
    const { id } = req.params;
  
    // Assuming reviews are stored in an array with unique IDs
    const reviewExists = reviews.some(review => review.id === id);
  
    if (!reviewExists) {
      return res.status(404).json({ error: 'Invalid user.' });
    }
  
    next();
  }
  
  module.exports = {
    checkAbusiveWords,
    validateReviewLength,
    validateRating,
    checkReviewIDExists,
  };