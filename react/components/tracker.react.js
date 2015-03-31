/** @jsx React.DOM */
var React = require('react');


var Tracker = React.createClass({

	render: function(){
		return(
			<section className="tracker">
				<div className="trackName"> Tracking: {this.props.track} </div>
		 	</section>
		 );
	}
});

module.exports = Tracker;