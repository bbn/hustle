Backbone = require "backbone-browserify"
EventView = require "./event-view"
EventsView = require "./events-view"
ArtistView = require "./artist-view"
VenueView = require "./venue-view"
SponsorView = require "./sponsor-view"

module.exports = class FestivalRouter extends Backbone.Router
  
  routes:
    "":                     "home"
    "events-by-day":        "eventsByDay"
    "events/:slug":         "events"
    "categories":           "categories"
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

  initialize : (options)->
    @model = options.model


  
  viewStack: []

  showPage : (view)=>
    @viewStack.push view
    window.viewNavigator.pushView
      title: view.title
      backLabel: view.backLabel
      backCallback: @handleNavigateBack
      view: view.$el
    if !view.noClickDelay
      view.noClickDelay = new NoClickDelay( view.el )

  goingBack: false

  handleNavigateBack : =>
    oldView = @viewStack.pop()
    newView = @viewStack[@viewStack.length-1]
    setTimeout @unpress(newView), 250
    @goingBack = true
    history.back()

  unpress: (view)->
    view.noClickDelay.pressedAnchor.removeClass("pressed") if view.noClickDelay.pressedAnchor
    view.noClickDelay.pressedAnchor = null


  findObjectWithId: (id,objects)->
    id = parseInt(id)
    x = null
    for y in objects
      if y.id == id
        x = y
        break
    return x

  home : =>
    return @goingBack = false if @goingBack    
    @showPage(window.festivalView)
  
  eventsByDay: =>
    return @goingBack = false if @goingBack
    @showPage(window.eventsByDayView)

  events: (id)=>
    return @goingBack = false if @goingBack      
    events = festival.eventsByDay[id]
    dateString = dateFormat((new Date(events.at(0).get("date"))), "dddd mm/dd")
    view = new EventsView( { title : dateString, eventsToList : events, dateFormatString : "h:MM TT" } )
    view.render()
    @showPage view

  event: (id)=>
    return @goingBack = false if @goingBack      
    evnt = @findObjectWithId id,@model.events.models
    eventView = new EventView { model : evnt }
    eventView.render()
    @showPage eventView

  categories: =>
    return @goingBack = false if @goingBack      
    @showPage(window.categoriesView)
  
  category: (id)=>
    return @goingBack = false if @goingBack      
    cat = @findObjectWithId id,@model.categories.models
    view = new EventsView
      title: cat.get("name")
      eventsToList: cat.events()
    view.render()
    @showPage view
  
  artists: =>
    return @goingBack = false if @goingBack      
    @showPage(window.artistsView)
  
  artist: (id)=>
    return @goingBack = false if @goingBack      
    artist = @findObjectWithId id,@model.artists.models
    artistView = new ArtistView { model : artist }
    artistView.render()
    @showPage(artistView)

  venues: =>
    return @goingBack = false if @goingBack      
    @showPage(window.venuesView)
  
  venue: (id)=>
    return @goingBack = false if @goingBack      
    venue = @findObjectWithId id,@model.venues.models
    venueView = new VenueView { model : venue }
    venueView.render()
    @showPage(venueView)
    
  twitter: =>
    return @goingBack = false if @goingBack
    $("#twitter-wrapper").show()
    @showPage(window.twitterView)
  
  sponsors: =>
    return @goingBack = false if @goingBack      
    @showPage(window.sponsorsView)
    
  sponsor: (id)=>
    return @goingBack = false if @goingBack      
    sponsor = @findObjectWithId id,@model.sponsors.models
    view = new SponsorView { model : sponsor }
    view.render()
    @showPage(view)

  info: =>
    return @goingBack = false if @goingBack      
    @showPage(window.infoView)
