var ArtistView = Backbone.View.extend({
  
  title: null,
  backLabel: "Back",
  
  template : _.template('<div class="artist-img loading"></div><div class="copy-block"><label>WHO</label><div id="blurb"><%= blurb %></div><div id="url"><a href="<%= url %>" class="url"><%= url %></a></div><label>WHEN</label></div><ul id="artist-events" class="listview"></ul>'),
  
  initialize : function() {
    _.bindAll(this, "render");
    this.title = this.model.get("name");
  },

  render : function() {
    $(this.el).html(this.template(this.model.toJSON()));
    var artist = this.model.toJSON();
    if (artist.image == '' || artist.image == null){
      var artistimage = 'img/artists/noimage.png'
    }
    else {
       var artistimage = artist.image;
    }
    this.$(".artist-img").html('<img src="img/artists/'+artistimage+'" class="artist-img-src">');
    
    var events = this.model.events();
    for (var i=0;i<events.length;i++) {
     var item = new EventListView({ model : events.at(i) });
     this.$("#artist-events").append(item.render().el);
    }
    return this;
  }

});
