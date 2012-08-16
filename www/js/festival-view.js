var FestivalView = Backbone.View.extend({

  className : "home-page",
  
  title : null,

  backLabel : null,

  template : _.template('<div id="buttons"></div>'),

  events : {},
  
  initialize : function(options) {
    _.bindAll(this,"render");
    this.title = this.model.get("info").name;
  },

  render : function() {
    $(this.el).html(this.template());
    var buttons = { schedule:"#events-by-day",
                    artists:"#artists",
                    venues:"#venues",
                    twitter:"#twitter",
                    sponsors:"#sponsors",
                    info:"#info"};
    for (var key in buttons) {
      var button = new FestivalViewButton( { name:key, selectorLink:buttons[key] } );
      this.$("#buttons").append(button.render().el);
    }
    return this;
  }

});
