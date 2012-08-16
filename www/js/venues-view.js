var VenuesView = Backbone.View.extend({

  className : "venues-page",
  
  title : "Venues",

  backLabel : "Back",

  template : _.template('<ul id="venues-list" class="listview"></ul>'),

  events : {},
  
  initialize : function(options) {
    _.bindAll(this,"render");
    this.festival = options.festival;
  },

  render : function() {
    $(this.el).html(this.template());
    for (i=0;i<this.festival.venues.length;i++) {
      row = new VenueListView( { model : this.festival.venues.at(i) } );
      this.$('ul#venues-list').append(row.render().el);
    }
    return this;
  }

});
