var app = app || {}

app.Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'posts/:slug': 'getPost',
    'posts/:id/comments/new': 'newComment'
  },

  index: function() {
    app.appView = new app.AppView({collection: new app.Posts()});
  },

  getPost: function(slug) {
    var post = new app.Post({slug: slug});
    if(app.postView) {
      app.postView.destroy();
    }
    app.postView = new app.PostView({model: post});
    post.fetch();
  },

  newComment: function(post_id) {
    if(app.commentNewView) {
      app.commentNewView.destroy();
    }
    var comment = new app.Comment({post_id: post_id});
    app.commentNewView = new app.CommentNewView({model: comment, post_id: post_id});
  }

});
