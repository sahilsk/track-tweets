/** @jsx React.DOM */
var React = require('react');
var moment = require('moment');

var Tweet = React.createClass({
	render: function(){

		return (
			<li className="tweet">
				<div className="avatar">
					<img src={this.props.tweet.user.profile_image_url} />
				</div>
				<div className="message">
					<span className="name"> {this.props.tweet.user.name} </span> 
					<span className="screen_name"> @{this.props.tweet.user.screen_name} </span>
					<span className="created_at"> - { moment( this.props.tweet.created_at).fromNow()  } </span>
					<div className="body">
						{this.props.tweet.text}
					</div>
				</div>
				<div className="clear"/>
			</li>
		)
	}
});


module.exports = Tweet;