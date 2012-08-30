Backbone = require "backbone-browserify"

module.exports = class Category extends Backbone.Model

  events : ()->
    EventCollection = require "./event-collection"
    events = festival.events.filter (e)=>
      return @id in e.categories().pluck "id"
    return new EventCollection(events)
