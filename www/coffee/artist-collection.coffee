Backbone = require "backbone"
Artist = require "./artist"

module.exports = class ArtistCollection extends Backbone.Collection
  
  model : Artist
