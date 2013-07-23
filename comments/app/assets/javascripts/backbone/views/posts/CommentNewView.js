var app = app || {}

app.CommentNewView = Backbone.View.extend({
  el: $('#main'),

  // Create a click event on the comment-save-button to save the form data to the model and commit to the database
  events: {
    'click button#comment-save-button': "saveComment"
  },

  initialize: function() {
  },

  render: function() {
    // set the main element to the commentNew template
    this.$el.html(app.templates.commentNew);

    // create a new form for this model using the backbone-forms plugin
    this.form = new Backbone.Form({model: this.model});
    // generate an html element for our submit button; we have defined an event when this button is clicked
    var submitButton = $('<button type="button" name="save_comment" id="comment-save-button">Submit</button>');

    // generate the wrapper div for our form and add the class "post" (for formatting purposes)
    var innerElement = $('<div>').addClass('post');
    // render the form and append to our wrapper
    innerElement.append(this.form.render().el);
    // append the submit button to our wrapper
    innerElement.append(submitButton);

    // add our generated form and button to the view
    this.$el.append(innerElement);
  },

  // there can be an issue with event bindings and memory overload when destroying elements and not unbinding events
  destroy: function() {
    this.undelegateEvents();
    this.$el.removeData().unbind();
  },

  // triggered when the comment-save-button element is clicked
  saveComment: function() {
    // function to commit the form data to the model
    this.form.commit();
    // initiate the save function to sync the model with the database
    this.model.save({}, {
      // override the success function to redirect back to our post
      success: function(model, response) {
        app.router.navigate('posts/' + response.slug, true);
      },
      // error handling!
      error: function() {
        alert("Error saving!");
      }
    });
  }

});