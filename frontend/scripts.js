$(function() {

  // Object to hold the template HTML
  var templates = {
    appView: '<h1>Recent Posts</h1><ul id="posts"></ul>',
    // blogList: '<a href="#/posts/{{slug}}">{{title}}</a>',
    blogList: '{{title}}',
    blogView: '<p>{{title}}<br>{{slug}}</p><div>{{{content}}}</div>'
  }



  // Create a model for the posts
  var Post = Backbone.Model.extend({
    idAttribute: 'slug',
    // Posts have a title and content, and here we set default values
    defaults:{
      title: 'New post',
      slug: 'new-post',
      content: 'title'
    }
  });



  // Create a collection of blog posts
  var PostList = Backbone.Collection.extend({

    // Declare the model for this collection
    model: Post
  });



  // This view turns a post model into rendered HTML for the home page
  var PostListView = Backbone.View.extend({
    tagName: 'li',

    // Creating a click event on a title to show the contents
    events:{
      'click': 'view'
    },

    initialize: function() {
    },

    render: function() {
      // Generate the handlebars template
      var template = Handlebars.compile(templates.blogList);

      // Genreate the post list view html
      this.$el.html(template(this.model.toJSON()));

      // Returning the object is a good practice so we can do chaining
      return this;
    },

    // Event handler for the click event; navigates to the post view route
    view: function() {
      app.navigate('posts/' + this.model.get('slug'), true);
    }

  });


  var PostView = Backbone.View.extend({
    el: $('#main'),

    initialize: function() {
      var template = Handlebars.compile(templates.blogView);
      this.$el.html(template(this.model.toJSON()));
      return this;
    }
  });


  // The main view of the application
  var AppView = Backbone.View.extend({

    // Base the view on a specific existing element
    el: $('#main'),

    initialize: function() {

      this.$el.html(templates.appView);

      // Cache commonly used selectors
      this.list = $('#posts');
    },

    render: function() {
      // Create views for each post in the collection and append them to the list
      this.collection.each(function(post) {
        var view = new PostListView({ model: post });
        this.list.append(view.render().el);

      }, this);  // "this" is the context in the callback

      return this;
    }
  });



  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'index',
      'posts/:slug': 'getPost'
    },

    initialize: function(options) {
      this.options = options;
      // Test collection data
      this.posts = new PostList([
        new Post({ title: 'web development', slug: 'web-development', content: '<p>Aliquam condimentum porta dui, at ullamcorper nibh malesuada nec. Nam ornare egestas odio, vitae luctus orci porta sed. Curabitur luctus, metus sed ornare faucibus, velit tellus scelerisque lacus, a tempor risus augue sed lectus.</p><p>Morbi placerat vehicula lectus in pretium. Curabitur orci dui, imperdiet vitae vulputate eget, dapibus sed tortor. Phasellus facilisis fringilla sem nec euismod. Vestibulum eleifend libero non neque imperdiet blandit. Donec adipiscing at ante sed sollicitudin. Etiam elementum ante et placerat posuere.</p>'}),
        new Post({ title: 'web design', slug: 'web-design', content: '<p>Morbi placerat vehicula lectus in pretium. Curabitur orci dui, imperdiet vitae vulputate eget, dapibus sed tortor. Phasellus facilisis fringilla sem nec euismod. Vestibulum eleifend libero non neque imperdiet blandit. Donec adipiscing at ante sed sollicitudin. Etiam elementum ante et placerat posuere. Nullam eget orci sed turpis dictum condimentum ut eget neque. Integer adipiscing ante quis eros tincidunt, sed scelerisque odio dictum.</p>'}),
        new Post({ title: 'photography', slug: 'photography', content: '<p>no content</p>'}),
        new Post({ title: 'coffee drinking', slug: 'coffee-drinking', content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In accumsan interdum quam vitae suscipit. </p>'})
      ]);
    },

    index: function() {
      var appView = new AppView({collection: this.posts});
      appView.render();
    },

    getPost: function(slug) {
      var post = this.posts.get(slug);
      new PostView({model: post});
    }
  });



  var app = new AppRouter();
  Backbone.history.start();

  // Shows how you can capture the event when a URL change occurs
  Backbone.history.on('route', function() {
    // This is how to retrieve the request URI / fragment
    var fragment = Backbone.history.getFragment();
    console.log(Backbone.history.getFragment());
  });

  // Demonstrates an alterate way of handling routing events
  // app.on('route:getPost', function(slug) {
  //   alert("getPost " + slug);
  // });

});
