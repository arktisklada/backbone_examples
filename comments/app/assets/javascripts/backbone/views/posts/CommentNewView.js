var app = app || {}

app.CommentNewView = Backbone.View.extend({
  el: $('#main'),

  events: {
    'click button#comment_new_button': "saveComment"
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(app.templates.commentNew);

    this.form = new Backbone.Form({model: this.model});
    var submitButton = $('<button type="button" name="save_comment" id="comment_new_button">Submit</button>');

    var innerElement = $('<div>').addClass('post');
    innerElement.append(this.form.render().el);
    innerElement.append(submitButton);

    this.$el.append(innerElement);
  },

  destroy: function() {
    this.undelegateEvents();
    this.$el.removeData().unbind();
  },

  saveComment: function() {
    this.form.commit();
    this.model.save({}, {
      success: function(model, response) {
        app.router.navigate('posts/' + response.slug, true);
      },
      error: function() {
        alert("Error saving!");
      }
    });
  }

});