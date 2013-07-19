var app = app || {}

app.Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'posts/:slug': 'getPost'
  },

  initialize: function(options) {
    this.options = options;

    // Test collection data
    this.posts = new app.PostList([
      new app.Post({ title: 'web development', slug: 'web-development', content: '<p>Aliquam condimentum porta dui, at ullamcorper nibh malesuada nec. Nam ornare egestas odio, vitae luctus orci porta sed. Curabitur luctus, metus sed ornare faucibus, velit tellus scelerisque lacus, a tempor risus augue sed lectus.</p><p>Morbi placerat vehicula lectus in pretium. Curabitur orci dui, imperdiet vitae vulputate eget, dapibus sed tortor. Phasellus facilisis fringilla sem nec euismod. Vestibulum eleifend libero non neque imperdiet blandit. Donec adipiscing at ante sed sollicitudin. Etiam elementum ante et placerat posuere.</p>'}),
      new app.Post({ title: 'web design', slug: 'web-design', content: '<p>Morbi placerat vehicula lectus in pretium. Curabitur orci dui, imperdiet vitae vulputate eget, dapibus sed tortor. Phasellus facilisis fringilla sem nec euismod. Vestibulum eleifend libero non neque imperdiet blandit. Donec adipiscing at ante sed sollicitudin. Etiam elementum ante et placerat posuere. Nullam eget orci sed turpis dictum condimentum ut eget neque. Integer adipiscing ante quis eros tincidunt, sed scelerisque odio dictum.</p>'}),
      new app.Post({ title: 'photography', slug: 'photography', content: '<p>no content</p>'}),
      new app.Post({ title: 'coffee drinking', slug: 'coffee-drinking', content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In accumsan interdum quam vitae suscipit. </p>'})
    ]);
  },

  index: function() {
    var appView = new app.AppView({collection: this.posts});
    appView.render();
  },

  getPost: function(slug) {
    var post = this.posts.get(slug);
    new app.PostView({model: post});
  }

});
