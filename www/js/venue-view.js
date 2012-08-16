var VenueView = Backbone.View.extend({
  
  template : _.template('<div id="map" class="loading"><img src="http://maps.googleapis.com/maps/api/staticmap?center=<%= address %>&zoom=15&size=320x200&markers=color:red%7C<%=address%>&sensor=false"></div><div class="address"><div class="name"><%= name %></div><%= address %></div><div id="venue-wrapper"><ul id="venue-events" class="listview"></ul></div>'),  

  title : null,

  backLabel : "Back",

  events : {},
  
  initialize : function(options) {
    _.bindAll(this,"render");
    this.title = this.model.get("name");
  },
  
  render : function() {    
    $(this.el).html(this.template(this.model.toJSON()));
    var events = this.model.events();    
    for (var i=0;i<events.length;i++) {
      var item = new EventListView({ model : events.at(i) });
      this.$("#venue-events").append(item.render().el);
    }    
    return this;
  }

});
