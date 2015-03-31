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
			track: "reactjs",
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
		//var socket = require('socket.io-client')('http://localhost');
		var self = this;
		console.log("connecting to socet");
		var socket = io.connect('/');
		socket.on('tweet', function (data) {
			self.addTweet(data.tweet);
   			console.log("New tweet emitted", data.tweet);
   			var oldSkipCount  = self.state.skip; 
   			self.setState({ skip: oldSkipCount++ });

  		});

  		window.addEventListener("scroll", self.checkScroll );
	},
	addTweet : function(tweet){
		var unreadTweets = 	JSON.parse( JSON.stringify( this.state.unreadTweets) );
		unreadTweets.count++;
		unreadTweets.tweets.unshift(tweet);

//		console.log("before addTweet: ", unreadTweets);
		this.setState({ unreadTweets : unreadTweets	}); 
//		console.log("after addTweet: ", this.state.unreadTweets);
	},
	showUnreadTweets : function(){
		var updatedTweets = JSON.parse( JSON.stringify( this.state.tweets) ); 
		var unreadTweets = 	JSON.parse( JSON.stringify( this.state.unreadTweets) );

//		console.log("showing unread tweets, before: ", updatedTweets.length );
		console.log( this.state.unreadTweets.tweets );
		for( var i = 0; i < this.state.unreadTweets.count; i++)	{
			updatedTweets.unshift(  unreadTweets.tweets.pop() );
			unreadTweets.count--;
		}

		this.setState({ tweets: updatedTweets, unreadTweets: unreadTweets});
		console.log("showing unread tweets, after: ", this.state.tweets.length );


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
		        console.log("newTweets: ", newTweets);
		        console.log("new page loaded", self.state.page, newTweets.length);
		        if( newTweets.length === 0){
		        	self.setState({done: true});
		        }
		    });

		    res.on('end', function () {
		       console.log("end data");
		       var oldTweets = JSON.parse(JSON.stringify(self.state.tweets)); 
		       var updatedTweets =  oldTweets.concat( newTweets) ;
		       console.log( newTweets);

		       setTimeout( function(){
		       	self.setState( { tweets :updatedTweets, page: currentPage+1, loading: false })	
		       }, 2E3);

		       
		    });
	
		})

	},
	handleChange: function(event) {
		var self = this;
		var socket = io.connect('/');
		this.setState({track: event.target.value}, function(){
			console.log("emiting change event: ", self.state.track);
			socket.emit('track', {track: self.state.track} );	
		});
			
	},
	render: function(){

		return (
			<div className="tweetApp_wrapper"  >
				<Tracker track={this.state.track} handleChange={this.handleChange}  />
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