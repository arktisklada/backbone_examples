var app = app || {}

// Create a collection of blog posts
app.Posts = Backbone.Collection.extend({

  // Declare the model for this collection
  model: app.Post,

  // This is the base url of our collection
  url: "/posts"

});
