var React = require('react');

var Tweet = React.createClass({
	render: function(){

		return (
			<li className="tweet">
				{this.props.tweet.message}
			</li>
		)
	}
});


module.exports = Tweet;