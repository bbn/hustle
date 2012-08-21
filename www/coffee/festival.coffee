Backbone = require "backbone-browserify"

EventCollection = require "./event-collection"
VenueCollection = require "./venue-collection"
ArtistCollection = require "./artist-collection"
CategoryCollection = require "./category-collection"
SponsorCollection = require "./sponsor-collection"


slugify = (text) ->
  text = text.replace(/[^-a-zA-Z0-9,&\s]+/ig, '')
  text = text.replace(/-/gi, "_")
  text = text.replace(/\s/gi, "-")
  return text


module.exports = class Festival extends Backbone.Model

  initialize : ()->
    
    @venues = new VenueCollection(@get("venues"))
    @artists = new ArtistCollection(@get("artists"))
    @categories = new CategoryCollection(@get("categories"))
    @events = new EventCollection(@get("events"))
    @sponsors = new SponsorCollection(@get("sponsors"))
    @eventsByDay = {}
    for e in @events.models
      d = new Date(e.get("date"))
      s = d.toDateString()
      slug = slugify(s)
      if (!@eventsByDay[slug])
        @eventsByDay[slug] = new EventCollection()
      @eventsByDay[slug].add(e)
