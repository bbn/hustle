var EventView = Backbone.View.extend({

  // class : ".event-content",
  // commenting the above out because it isn't working in safari in iOS simulator.
  
  title: null,

  backLabel : "Back",

  template : _.template('<div class="copy-block"><label>WHEN</label><div id="date"><%= dateString %></div><label>WHERE</label><ul id="venuename"></ul><label>WHAT</label><div id="description"><%= description %></div></div><ul class="listview" id="event-artists"></ul>'),
  
  initialize : function() {
    _.bindAll(this, "render");
    this.title = this.model.get("name");
    $(this.el).addClass("event-content");
  },

  render : function() {
    var data = this.model.toJSON();
    _.extend(data,  { name : this.model.name(), 
                      description : (this.model.description() || ""),
                      dateString : dateFormat(this.model.get("date"), "dddd, mmmm dS, yyyy, h:MM:ss TT") });
    $(this.el).html(this.template(data));
      
    this.$("ul#venuename").html((new VenueListView({model:this.model.venue()})).render().el);
    
    var artists = this.model.artists();    
    for (var i=0;i<artists.length;i++) {
      var item = new ArtistListView({ model : artists.at(i) });
      this.$("#event-artists").append(item.render().el);
    }    
    
    return this;
  }

});
