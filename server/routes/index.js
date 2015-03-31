var JSX = require('node-jsx').install();
var React = require("react");
var Tweet = require('../models/tweet');
var TweetApp = require('../../react/components/tweetApp.react');

module.exports = {

	index: function(req,res){
		var tweets = Tweet.getTweets(0,0, function(err, tweets){
			if(err){
				console.log("Error querying db", err);
				res.statusCode(404);
				res.send("Error querying database");
			}

			var markup = React.renderComponentToString( TweetApp( {"tweets": tweets } ) );
			res.render("index",  
				{ "layout": '../../server/views/layouts/main', 
				  "tweets": JSON.stringify(tweets), 
				 "markup": markup  
				 } );

		});
		
	}
}