var Category = Backbone.Model.extend( {  

  events : function() {
    var id = this.id;
    var events = festival.events.filter( function(e) {       
      return (e.get("category") == id); 
    } );
    return new EventCollection(events);
  }

} );