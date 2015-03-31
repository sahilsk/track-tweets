'use strict';
var Tweet = require('../models/tweet');
var mongoose =require("mongoose");

/*
module.exports = function( twClient, io ){

	var currentTrack = "reactjs";

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


	twClient.on('tweet', function (tweet) {
	  console.log('tweet received', tweet)
	})
	 
	twClient.on('error', function (err) {
	  console.log('Oh no', err)
	})
	twClient.on('reconnect', function (err) {
	  console.log('reconnecting to twitter with track: ', currentTrack);
	})

	io.on("track", function(data){
		twClient.untrack(currentTrack);
		currentTrack = data.track;
		console.log("new tracking request: ", currentTrack);
		twClient.track( currentTrack );
	})
	 
	twClient.track(currentTrack);

}

*/


module.exports = function( twClient, io ){
	var currentTrack = "reactjs";


	function startTrack( track,cb ){
		twClient.stream('statuses/filter', {track: track}, function(stream) {
			stream.on('data', function (tweet) {
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
				cb(stream);
			});

		});

	}

	startTrack(currentTrack, function(stream){
		twClient.currentTwitStream = stream;

		stream.on('end', function (response) {
		  console.log("disconnected ....");
		});
		stream.on('destroy', function (response) {
		   console.log("stream destroy ....");
		});
	});

	io.on("track", function(data){
		twClient.currentTwitStream.destroy();
		currentTrack = data.track;
		console.log("new tracking request: ", currentTrack);
		
		startTrack( currentTrack, function(stream){
			twClient.currentTwitStream = stream;
		})
	})

}