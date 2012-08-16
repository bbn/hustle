var InfoView = Backbone.View.extend({
  
  className: 'info-view',

  title : "Info",

  backLabel : "Back",

  template : _.template('<p><%= ticketinfo %></p><p><%= about %></p><p><a href="<%= url %>" class="url"><%= url %></a></p><div id="credit"><h3>Who made this app?</h3><br>Your pals at <a id="credit-link" href="http://www.mainsocial.com">mainsocial</a> made this.</div>'),

  //events : { },
  
  initialize : function() {
    _.bindAll(this,"render");
  },

  render : function() {
    $(this.el).html(this.template(this.model));
    return this;
  }

});
