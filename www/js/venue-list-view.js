var VenueListView = Backbone.View.extend({

  tagName : "li",

  template : _.template("<a href='#venue/<%= id %>'><%= name %></a>"),

  render : function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
  
});
