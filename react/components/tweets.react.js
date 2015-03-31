/** @jsx React.DOM */
var React = require('react');
var Tweet = require('./tweet.react')


var Tweets = React.createClass({
	render: function(){
		var tweetNodes = this.props.tweets.map( function(tweet) {
					return (
						<Tweet key={tweet['_id']} tweet={tweet} />
						)
			});
		return (
			<ul className="tweets">
				{tweetNodes}
			</ul>
		)
	}
});

module.exports = Tweets;