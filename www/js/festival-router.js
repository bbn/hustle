var FestivalRouter = Backbone.Router.extend({
  
  initialize : function(options) {
    this.model = options.model;
    _.bindAll(this,"showPage","home","eventsByDay","events","event","artists","artist","venues","venue","twitter","sponsors","info");
  },

  routes: {
    "":                     "home",
    "events-by-day":        "eventsByDay",
    "events/:slug":         "events",
    "category/:id" :        "category", 
    "artists":              "artists",
    "artist/:id":           "artist",  
    "venues":               "venues",
    "venue/:id":            "venue",
    "twitter":              "twitter",
    "sponsors":             "sponsors",
    "sponsor/:id":          "sponsor",
    "info":                 "info",
    "event/:id":            "event" 
  },
  
  showPage : function(view) {
    var viewDescriptor = { 
      title: view.title,
      backLabel: view.backLabel,
      backCallback: this.handleNavigateBack,
      view: view.$el
    };
    window.viewNavigator.pushView( viewDescriptor );

    if (!view.noClickDelay) {
      new NoClickDelay( view.el );
      view.noClickDelay = true;
    } else {
      setTimeout(function(){
        view.$("a.pressed").removeClass('pressed');
      },200);
    }

    // $('.active').removeClass('active');
    // $(selector).addClass('active');   
    
    setContentHeight();   
    // $('.dir-button.black').css('color','#fff');
  },

  handleNavigateBack : function () {
    history.back();
  },
  
  home : function() {
    this.showPage(window.festivalView);
  },
  
  eventsByDay: function() {
    this.showPage(window.eventsByDayView);
  },

  events: function(slug) {
    var events = festival.eventsByDay[slug];
    var dateString = dateFormat((new Date(events.at(0).get("date"))), "dddd mm/dd");
    var view = new EventsView( { title : dateString, eventsToList : events, dateFormatString : "h:MM TT" } );
    view.render();
    this.showPage(view);    
  },

  event: function(id) {
    var evnt = null;
    for (i=0;i<this.model.events.length;i++) {
      if (this.model.events.at(i).id == id) {
        evnt = this.model.events.at(i);
        break;
      }
    }
    var eventView = new EventView({ model : evnt });
    eventView.render();
    this.showPage(eventView);
  },
  
  // category: function(id) {
  //   var cat = null;
  //   for (i=0;i<this.model.categories.length;i++) {
  //     if (this.model.categories.at(i).id == id) {
  //       cat = this.model.categories.at(i);
  //       break;
  //     }
  //   }
  //   var view = new EventsView( { title : cat.get("name"), eventsToList : cat.events() } );
  //   view.render();
  //   this.showPage('#events-page');
  //   scrollThis('events-content');
  // },
  
  artists: function() {
    this.showPage(window.artistsView);
  },
  
  artist: function(id) {
    var artist = null;
    for (i=0;i<this.model.artists.length;i++) {
      if (this.model.artists.at(i).id == id) {
        evnt = this.model.artists.at(i);
        break;
      }
    }
    var artistView = new ArtistView({ model : evnt });
    artistView.render();
    this.showPage(artistView);   
  },

  venues: function() {
    this.showPage(window.venuesView);
  },
  
  venue: function(id) {
    var venue;
    for (i=0;i<this.model.venues.length;i++) {
      if (this.model.venues.at(i).id == id) {
        venue = this.model.venues.at(i);
        break;
      }
    }
    var venueView = new VenueView({ model : venue });
    venueView.render();
    this.showPage(venueView);
  },
    
  twitter: function() {
    this.showPage(window.twitterView);
    window.twitterView.render();
  },
  
  sponsors: function() {
    this.showPage(window.sponsorsView);    
  },
    
  sponsor: function(id) {
    var sponsor;
    for (i=0;i<this.model.sponsors.length;i++) {
      if (this.model.sponsors.at(i).id == id) {
        sponsor = this.model.sponsors.at(i);
        break;
      }
    }
    var view = new SponsorView({ model : sponsor });
    view.render();
    this.showPage(view);
  },

  info: function() {
    this.showPage(window.infoView);
  }
  
});
