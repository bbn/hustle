var Venue = Backbone.Model.extend( {  

  initialize : function() {
    _.bindAll(this, "events");
  },
  
  events : function() {
    var id = this.get("id");
    var events = festival.events.filter(function(event) {
      return (event.get("venue") == id);
    });
    return new EventCollection(events);
  }

} );