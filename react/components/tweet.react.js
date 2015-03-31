/** @jsx React.DOM */
var React = require('react');

var Tweet = React.createClass({
	render: function(){

		return (
			<li className="tweet">
				<div className="avatar">
					<img src={this.props.tweet.user.profile_image_url} />
				</div>
				<div className="message">
					{this.props.tweet.text}
				</div>
				<div className="clear"/>
			</li>
		)
	}
});


module.exports = Tweet;