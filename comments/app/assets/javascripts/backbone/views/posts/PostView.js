var app = app || {}

app.PostView = Backbone.View.extend({
  el: $('#main'),

  // Create an event on the comment-new-link element to trigger a navigation change
  events: {
    'click #comment-new-link': "newComment"
  },

  initialize: function() {
    // whenever there is a change on the model, render (helps with ajax)
    this.model.bind('change', this.render, this);
    // when the model's fetchComments function is finished, this event is triggered
    this.model.bind('comments', this.renderComments, this);
  },

  render: function() {
    var template = Handlebars.compile(app.templates.blogView);
    this.$el.html(template(this.model.toJSON()));

    // cache the comments selector (this is not in the initializer because it doesn't exist until the post view template is rendered)
    this.comments = this.$el.find('.comments');
    // tell the model to get (ajax) it's comments
    this.model.fetchComments();

    return this;
  },

  // there can be an issue with event bindings and memory overload when destroying elements and not unbinding events
  destroy: function() {
    this.undelegateEvents();
    this.$el.removeData().unbind();
  },

  // render the post comments -- triggered by the model's "comments" event
  renderComments: function() {
    this.model.comments.each(function(model) {
      var view = new app.CommentListView({model: model});
      this.comments.append(view.render().el);
    }, this);
  },

  // when the comment-new-link element is clicked, this function is called
  newComment: function() {
    // remove the element and unbind it's event
    $('#comment-new-link').unbind().remove();
    // navigate to the new comments uri
    app.router.navigate('posts/' + this.model.get('id') + '/comments/new', true);
  }

});
