var mongoose = require('mongoose');
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;
 
var Tweet = new Schema({
    author    : ObjectId
  , title     : String
  , body      : String
  , date      : Date
});

/**
* per page = 20
* offset: page number
*/
var Tweet.statics.getTweets = function( page, offset, cb	){
	var page = page || 0;
	var offset = offset || 0;
	var q = Tweet.find().sort({'date' :1}).limit( offset);
	q.exec( cb);

}

module.exports = Tweet;