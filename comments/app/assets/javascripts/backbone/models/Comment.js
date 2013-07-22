var app = app || {}

// Create a model for the posts
app.Comment = Backbone.Model.extend({
  schema: {
    post_id: {
      type: 'Hidden'
    },
    content: {
      type: 'TextArea'
    }
  },
 
  url: function() {
    return '/posts/' + this.get('post_id') + '/comments/';
  },

  parse: function(data) {
    return data.comment;
  }

});
