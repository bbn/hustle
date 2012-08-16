var FestivalViewButton = Backbone.View.extend({

  
  initialize : function(options) {
    _.bindAll(this,"render");
    this.name = options.name;
    this.selectorLink = options.selectorLink;
  },

  template : _.template('<a href="<%= selectorLink  %>" class="button"><%= name %></a>'),

  render : function() {
    $(this.el).html(this.template( { selectorLink:this.selectorLink, name:this.name } ));  
    return this;
  }
  
});
