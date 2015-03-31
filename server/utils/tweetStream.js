var Tweet = require('../models/tweet');
var mongoose =require("mongoose");

module.exports = function( twClient, io ){



	twClient.on('tweet', function(tweet){
		console.log("tweet received", tweet);

		//Add _id field
		 tweet['_id'] = new mongoose.Types.ObjectId(tweet.id);

		var newTweet = new Tweet( tweet);
		newTweet
		newTweet.save( function(err){
			if(!err){
				console.log("Tweet saved");
				io.emit('tweet', {"tweet": tweet});
			}
		});		

	});


	twClient.on('tweet', function (tweet) {
	  console.log('tweet received', tweet)
	})
	 
	twClient.on('error', function (err) {
	  console.log('Oh no')
	})
	 
	twClient.track('VikratKohli');


}