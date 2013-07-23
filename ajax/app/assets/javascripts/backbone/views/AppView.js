var app = app || {}

app.AppView = Backbone.View.extend({

  // Base the view on a specific existing element
  el: $('#main'),

  initialize: function() {

    this.$el.html(app.templates.appView);

    // Cache commonly used selectors
    this.list = $('#posts');

    // this.collection.bind('add', this.renderItem);  // compare the usage of this line with the one below (this scoping: this.list is lost in renderItem without passing in the function)
    this.collection.bind('add', this.renderItem, this);
    // If we already have a collection, don't get a new one
    if(this.collection.length == 0) {
      // perform the "fetch" action on the collection to retrieve a list of posts from it's url
      this.collection.fetch();
    }
  },

  renderItem: function(model) {
    var view = new app.PostListView({model: model});
    this.list.append(view.render().el);
  },

  render: function() {
    // iterate through the collection and render a PostListView for each item
    this.collection.each(function(model) {
      this.renderItem(model);
    }, this); // pass "this" so we can call this.renderItem inside the iteration
    return this;
  }

});
