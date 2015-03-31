/** @jsx React.DOM */
var React = require('react');


var Tracker = React.createClass({
	render: function(){
		return (
			<ul className="tweets">
				{tweetNodes}
			</ul>
		)
	}
});

module.exports = Tracker;