var app = require('express');
var React = require("react");
var Tweet = require('../models/tweet');

module.exports = {

	index: function(req,res){
		var tweets = Tweet.getTweets(0,0, function(err, tweets){
			if(err){
				console.log("Error querying db", err);
				res.statusCode(404);
				res.send("Error querying database");
			}
			if(!err){
				res.render("index",  { layout: 'layouts/layout',  "tweets": tweets } );
			}	
		});
		
	}
}