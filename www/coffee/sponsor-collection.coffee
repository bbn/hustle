Backbone = require "backbone"
Sponsor = require "./sponsor"

module.exports = class SponsorCollection extends Backbone.Collection
  
  model : Sponsor
