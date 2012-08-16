var ArtistsView = Backbone.View.extend({

  className : "artists-page",
  
  title : "Artists",

  backLabel : "Back",


  template : _.template('<ul id="artist-list" class="listview"></ul>'),

  events : {},
  
  initialize : function(options) {
    _.bindAll(this,"render");
  },

  render : function() {
    $(this.el).html(this.template());
    for (i=0;i<window.festival.artists.length;i++) {
      row = new ArtistListView( { model : window.festival.artists.at(i) } );
      this.$('ul#artist-list').append(row.render().el);
    }
    return this;
  }

});
