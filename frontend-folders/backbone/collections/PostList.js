var app = app || {}

// Create a collection of blog posts
app.PostList = Backbone.Collection.extend({

  // Declare the model for this collection
  model: app.Post
});
