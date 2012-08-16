var SponsorListView = Backbone.View.extend({

  tagName : "li",

  template : _.template("<a href='#sponsor/<%= id %>'><%= name %></a>"),

  render : function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }

});
