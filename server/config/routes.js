var reviewController = require('../reviews/reviewController.js');
var userController = require('../users/userController.js');

module.exports = function(app, express) {

  // Review Routes
  app.get('/review/:type/:typeId', reviewController.getReviews);
  app.post('/review/:type/:typeId', reviewController.postReview);
  app.put('/review/:reviewId', reviewController.editReview);
  app.put('/review/count/:reviewId', reviewController.voteCount);
  app.delete('/review/:reviewId', reviewController.deleteReview);
};
