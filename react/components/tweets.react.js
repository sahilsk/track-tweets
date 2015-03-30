var React = require('react');
var Tweet = require('./tweet.react')


var Tweets = React.createClass({
	render: function(){
		var tweetNodes = this.props.tweets.map( function(tweet) {
					return (
						<Tweet tweet={tweet} />
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