/** @jsx React.DOM */
var React = require('react');

var Tweet = React.createClass({
	render: function(){

		return (
			<li className="tweet">
				{this.props.tweet.text}
			</li>
		)
	}
});


module.exports = Tweet;