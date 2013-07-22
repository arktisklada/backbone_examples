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
    if(this.collection.length == 0) {
      this.collection.fetch();
    }
  },

  renderItem: function(model) {
    var view = new app.PostListView({model: model});
    this.list.append(view.render().el);
  },

  render: function() {
//    this.collection.each( // can use each or map
    this.collection.map(function(model) {
      this.renderItem(model);
    }, this);
    return this;
  }

});
