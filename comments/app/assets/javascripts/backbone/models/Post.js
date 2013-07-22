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

  urlRoot: '/posts',

  fetchComments: function() {
    var model = this;
    model.comments = new app.Comments();
    model.comments.blog_id = model.get('id');
    model.comments.fetch({
      success: function() {
        model.trigger('comments');
      }
    });
  }

});
