var app = app || {}

app.PostListView = Backbone.View.extend({
  tagName: 'li',

  // Creating a click event on a title to show the contents
  events:{
    'click': 'view'
  },

  initialize: function() {
  },

  render: function() {
    // Generate the handlebars template
    var template = Handlebars.compile(app.templates.blogList);

    // Genreate the post list view html
    this.$el.html(template(this.model.toJSON()));

    // Returning the object is a good practice so we can do chaining
    return this;
  },

  // Event handler for the click event; navigates to the post view route
  view: function() {
    app.router.navigate('posts/' + this.model.get('slug'), true);
  }

});
