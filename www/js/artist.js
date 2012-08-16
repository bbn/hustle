var Artist = Backbone.Model.extend( {  
  
  events : function() {
    var artistId = this.id;
    var events = festival.events.filter( function(e) {       
      return (e.artists().map(function(a){ return a.id; }).indexOf(artistId) != -1); 
    } );
    return new EventCollection(events);
  }

} );