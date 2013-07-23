var app = app || {}

// Create a model for the posts
app.Post = Backbone.Model.extend({
  idAttribute: 'slug',

  // Posts have a title and content, and here we set default values
  defaults: {
    title: 'New post',
    slug: 'new-post',
    content: ''
  },

  // This is the base url of an individual post, RESTful (/posts/id)
  urlRoot: '/posts'

});
