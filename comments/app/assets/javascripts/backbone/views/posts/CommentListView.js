var app = app || {}

app.CommentListView = Backbone.View.extend({
  tagName: 'li',

  // Creating a click event on a title to show the contents
  events:{
    'change': this.render
  },

  initialize: function() {
  },

  render: function() {
    // Generate the handlebars template
    var template = Handlebars.compile(app.templates.commentList);

    // Genreate the post list view html
    this.$el.html(template(this.model.toJSON()));

    // Returning the object is a good practice so we can do chaining
    return this;
  }

});
