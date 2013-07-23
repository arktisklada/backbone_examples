var app = app || {}

// Create a model for the posts
app.Post = Backbone.Model.extend({
  idAttribute: 'slug',

  // Posts have a title and content, and here we set default values
  defaults: {
    title: 'New post',
    slug: 'new-post',
    content: '',
    comments: []
  },

  // This is the base url of an individual post, RESTful (/posts/id)
  urlRoot: '/posts',

  // Custom method to populate the model's comments
  fetchComments: function() {
    // cache the "this" variable so we can trigger the event later
    var model = this;
    // initialize the collection
    model.comments = new app.Comments();
    // set the custom value blog_id that is used as part of the custom url (to match our rails route)
    model.comments.blog_id = model.get('id');
    // tell the collection to fetch the comments for this blog
    model.comments.fetch({
      // override the success function so we can trigger our custom event
      success: function() {
        // trigger the "comments" event on the post model so the post view knows the ajax call is complete and render the views
        model.trigger('comments');
      }
    });
  }

});
