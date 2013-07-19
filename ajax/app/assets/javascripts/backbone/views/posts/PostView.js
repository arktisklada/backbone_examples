var app = app || {}

app.PostView = Backbone.View.extend({
  el: $('#main'),

  initialize: function() {
    this.model.bind('change', this.render, this);
  },

  render: function() {
    var template = Handlebars.compile(app.templates.blogView);
    this.$el.html(template(this.model.toJSON()));
    return this;
  }

});
