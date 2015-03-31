/** @jsx React.DOM */
var React = require('react');

var Loader = React.createClass({

	render: function(){

		return (
			<div className={ this.props.loading ? "loader active" : "loader" } >
				<img src="/images/loader.gif" />
			</div>
		)
	}
});

module.exports = Loader;