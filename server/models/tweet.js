var 
  mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;
 
var TweetSchema = new Schema({
    _id    : ObjectId
  ,  id    : Number
  , title     : String
  , text      : String
  , created_at      : Date
  , user: {name: String, screen_name: String, location: String, profile_image_url: String}
});

/**
* per page = 20
* offset: page number
*/
TweetSchema.statics.getTweets = function( page, skip, cb	){
  var per_page = 10;
  var offset = (page * per_page) + (skip * 1);

	var q = Tweet.find().skip(offset).limit( per_page).sort({'created_at' : -1});
	q.exec( cb);

}

module.exports = Tweet = mongoose.model('Tweet', TweetSchema);
