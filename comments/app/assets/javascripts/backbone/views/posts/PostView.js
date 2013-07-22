var app = app || {}

app.PostView = Backbone.View.extend({
  el: $('#main'),

  events: {
    'click #comment-new-link': "newComment"
  },

  initialize: function() {
    this.model.bind('change', this.render, this);
    this.model.bind('comments', this.renderComments, this);
  },

  render: function() {
    var template = Handlebars.compile(app.templates.blogView);
    this.$el.html(template(this.model.toJSON()));

    this.comments = this.$el.find('.comments');;
    this.model.fetchComments();

    return this;
  },

  destroy: function() {
    this.undelegateEvents();
    this.$el.removeData().unbind();
  },

  renderComments: function() {
    this.model.comments.each(function(model) {
      var view = new app.CommentListView({model: model});
      this.comments.append(view.render().el);
    }, this);
  },

  newComment: function() {
    $('#comment-new-link').unbind().remove();
    app.router.navigate('posts/' + this.model.get('id') + '/comments/new', true);
  }

});
