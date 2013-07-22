var app = app || {}

// Create a collection of blog posts
app.Comments = Backbone.Collection.extend({

  // Declare the model for this collection
  model: app.Comment,

  blog_id: null,

  url: function() {
    return '/posts/' + this.blog_id + '/comments';
  },

  parse: function(data) {
    models = [];
    if(Object.prototype.toString.call(data) === '[object Array]') {
      for(var i in data) {
        models.push(new app.Comment(data[i]));
      }
    } else {
      models.push(new app.Comment(data));
    }
    return models;
  }

});
