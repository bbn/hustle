var CategoryFooterListView = Backbone.View.extend({

  tagName : "li",
  
  template : _.template("<a href='#category/<%= id %>'><span class='cat'></span><%= name %></a>"),
  
  render : function() {
    $(this.el).html(this.template(this.model.toJSON()));          
    this.$(".cat").addClass(this.model.get("name"));

    return this;  
  }

});
