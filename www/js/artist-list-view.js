var ArtistListView = Backbone.View.extend({

  tagName : "li",

  template : _.template("<a href='#artist/<%= id %>'><%= name %></a>"),
  
  initialize : function() {
    _.bindAll(this,"render");
  },

  render : function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
  
});
