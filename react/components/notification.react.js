/** @jsx React.DOM */
var React = require('react');

var Notification = React.createClass({
	showUnreadTweets : function(){
		var updatedTweets = this.props.tweets;
		for( var i = 0; i < this.state.unreadTweets.tweets.length;i++)	{
			updatedTweets.unshift(  this.state.unreadTweets.tweets[i] );
		}
	},

	render: function(){

		return (
			<div className="notification">
				New Tweets arrived.( {this.props.count} unread tweets !!).
				Click <a onClick={this.showUnreadTweets} > here </a> to see them;
			</div>
		)
	}
});

module.exports = Notification;