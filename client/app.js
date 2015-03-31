/** @jsx React.DOM */

var React = require("react");
var TweetApp = require("../react/components/tweetApp.react")

var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);


React.renderComponent(
  <TweetApp tweets={initialState} />,
  document.getElementById('tweet_app')
);