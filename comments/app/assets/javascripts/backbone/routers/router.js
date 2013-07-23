var app = app || {}

app.Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'posts/:slug': 'getPost',
    'posts/:id/comments/new': 'newComment' // our newComment route matches our restful rails route
  },

  index: function() {
    app.appView = new app.AppView({collection: new app.Posts()});
  },

  getPost: function(slug) {
    // In an effort to clean memory and destroy/unbind elements, if a view exists, destroy it before creating a new one
    if(app.postView) {
      app.postView.destroy();
    }
    var post = new app.Post({slug: slug});
    app.postView = new app.PostView({model: post});
    post.fetch();
  },

  newComment: function(post_id) {
    // In an effort to clean memory and destroy/unbind elements, if a view exists, destroy it before creating a new one
    if(app.commentNewView) {
      app.commentNewView.destroy();
    }
    var comment = new app.Comment({post_id: post_id});
    app.commentNewView = new app.CommentNewView({model: comment, post_id: post_id});
    app.commentNewView.render();
  }

});
