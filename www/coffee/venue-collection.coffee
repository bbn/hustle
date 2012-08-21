Backbone = require "backbone-browserify"
Venue = require "./venue"

module.exports = class VenueCollection extends Backbone.Collection
  
  model : Venue
