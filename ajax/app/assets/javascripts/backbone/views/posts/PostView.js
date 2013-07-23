var app = app || {}

app.PostView = Backbone.View.extend({
  el: $('#main'),

  initialize: function() {
    // add an event on the model to trigger the render function whenever the model data is changed.  Passing "this" maintains scope to the parent object instead of the model, window, or anything else
    this.model.bind('change', this.render, this);
  },

  render: function() {
    var template = Handlebars.compile(app.templates.blogView);
    this.$el.html(template(this.model.toJSON()));
    return this;
  }

});
