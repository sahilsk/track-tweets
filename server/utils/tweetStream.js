'use strict';
var Tweet = require('../models/tweet');
var mongoose =require("mongoose");
var config  = require("config")


module.exports = function( twClient, io ){

	var currentTrack = config.track ||  "reactjs";

	twClient.on('tweet', function(tweet){
		console.log("tweet received", tweet);

		//Add _id field
		 tweet['_id'] = mongoose.Types.ObjectId(tweet.id);

		var newTweet = new Tweet( tweet);
		newTweet.save( function(err){
			if(!err){
				console.log("Tweet saved");
				io.emit('tweet', {"tweet": tweet});
			}
		});		

	});

	 
	twClient.on('error', function (err) {
	  console.log('Oh no', err)
	})
	twClient.on('reconnect', function (err) {
	  console.log('reconnecting to twitter with track: ', currentTrack);
	})

	 
	twClient.track(currentTrack);

}

