Backbone = require "backbone-browserify"
Event = require "./event"

module.exports = class EventCollection extends Backbone.Collection
  
  model : Event
  
  comparator : (event) ->
    new Date(event.get("date"))
