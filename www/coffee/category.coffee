Backbone = require "backbone"
EventCollection = require "./event-collection"

module.exports = class Category extends Backbone.Model

  events : ()->
    events = festival.events.filter (e)=>
      return e.get("category") == @id
    return new EventCollection(events)
