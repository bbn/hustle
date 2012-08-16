var SponsorView = Backbone.View.extend({
  
  template : _.template('<div class="image loading"><img src="img/sponsors/<%= image %>" width="320" height="125"></div><div class="blurb"><%= blurb %></div><div class="url"><a href="<%= url %>" class="url"><%= url %></a></div>'),

  title : null,

  backLabel : "Back",

  events : { },
  
  initialize : function() {
    _.bindAll(this, "render");
    this.title = this.model.get("name");
  },

  render : function() {
    var j = this.model.toJSON();
    $(this.el).html(this.template(j));    
    return this;
  }

});
