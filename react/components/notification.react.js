/** @jsx React.DOM */
var React = require('react');

var Notification = React.createClass({

	render: function(){

		return (
			<div className={ this.props.count > 0 ? "notification-bar active" : "notification-bar" } >
				New Tweets arrived.( {this.props.count} unread tweets !!).
				Click <a href="javascript:void(0);" onClick={this.props.showUnreadTweets} > here </a> to see them;
			</div>
		)
	}
});

module.exports = Notification;