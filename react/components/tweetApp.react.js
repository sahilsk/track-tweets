/** @jsx React.DOM */
'use strict';
var 
	React = require('react')
	, Tweets = require('./tweets.react')
	, Notification = require('./notification.react')
	, Loader = require('./loader.react')
	, Tracker = require('./tracker.react')
	, http = require('http')
	;

var TweetApp = React.createClass({

	getInitialState : function(props){
		var props = props  || this.props;
		return {
			track:  "",
			tweets: props.tweets,
			unreadTweets : { tweets : [], count: 0 },
			done: false ,
			page: 0,
			skip: 0,
			loading: false
		}
		
	},
	componentWillReceiveProps : function(nextProps){
		this.setState( this.getInitialState(nextProps) );
	},
	componentDidMount : function(){
		var self = this;
		console.log("connecting to server...");
		var socket = io.connect('/');
		socket.on('tweet', function (data) {
			self.addTweet(data.tweet);
   			console.log("New tweet arrived");
   			var oldSkipCount  = self.state.skip; 
   			self.setState({ skip: oldSkipCount++ });

  		});

  		socket.on("track", function(data){
  			console.log("Tracking: ", data.track);
  			self.setState({ track: data.track });
  		});

  		window.addEventListener("scroll", self.checkScroll );
	},
	addTweet : function(tweet){
		var unreadTweets = 	JSON.parse( JSON.stringify( this.state.unreadTweets) );
		unreadTweets.count++;
		unreadTweets.tweets.unshift(tweet);
		this.setState({ unreadTweets : unreadTweets	}); 
	},
	showUnreadTweets : function(){
		var updatedTweets = JSON.parse( JSON.stringify( this.state.tweets) ); 
		var unreadTweets = 	JSON.parse( JSON.stringify( this.state.unreadTweets) );
		for( var i = 0; i < this.state.unreadTweets.count; i++)	{
			updatedTweets.unshift(  unreadTweets.tweets.pop() );
			unreadTweets.count--;
		}

		this.setState({ tweets: updatedTweets, unreadTweets: unreadTweets});
	},

	checkScroll : function(ev){
		var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	    var s = document.body.scrollTop;
	    var scrolled = (h + s) > document.body.offsetHeight;

	    if( scrolled && !this.state.done ){
	    	this.setState({loading: true});
	    	this.getTweets();
	    }

	},	
	getTweets : function(){
		var self = this;
		var currentPage = self.state.page;
		var opts = {
			path: '/page/' + (currentPage+1) + "/" + self.state.skip
		};	
		
		var newTweets = [];
		http.get( opts, function(res){
			res.on('data', function (result) {
		        newTweets = JSON.parse(result);
		        if( newTweets.length === 0){
		        	self.setState({done: true});
		        }
		    });

		    res.on('end', function () {
		       var oldTweets = JSON.parse(JSON.stringify(self.state.tweets)); 
		       var updatedTweets =  oldTweets.concat( newTweets) ;
		       setTimeout( function(){
		       	self.setState( { tweets :updatedTweets, page: currentPage+1, loading: false })	
		       }, 2E3);

		       
		    });
	
		})

	},
	render: function(){

		return (
			<div className="tweetApp_wrapper"  >
				<Tracker track={this.state.track}  />
				<Tweets tweets={this.state.tweets}   />
				<Notification count={this.state.unreadTweets.count}
					showUnreadTweets={this.showUnreadTweets}
					  />
				<Loader loading={this.state.loading} />					
			</div>
				
		)
	}
});


module.exports = TweetApp;