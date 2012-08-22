Backbone = require "backbone-browserify"

module.exports = class Artist extends Backbone.Model

  events: ()->
    EventCollection = require "./event-collection"
    events = festival.events.filter (e)=>       
      (e.artists().map ((a)-> a.id)).indexOf(@id) != -1
    return new EventCollection(events)
