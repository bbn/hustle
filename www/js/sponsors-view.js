var SponsorsView = Backbone.View.extend({

  className : "sponsors-page",
  
  title : "Sponsors",

  backLabel : "Back",

  template : _.template('<ul id="sponsor-list" class="listview"></ul>'),

  events : {},
  
  initialize : function(options) {
    _.bindAll(this,"render");
    this.festival = options.festival;
  },

  render : function() {
    $(this.el).html(this.template());
    for (i=0;i<this.festival.sponsors.length;i++) {
      row = new SponsorListView( { model : this.festival.sponsors.at(i) } );
      this.$('ul#sponsor-list').append(row.render().el);
    }
    return this;
  }

});
