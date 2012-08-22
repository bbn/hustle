Backbone = require "backbone-browserify"
EventView = require "./event-view"
EventsView = require "./events-view"
ArtistView = require "./artist-view"
VenueView = require "./venue-view"
SponsorView = require "./sponsor-view"

module.exports = class FestivalRouter extends Backbone.Router
  
  initialize : (options)->
    @model = options.model

  routes:
    "":                     "home"
    "events-by-day":        "eventsByDay"
    "events/:slug":         "events"
    "category/:id" :        "category"
    "artists":              "artists"
    "artist/:id":           "artist"  
    "venues":               "venues"
    "venue/:id":            "venue"
    "twitter":              "twitter"
    "sponsors":             "sponsors"
    "sponsor/:id":          "sponsor"
    "info":                 "info"
    "event/:id":            "event" 
  
  showPage : (view)->
    viewDescriptor =
      title: view.title
      backLabel: view.backLabel
      backCallback: @handleNavigateBack
      view: view.$el
    window.viewNavigator.pushView( viewDescriptor )

    if !view.noClickDelay
      new NoClickDelay( view.el )
      view.noClickDelay = true
    else
      setTimeout (()->view.$("a.pressed").removeClass('pressed')),200

  findObjectWithId: (id,objects)->
    id = parseInt(id)
    x = null
    for y in objects
      if y.id == id
        x = y
        break
    return x


  handleNavigateBack : ()->
    history.back()
  
  home : ()=>
    @showPage(window.festivalView)
  
  eventsByDay: ()=>
    @showPage(window.eventsByDayView)

  events: (slug)=>
    events = festival.eventsByDay[slug]
    dateString = dateFormat((new Date(events.at(0).get("date"))), "dddd mm/dd")
    view = new EventsView( { title : dateString, eventsToList : events, dateFormatString : "h:MM TT" } )
    view.render()
    @showPage(view)

  event: (id)=>
    evnt = @findObjectWithId id,@model.events.models
    eventView = new EventView { model : evnt }
    eventView.render()
    @showPage(eventView)
  
  # category: function(id) {
  #   var cat = null;
  #   for (i=0;i<@model.categories.length;i++) {
  #     if (@model.categories.at(i).id == id) {
  #       cat = @model.categories.at(i);
  #       break;
  #     }
  #   }
  #   var view = new EventsView( { title : cat.get("name"), eventsToList : cat.events() } );
  #   view.render();
  #   @showPage('#events-page');
  #   scrollThis('events-content');
  # },
  
  artists: ()=>
    @showPage(window.artistsView)
  
  artist: (id)=>
    artist = @findObjectWithId id,@model.artists.models
    artistView = new ArtistView { model : artist }
    artistView.render()
    @showPage(artistView)

  venues: ()=>
    @showPage(window.venuesView)
  
  venue: (id)=>
    venue = @findObjectWithId id,@model.venues.models
    venueView = new VenueView { model : venue }
    venueView.render()
    @showPage(venueView)
    
  twitter: ()=>
    @showPage(window.twitterView)
    window.twitterView.render()
  
  sponsors: ()=>
    @showPage(window.sponsorsView)
    
  sponsor: (id)=>
    sponsor = @findObjectWithId id,@model.sponsors.models
    view = new SponsorView { model : sponsor }
    view.render()
    @showPage(view)

  info: ()=>
    @showPage(window.infoView)
