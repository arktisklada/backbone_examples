var app = app || {}

app.AppView = Backbone.View.extend({

  // Base the view on a specific existing element
  el: $('#main'),

  initialize: function() {

    this.$el.html(app.templates.appView);

    // Cache commonly used selectors
    this.list = $('#posts');
  },

  render: function() {
    // Create views for each post in the collection and append them to the list
    this.collection.each(function(post) {
      var view = new app.PostListView({ model: post });
      this.list.append(view.render().el);

    }, this);  // "this" is the context in the callback

    return this;
  }

});
