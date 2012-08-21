_ = require "underscore"
Backbone = require "backbone-browserify"
VenueListView = require "./venue-list-view"

module.exports = class VenuesView extends Backbone.View 

  className : "venues-page"
  
  title : "Venues"

  backLabel : "Back"

  template : _.template('<ul id="venues-list" class="listview"></ul>')

  events : {}
  
  initialize : (options)-> 
    @festival = options.festival

  render : ()->
    $(@el).html(@template())
    for venue in @festival.venues.models
      row = new VenueListView { model : venue }
      @$('ul#venues-list').append(row.render().el)
    
    return @
