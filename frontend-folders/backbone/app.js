// This is included at the beginning of the backbone files to ensure we have an app object as each file is loaded and minimize potential errors
var app = app || {};


$(function() {

  // Object to hold the template HTML
  app.templates = {
    appView: '<h1>Recent Posts</h1><ul id="posts"></ul>',
    // blogList: '<a href="#/posts/{{slug}}">{{title}}</a>', // optional replacement for blogList template that uses <a> tags
    blogList: '{{title}}',
    blogView: '<p>{{title}}<br>{{slug}}</p><div>{{{content}}}</div>'
  }


  // create the app from the router
  app.router = new app.Router();
  // start our backbone history
  Backbone.history.start();

  // Shows how you can capture the event when a URL change occurs
  Backbone.history.on('route', function() {
    // This is how to retrieve the request URI / fragment
    var fragment = Backbone.history.getFragment();
    console.log(Backbone.history.getFragment());
  });

  // Demonstrates an alterate way of handling routing events, perhaps by breaking apart the router into a router and controller
  // app.router.on('route:getPost', function(slug) {
  //   alert("getPost " + slug);
  // });

});
