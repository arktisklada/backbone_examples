$(function() {

  // Object to hold the template HTML
  var templates = {
    appView: '<h1>Recent Posts</h1><ul id="posts"></ul>',
    // blogList: '<a href="#/posts/{{slug}}">{{title}}</a>', // optional replacement for blogList template that uses <a> tags
    blogList: '{{title}}',
    blogView: '<p>{{title}}<br>{{slug}}</p><div>{{{content}}}</div>'
  }



  // Create a model for the posts
  var Post = Backbone.Model.extend({
    // let's look up our blog post by slug instead of id
    idAttribute: 'slug',
    // Posts have a title and content, and here we set default values
    defaults:{
      title: 'New post',
      slug: 'new-post',
      content: 'title'
    }
  });



  // Create a collection of blog posts
  var Posts = Backbone.Collection.extend({

    // Declare the model for this collection
    model: Post
  });



  // This view turns a post model into rendered HTML for the home page
  var PostListView = Backbone.View.extend({
    // This is the tag type that each of our post titles will be nested under
    tagName: 'li',

    // Creating a click event on each view object to show the contents and navigate to the post view
    events:{
      'click': 'view'
    },

    // this function is called when the object is created
    initialize: function() {
    },

    // our render function; populates the template with object data onto the page
    render: function() {
      // Generate the handlebars template from our templates object
      var template = Handlebars.compile(templates.blogList);

      // Genreate the post list view html from the object data.  The .toJSON() function pulls out the data object from the model, and is important here because the templating system accepts an object of key:value pairs
      this.$el.html(template(this.model.toJSON()));

      // Returning the object is a good practice so we can do chaining
      return this;
    },

    // Event handler for the click event
    view: function() {
      // navigates to the post view route (/posts/post-slug)
      app.navigate('posts/' + this.model.get('slug'), true);
    }

  });


  // This view displays a post title, slug, and contents
  var PostView = Backbone.View.extend({
    // this is the main element to send our template into
    el: $('#main'),

    initialize: function() {
      // This section is NOT IDEAL -- the contents of this function should be in a render function, but demonstrates how this function is called on a new object creation as well as the flexibility.
      // Generate the Handlebars template from our object
      var template = Handlebars.compile(templates.blogView);
      // populate the template with model data and replace our main content with this new template view
      this.$el.html(template(this.model.toJSON()));
    }
  });


  // The main view of the application
  var AppView = Backbone.View.extend({

    // Base the view on a specific existing element
    el: $('#main'),

    // Let's initialize this view by populating the template and caching a selector
    initialize: function() {
      // Populate the main container with our appView template
      this.$el.html(templates.appView);

      // Cache commonly used selectors
      this.list = $('#posts');
    },

    // let's render the sub tempaltes for our main app
    render: function() {
      // Create views for each post in the Posts collection and append them to the list (underscore style)
      this.collection.each(function(post) {
        // generate the backbone view object and set the model
        var view = new PostListView({ model: post });
        // using our cached object from the initialize function, append the new view to the list for display
        this.list.append(view.render().el);

      }, this);  // "this" is the context in the callback

      return this;
    }
  });



  // This is our router/controller for our app
  var AppRouter = Backbone.Router.extend({
    // This is a simple object of routes.  The key is the route, and the value is the action
    routes: {
      '': 'index',              // root path (/)
      'posts/:slug': 'getPost'  // post view path (/posts/post-slug)
    },

    // Initialize the router with test data
    initialize: function(options) {
      // pass the options through just in case
      this.options = options;
      // Test collection data with 4 posts
      this.posts = new Posts([
        new Post({ title: 'web development', slug: 'web-development', content: '<p>Aliquam condimentum porta dui, at ullamcorper nibh malesuada nec. Nam ornare egestas odio, vitae luctus orci porta sed. Curabitur luctus, metus sed ornare faucibus, velit tellus scelerisque lacus, a tempor risus augue sed lectus.</p><p>Morbi placerat vehicula lectus in pretium. Curabitur orci dui, imperdiet vitae vulputate eget, dapibus sed tortor. Phasellus facilisis fringilla sem nec euismod. Vestibulum eleifend libero non neque imperdiet blandit. Donec adipiscing at ante sed sollicitudin. Etiam elementum ante et placerat posuere.</p>'}),
        new Post({ title: 'web design', slug: 'web-design', content: '<p>Morbi placerat vehicula lectus in pretium. Curabitur orci dui, imperdiet vitae vulputate eget, dapibus sed tortor. Phasellus facilisis fringilla sem nec euismod. Vestibulum eleifend libero non neque imperdiet blandit. Donec adipiscing at ante sed sollicitudin. Etiam elementum ante et placerat posuere. Nullam eget orci sed turpis dictum condimentum ut eget neque. Integer adipiscing ante quis eros tincidunt, sed scelerisque odio dictum.</p>'}),
        new Post({ title: 'photography', slug: 'photography', content: '<p>no content</p>'}),
        new Post({ title: 'coffee drinking', slug: 'coffee-drinking', content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In accumsan interdum quam vitae suscipit. </p>'})
      ]);
    },

    // Index action: renders the AppView with the collection of test posts
    index: function() {
      var appView = new AppView({collection: this.posts});
      appView.render();
    },

    // GetPost action: renders an individual post view
    getPost: function(slug) {
      // Get our post by slug (the "id")
      var post = this.posts.get(slug);
      // Create the view and set the model.  Notice how there is no render function called.  All display functionality was in the initializer (demonstrates flexibility)
      new PostView({model: post});
    }
  });



  // create the app from the router
  var app = new AppRouter();
  // start our backbone history
  Backbone.history.start();

  // Shows how you can capture the event when a URL change occurs
  Backbone.history.on('route', function() {
    // This is how to retrieve the request URI / fragment
    var fragment = Backbone.history.getFragment();
    console.log(Backbone.history.getFragment());
  });

  // Demonstrates an alterate way of handling routing events, perhaps by breaking apart the router into a router and controller
  // app.on('route:getPost', function(slug) {
  //   alert("getPost " + slug);
  // });

});
