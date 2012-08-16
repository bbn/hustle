//backbone model for a festival

var VenueCollection =     Backbone.Collection.extend({ model : Venue });

var ArtistCollection =    Backbone.Collection.extend({ model : Artist });

var CategoryCollection =  Backbone.Collection.extend({ model : Category });

var EventCollection =     Backbone.Collection.extend({ 
  
  model : Event,
  
  comparator : function(event) {
    return new Date(event.get("date"));
  }

});

var SponsorCollection =   Backbone.Collection.extend({ model : Sponsor });

function slugify(text) {
	text = text.replace(/[^-a-zA-Z0-9,&\s]+/ig, '');
	text = text.replace(/-/gi, "_");
	text = text.replace(/\s/gi, "-");
	return text;
}

var Festival = Backbone.Model.extend( {  

  initialize : function() {
    
    this.venues = new VenueCollection(this.get("venues"));
    this.artists = new ArtistCollection(this.get("artists"));
    this.categories = new CategoryCollection(this.get("categories"));
    this.events = new EventCollection(this.get("events"));
    this.sponsors = new SponsorCollection(this.get("sponsors"));
    
    this.eventsByDay = {};
    for (i=0;i<this.events.length;i++) {
      var e = this.events.at(i);
      var d = new Date(e.get("date"));
      var s = d.toDateString();
      var slug = slugify(s);
      if (!this.eventsByDay[slug]) {
        this.eventsByDay[slug] = new EventCollection();
      }
      this.eventsByDay[slug].add(e);
    }
    
  }

} );