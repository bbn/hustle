var Category = Backbone.Model.extend( {  

  events : function() {
    var id = this.id;
    var events = festival.events.filter( function(e) {       
      return (e.get("category") == id); 
    } );
    return new EventCollection(events);
  }

} );
var CategoryFooterListView = Backbone.View.extend({

  tagName : "li",
  
  template : _.template("<a href='#category/<%= id %>'><span class='cat'></span><%= name %></a>"),
  
  render : function() {
    $(this.el).html(this.template(this.model.toJSON()));          
    this.$(".cat").addClass(this.model.get("name"));

    return this;  
  }

});

var Artist = Backbone.Model.extend( {  
  
  events : function() {
    var artistId = this.id;
    var events = festival.events.filter( function(e) {       
      return (e.artists().map(function(a){ return a.id; }).indexOf(artistId) != -1); 
    } );
    return new EventCollection(events);
  }

} );
var ArtistView = Backbone.View.extend({
  
  el : "#artist-wrapper",
  
  template : _.template('<div class="copy-block"><label>WHO</label><div id="blurb"><%= blurb %></div><div id="url"><a href="<%= url %>" class="url"><%= url %></a></div><label>WHEN</label></div><ul id="artist-events" class="listview"></ul>'),
  
  initialize : function() {
    _.bindAll(this, "render");
  },

  render : function() {
    $(this.el).html(this.template(this.model.toJSON()));
    var artist = this.model.toJSON();
    $(".sub-title").html(artist.name);
    var artistimage = null;
    if (artist.image === '' || artist.image === null){
      artistimage = 'img/artists/noimage.png';
    }
    else {
      artistimage = artist.image;
    }
    $(".artist-img").html('<img src="'+artistimage+'" class="artist-img-src">');
    
    var events = this.model.events();
    for (var i=0;i<events.length;i++) {
     var item = new EventListView({ model : events.at(i) });
     this.$("#artist-events").append(item.render().el);
    }
    return this;
  }

});

var ArtistListView = Backbone.View.extend({

  tagName : "li",

  template : _.template("<a href='#artist/<%= id %>'><%= name %></a>"),
  
  initialize : function() {
    _.bindAll(this,"render");
  },

  render : function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
  
});

var Event = Backbone.Model.extend( {  

  initialize : function() {
    _.bindAll(this, "dereference", "name", "description", "category", "artists", "venue");
  },
  
  dereference : function(fieldName, modelCollection) {
    var modelId = this.get(fieldName);
    return modelCollection.filter(function(model) { 
      if (typeof(modelId) == "object") {
        return (modelId.indexOf(model.id) != -1);
      } else {
        return (model.id == modelId); 
      }
    });
  },
  
  name : function() {
    if (this.get("name")) {
      return this.get("name");
    } else {
      return this.artists().map(function(a){return a.get("name");}).join(', ');
    }
  },
  
  description : function() {
    if (this.get("description")) {
      return this.get("description");
    } else {
      var aa = this.artists();
      if (aa.length == 1) {
        return aa.at(0).get("blurb");
      }
    }
  },
  
  image : function() {
    if (this.get("image")) {
      return this.get("image");
    } else {
      var aa = this.artists();
      if (aa.length == 1) {
        return aa.at(0).get("image");
      }
    }
  },
  
  category : function() {
    return this.dereference("category", festival.categories)[0];
  },
  
  artists : function() {
    return new ArtistCollection(this.dereference("artist", festival.artists));
  },
  
  venue : function() {
    return this.dereference("venue", festival.venues)[0];
  }

} );
var EventView = Backbone.View.extend({

  // class : ".event-content",
  // commenting the above out because it isn't working in safari in iOS simulator.
  
  el : "#event-wrapper",

  template : _.template('<div class="copy-block"><label>WHEN</label><div id="date"><%= dateString %></div><label>WHERE</label><ul id="venuename"></ul><label>WHAT</label><div id="description"><%= description %></div></div><ul class="listview" id="event-artists"></ul>'),
  
  initialize : function() {
    _.bindAll(this, "render");
    $(this.el).addClass("event-content");
  },

  render : function() {
    var data = this.model.toJSON();
    _.extend(data,  { name : this.model.name(), 
                      description : (this.model.description() || ""),
                      dateString : dateFormat(this.model.get("date"), "dddd, mmmm dS, yyyy, h:MM:ss TT") });
    $(this.el).html(this.template(data));
    
    $(".sub-title").html(this.model.name());
  
    this.$("ul#venuename").html((new VenueListView({model:this.model.venue()})).render().el);
    
    // if (this.model.image()) {
    //   $(".event-img-src").attr('src',this.model.image());      
    //   $(".event-img").show();
    // } else {
    //   $(".event-img").hide();
    //   $(".event-img-src").attr('src',"");      
    // }
    
    var artists = this.model.artists();    
    for (var i=0;i<artists.length;i++) {
      var item = new ArtistListView({ model : artists.at(i) });
      this.$("#event-artists").append(item.render().el);
    }    
    
    return this;
  }

});

var EventListView = Backbone.View.extend({

  tagName : "li",
  
  template : _.template("<a href='#event/<%= id %>'><span class='cat'></span><div class='details'><span class='name'><%= eventName %></span><span class='venue'><%= venuename %></span><span class='time'><%= timeString %></span></div></a>"),

  initialize : function(options){
    if (options.dateFormatString) {
      this.dateFormatString = options.dateFormatString;
    }
  },
  
  dateFormatString : "dddd, mmmm dS h:MM TT",

  render : function() {
    var j = this.model.toJSON();
    var event = this.model;
    _.extend(j, { eventName : event.name(),
                  timeString : dateFormat(this.model.get("date"), this.dateFormatString),
                  venuename:this.model.venue().get('name') } );
    
    $(this.el).html(this.template(j));          
    
    var category = this.model.category();
    $(this.el).addClass(category.attributes.name);
    this.$('cat').addClass(category.attributes.name);

    return this;
  
  }

});

var EventsByDayListView = Backbone.View.extend({

  tagName : "li",
  
  initialize : function(options) {
    this.slug = options.slug;
    this.date = options.date;
  },

  template : _.template("<a href='#events/<%= slug %>'><%= dateString %></a>"),

  render : function() {
    var dateString = dateFormat(this.date, "dddd, mmmm dS");
    $(this.el).html(this.template({slug:this.slug, dateString:dateString}));
    return this;
  }

});

var EventsByDayView = Backbone.View.extend({

  el : "#events-by-day-list",

  initialize : function(options) {
    _.bindAll(this,"render");
    this.festival = options.festival;
  },

  render : function() {
    for (var slug in this.festival.eventsByDay) {
      var dateFromThisCollection = this.festival.eventsByDay[slug].at(0).get("date");
      row = new EventsByDayListView( { slug : slug , date : dateFromThisCollection } );
      $(this.el).append(row.render().el);
    }
    return this;
  }

});

var EventsView = Backbone.View.extend({

  el : '#events-page',
  
  initialize : function(options) {
    _.bindAll(this, "render");
    this.title = options.title;
    this.eventsToList = options.eventsToList;
    if (options.dateFormatString) {
      this.dateFormatString = options.dateFormatString;
    }
  },
  
  template : _.template('<div class="header"><div class="back-btn"><a class="dir-button back black"><span></span>back</a></div><h1 class="title"><%= title %></h1></div><div class="content scroller" id="events-content"><ul id="event-list" class="listview"></ul></div><div class="footer"><ul id="legend"></ul></div>'),
	
	dateFormatString : "dddd, mmmm dS h:MM TT",
	
  render : function() {
    
    $(this.el).html(this.template( { title : this.title }));
    
    //event list
    var eventListEl = this.$("#event-list");
    var dateFormatString = this.dateFormatString;
    this.eventsToList.forEach(function(e) {
      var item = new EventListView({ model : e, dateFormatString : dateFormatString });
      eventListEl.append(item.render().el);
    });
    
    //legend
    var legendEl = this.$('#legend');
    festival.categories.forEach(function(c) {
      tab = new CategoryFooterListView( { model : c } );
      legendEl.append(tab.render().el);
    });
    
    //bind to back button
    this.$(".back").bind('click',function(e){
      goBack(e); //TODO ugly - should probably not be a global function here
    });
    
    return this;
  }
  
  // boom : function() { alert('BOOOOOOOOM'); }

});

//backbone model for a sponsor

window.Sponsor = Backbone.Model.extend( {  

  defaults : {
    //"image" : "no image",
    "blurb" : ""
  }

} );
var SponsorView = Backbone.View.extend({
  
  template : _.template('<div class="image loading"><img src="img/sponsors/<%= image %>" width="320" height="125"></div><div class="blurb"><%= blurb %></div><div class="url"><a href="<%= url %>" class="url"><%= url %></a></div>'),

  events : { },
  
  initialize : function() {
    _.bindAll(this, "render");
    //$(this.el).addClass("sponsor-content");    
  },

  render : function() {
    var j = this.model.toJSON();
    // if (!j.image) {
    //   j.image = "no image";
    // }
    // if (!j.blurb) {
    //   j.blurb = "blurb";
    // }
    $(this.el).html(this.template(j));
    var sponsor = this.model.toJSON();
    
    return this;
  }

});

var SponsorListView = Backbone.View.extend({

  tagName : "li",

  template : _.template("<a href='#sponsor/<%= id %>'><%= name %></a>"),

  render : function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }

});

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
var VenueView = Backbone.View.extend({
  
  template : _.template('<div id="map" class="loading"><img src="http://maps.googleapis.com/maps/api/staticmap?center=<%= address %>&zoom=15&size=320x200&markers=color:red%7C<%=address%>&sensor=false"></div><div class="address"><div class="name"><%= name %></div><%= address %></div><div id="venue-wrapper"><ul id="venue-events" class="listview"></ul></div>'),  

  events : {},
  
  initialize : function(options) {
    _.bindAll(this,"render");
    this.render();
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

var VenueListView = Backbone.View.extend({

  tagName : "li",

  template : _.template("<a href='#venue/<%= id %>'><%= name %></a>"),

  render : function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
  
});

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
var FestivalView = Backbone.View.extend({

  el : "#home-page",

  template : _.template('<div id="buttons"></div>'),

  events : {},
  
  initialize : function(options) {
    _.bindAll(this,"render");
  },

  render : function() {    
    
    this.$("#buttons").html('');
    var buttons = { schedule:"#events-by-day",
                    artists:"#artists",
                    venues:"#venues",
                    twitter:"#twitter",
                    sponsors:"#sponsors",
                    info:"#info"};
    for (var key in buttons) {
      var button = new FestivalViewButton( { name:key, selectorLink:buttons[key] } );
      this.$("#buttons").append(button.render().el);
    }
        
    return this;
  }

});

var FestivalViewButton = Backbone.View.extend({

  
  initialize : function(options) {
    _.bindAll(this,"render");
    this.name = options.name;
    this.selectorLink = options.selectorLink;
  },

  template : _.template('<a href="<%= selectorLink  %>" class="button"><%= name %></a>'),

  render : function() {
    $(this.el).html(this.template( { selectorLink:this.selectorLink, name:this.name } ));  
    return this;
  }
  
});

var FestivalRouter = Backbone.Router.extend({
  
  initialize : function(options) {
    this.model = options.model;
    _.bindAll(this,"home","eventsByDay","events","event","category","artists","artist","venues","venue","twitter","sponsors","info");
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
  
  showPage : function(selector) {
    $('.active').removeClass('active');
    $(selector).addClass('active');   
    setContentHeight();   
    $('.dir-button.black').css('color','#fff');
  },
  
  home : function() {
    this.showPage('#home-page');
  },
  
  eventsByDay: function() {
    this.showPage('#events-by-day-page');
  },

  events: function(slug) {
    var events = festival.eventsByDay[slug];
    var dateString = dateFormat((new Date(events.at(0).get("date"))), "dddd mm/dd");
    var view = new EventsView( { title : dateString, eventsToList : events, dateFormatString : "h:MM TT" } );
    view.render();
    this.showPage('#events-page');    
    scrollThis('events-content');     
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
    $("#event-content").html(eventView.render().el);        
    this.showPage('#event-page');
    scrollThis('event-content'); 
  },
  
  category: function(id) {
    var cat = null;
    for (i=0;i<this.model.categories.length;i++) {
      if (this.model.categories.at(i).id == id) {
        cat = this.model.categories.at(i);
        break;
      }
    }
    var view = new EventsView( { title : cat.get("name"), eventsToList : cat.events() } );
    view.render();
    this.showPage('#events-page');
    scrollThis('events-content');
  },
  
  artists: function() {
    this.showPage('#artists-page');
    scrollThis('artists-content'); 
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
    $("#artist-content").html(artistView.render().el);        
    this.showPage('#artist-page');   
    scrollThis('artist-content'); 
     
  },

  venues: function() {
    this.showPage('#venues-page');
    scrollThis('venues-content'); 
    
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
    $("#venue-content").html(venueView.render().el);    
    this.showPage('#venue-page');    
    scrollThis('venue-content'); 
  },
    
  twitter: function() {
    this.showPage('#twitter-page');
    scrollThis('twitter-content'); 
    
  },
  
  sponsors: function() {
    this.showPage('#sponsors-page');
    scrollThis('sponsors-content'); 
    
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
    $("#sponsor-content").html(view.render().el);    
    this.showPage('#sponsor-page');
  },

  info: function() {
    this.showPage('#info-page');
    scrollThis('info-content'); 
    
  }
  
});


var TwitterView = Backbone.View.extend({

  el : "#twitter-wrapper",

  events : {},
  
  initialize : function(options) {
    this.widget = new TWTR.Widget({
         version: 2,
         id: 'twitter-wrapper',
         type: 'search',
         search: options.search,
         interval: 6000,
         title: 'tweets about',
          // subject: 'olio festival',
         width: 320,
         height: 400,
         theme: {
           shell: {
             background: '#ffffff',
             color: '#ffffff'
           },
           tweets: {
             background: '#ffffff',
             color: '#555555',
             links: '#000000'
           }
         },
         features: {
           scrollbar: false,
           loop: false,
           live: false,
           hashtags: true,
           timestamp: true,
           avatars: true,
           toptweets: true,
           behavior: 'all'
         }
       }).render().start();
  }

});

var infoView = Backbone.View.extend({
  
  el: '#info-wrapper',

  template : _.template('<p><%= ticketinfo %></p><p><%= about %></p><p><a href="<%= url %>" class="url"><%= url %></a></p><div id="credit"><h3>Who made this app?</h3><br>Your pals at <a id="credit-link" href="http://www.mainsocial.com">mainsocial</a> made this.</div>'),

  //events : { },
  
  initialize : function() {
    _.bindAll(this,"render");
    this.render();  
  },

  render : function() {    
    $(this.el).html(this.template(this.model));
    return this;
  }
 

});

// CHECK FOR INTERNET CONNECTION
function onLoad() {
  document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
  checkConnection();  
  //add class for platform
  var devicePlatform = device.platform;
  $("html").addClass(devicePlatform);  
}

function checkConnection() {
  var networkState = navigator.network.connection.type;
  var states = {};
  states[Connection.UNKNOWN]  = 'Unknown connection';
  states[Connection.ETHERNET] = 'Ethernet connection';
  states[Connection.WIFI]     = 'WiFi connection';
  states[Connection.CELL_2G]  = 'Cell 2G connection';
  states[Connection.CELL_3G]  = 'Cell 3G connection';
  states[Connection.CELL_4G]  = 'Cell 4G connection';
  states[Connection.NONE]     = 'No network connection';
  if (states[networkState] == 'Unknown connection' || states[networkState] == 'No network connection'){
    alert('No internet connection detected. Check your connection and restart the app.');
    $('#buttons').html('<div class="nointernet">No internet connection detected. Check your connection and restart the app.</div>');
  }
}

function goBack(e) {
  e.preventDefault();
  $('.dir-button.black').css('color','gold');
  history.back();  
}

function scrollThis(el){
  var myScroll = null;
  myScroll = new iScroll(el, { hScrollbar: false, vScrollbar: false }); 
}

function setContentHeight(){
  var winHeight = window.innerHeight;
  var headHeight = $('.active .header').height();
  if (headHeight === null){
    headHeight = 0;
  }
  else {
    $('.active .content').css('top', headHeight);
    $('.active .header').css('height', headHeight);
  }   
  var footHeight = $('.active .footer').height();
  if (footHeight === null){
    footHeight = 0;
  }
  else {
    $('.active .footer').css('height', footHeight);
  }  
  var conHeight = winHeight - headHeight - footHeight;
  $('.active .content').css('height', conHeight);
}
