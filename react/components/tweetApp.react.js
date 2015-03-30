var React = require('react');
var Tweets = require('./tweets.react')
var Notification = require('./notification.react')

var TweetApp = React.createClass({

	getInitialState : function(tweets){
		tweets: this.props.tweets || tweets,
		unreadTweets: { tweets : [], count: 0 },
		done: false 
	},
	componentWillMount: function(){
		var tweets = JSON.parse( document.getElementById('data-tweets').innerHTML );
		this.setState(
		{
			"tweets" : tweets
			
		}
	},
	render: function(){

		return (
			<Tweets tweets={tweets} />
			<Notification />
		)
	}
});


module.exports = Tweet;