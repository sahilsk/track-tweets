var  io = require('socket.io')();
var Tweet = require('../models/tweet');

module.exports = function( twClient, socket ){


	twClient.on('tweet', function(tweet){
		console.log("tweet received", tweet);

		var newTweet = new Tweet( tweet);
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
	 
	twClient.track('nodejs')
	twClient.track('pizza')
	 
	// 5 minutes later
	twClient.track('tacos')
	 
	// 10 minutes later
	twClient.untrack('pizza')

}