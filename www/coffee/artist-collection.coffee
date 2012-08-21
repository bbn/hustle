Backbone = require "backbone-browserify"
Artist = require "./artist"

module.exports = class ArtistCollection extends Backbone.Collection
  
  model : Artist
