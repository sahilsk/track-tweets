/** @jsx React.DOM */
var React = require('react');


var Tracker = React.createClass({

	render: function(){
		return(
			<div className="tracker">
		 		<input type="text" defaultValue={this.props.track} onBlur={this.props.handleChange} placeholder="string to track" />
		 	</div>
		 );
	}
});

module.exports = Tracker;