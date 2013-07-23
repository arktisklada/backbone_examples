// control the include order of our backbone app

//= require_tree ./models
//= require_tree ./collections
//= require_tree ./views
//= require_tree ./routers


var app = app || {};


$(function() {

  // Object to hold the template HTML
  app.templates = {
    appView: '<h1>Recent Posts</h1><ul id="posts"></ul>',
    // blogList: '<a href="#/posts/{{slug}}">{{title}}</a>',
    blogList: '{{title}}',
    blogView: '<div class="post"><h1 class="title">{{title}}</h1><h3 class="slug">{{slug}}</h3><div class="content">{{{content}}}</div></div>'
  }

  app.router = new app.Router();

  // Modernizr is a useful library to determine the more modern/advanced capabilities of our browser
  // Here, we use Modernizr to determine if our browser supports history push state
  // Notice the difference in the browser URL bar as you navigate through the app (old browsers need to use a #)
  Backbone.history.start({pushState: Modernizr.history});

  // Shows how you can capture the event when a URL change occurs
  Backbone.history.on('route', function() {
    // This is how to retrieve the request URI / fragment
    var fragment = Backbone.history.getFragment();
    console.log("Route: " + Backbone.history.getFragment());
  });

});
