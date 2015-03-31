var 
  mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;
 
var TweetSchema = new Schema({
    author    : ObjectId
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

	var q = Tweet.find({},{ "__v": 0, user: 0}).sort({'created_at' :1}).skip(offset).limit( per_page);
	q.exec( cb);

}

module.exports = Tweet = mongoose.model('Tweet', TweetSchema);
