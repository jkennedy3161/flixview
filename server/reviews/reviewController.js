var Review = require('../reviews/reviewModel.js');

module.exports = {
  postReview: function(req, res, next) {
    var data = req.body;
    var type = req.params.type;
    var typeId = req.params.typeId;
    var review = new Review({
      username: data.username,
      typeId: typeId,
      type: type,
      title: data.title,
      date: new Date(),
      content: data.content,
      rating: data.rating,
      voteCount: 0
    });
    review.save(function(err, review) {
      if (err) {
        res.send(err);
      } else {
        res.json(review);
      }
    })

  },
  getReviews: function(req, res, next) {
    var id = req.params.typeId;
    var type = req.params.type;
    Review.find({typeId: id})
      .sort({date: -1})
      .exec(function(err, review) {
        if (err) {
          res.send(err);
        } else {
          res.json(review);
        }
      });

  },
  deleteReview: function(req, res, next) {
    var id = req.params.reviewId;
    Review.findByIdAndRemove(id, function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send('Review successfully removed!');
        }
      });

  },
  editReview: function(req, res, next) {
    var id = req.params.reviewId;
    var content = req.body.content;
    var rating = req.body.rating;
    var title = req.body.title;
    Review.findOneAndUpdate({ _id: id }, {content: content, rating: rating, title: title}, {new: true}, function (err, review) {
      if (err) {
        res.send(err);
      }
      res.json(review);
    });

  },
  voteCount: function(req, res, next) {
    var id = req.params.reviewId;
    var voteCount = req.body.voteCount;
    Review.findOneAndUpdate({_id: id}, {$inc: {voteCount: voteCount}}, {new: true}, function(err, review) {
        res.json(review.voteCount);
    });
  }
};