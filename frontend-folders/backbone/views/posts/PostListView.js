var app = app || {}

// This view turns a post model into rendered HTML for the home page
app.PostListView = Backbone.View.extend({
  // This is the tag type that each of our post titles will be nested under
  tagName: 'li',

  // Creating a click event on each view object to show the contents and navigate to the post view
  events:{
    'click': 'view'
  },

  // this function is called when the object is created
  initialize: function() {
  },

  // our render function; populates the template with object data onto the page
  render: function() {
    // Generate the handlebars template from our templates object
    var template = Handlebars.compile(app.templates.blogList);

    // Genreate the post list view html from the object data.  The .toJSON() function pulls out the data object from the model, and is important here because the templating system accepts an object of key:value pairs
    this.$el.html(template(this.model.toJSON()));

    // Returning the object is a good practice so we can do chaining
    return this;
  },

  // Event handler for the click event
  view: function() {
    // navigates to the post view route (/posts/post-slug)
    app.router.navigate('posts/' + this.model.get('slug'), true);
  }

});
