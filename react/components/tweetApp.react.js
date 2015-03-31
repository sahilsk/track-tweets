/** @jsx React.DOM */
var 
	React = require('react')
	, Tweets = require('./tweets.react')
	, Notification = require('./notification.react')
	;

var TweetApp = React.createClass({

	getInitialState : function(props){
		var props = props  || this.props;
		return {
			"tweets": props.tweets,
			"unreadTweets" : { tweets : [], count: 0 },
			done: false 
		}
		
	},
	componentWillReceiveProps : function(nextProps){
		this.setState( this.getInitialState(nextProps) );
	},
	componentDidMount : function(){
		//var socket = require('socket.io-client')('http://localhost');
		console.log("connecting to socet");
		var socket = io.connect();
		console.log("connected", socket);
		socket.on('tweet', function (data) {
   			console.log("New tweet emittd", data);

  		});
	},
	render: function(){

		return (
			<div className="tweetApp_wrapper">
				<Tweets tweets={this.state.tweets} />
				<Notification count={this.state.count} className={ this.state.unreadTweets.count > 0 ? "active" : "" } />
			</div>
		)
	}
});


module.exports = TweetApp;