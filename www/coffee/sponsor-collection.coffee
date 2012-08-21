Backbone = require "backbone-browserify"
Sponsor = require "./sponsor"

module.exports = class SponsorCollection extends Backbone.Collection
  
  model : Sponsor
