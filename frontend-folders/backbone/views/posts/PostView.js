var app = app || {}

// This view displays a post title, slug, and contents
app.PostView = Backbone.View.extend({
  // this is the main element to send our template into
  el: $('#main'),

  initialize: function() {
    // This section is NOT IDEAL -- the contents of this function should be in a render function, but demonstrates how this function is called on a new object creation as well as the flexibility.
    // Generate the Handlebars template from our object
    var template = Handlebars.compile(app.templates.blogView);
    // populate the template with model data and replace our main content with this new template view
    this.$el.html(template(this.model.toJSON()));
  }

});
