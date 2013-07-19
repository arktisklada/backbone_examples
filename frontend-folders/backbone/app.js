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

  Backbone.history.start();

  // Shows how you can capture the event when a URL change occurs
  Backbone.history.on('route', function() {
    // This is how to retrieve the request URI / fragment
    var fragment = Backbone.history.getFragment();
    console.log(Backbone.history.getFragment());
  });

});
