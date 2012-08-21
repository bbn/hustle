Backbone = require "backbone-browserify"
EventCollection = require "./event-collection"

module.exports = class Venue extends Backbone.Model
  
  events : ()-> 
    id = this.get("id")
    events = festival.events.filter (event)=> event.get("venue") == id
    return new EventCollection events
