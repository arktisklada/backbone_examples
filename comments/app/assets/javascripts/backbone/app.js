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
    blogView: '<div class="post"><h1 class="title">{{title}}</h1><h3 class="slug">{{slug}}</h3><div class="content">{{{content}}}</div><ul class="comments"></ul><div><span id="comment-new-link">New comment</span></div></div>',
    commentList: '<p>{{dateFormat created_at format="MM/DD/YYYY"}} - {{content}}</p>',
    commentNew: '<h1 class="title">New Comment</h1>'
  }

  // We need a way to format the date in our blog templates.
  Handlebars.registerHelper('dateFormat', function(context, block) {
    var date = new Date(context);
    return date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
  });

  app.router = new app.Router();

  Backbone.history.start({pushState: Modernizr.history});

  // Shows how you can capture the event when a URL change occurs
  Backbone.history.on('route', function() {
    // This is how to retrieve the request URI / fragment
    console.log("Route: " + Backbone.history.getFragment());
  });

});
