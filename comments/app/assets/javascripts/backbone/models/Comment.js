var app = app || {}

// Create a model for the posts
app.Comment = Backbone.Model.extend({
  // This schema is used by the backbone-forms plugin
  schema: {
    post_id: {
      type: 'Hidden'
    },
    content: {
      type: 'TextArea'
    }
  },

  // In order to match our rails routes, we need a custom url
  url: function() {
    return '/posts/' + this.get('post_id') + '/comments/';
  },

  // Our data returns the comment as well as a post slug, so we need to customize how the data is parsed.  If we just returned the comment object, this would be unnecessary.
  parse: function(data) {
    return data.comment;
  }

});
