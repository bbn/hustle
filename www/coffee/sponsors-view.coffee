_ = require "underscore"
Backbone = require "backbone"

module.exports = class SponsorsView extends Backbone.View

  className : "sponsors-page"
  
  title : "Sponsors"

  backLabel : "Back"

  template : _.template('<ul id="sponsor-list" class="listview"></ul>')

  events : {}
  
  initialize : (options)-> 
    @festival = options.festival

  render : ()=> 
    $(@el).html(@template())
    for sponsor in @festival.sponsors.models
      row = new SponsorListView { model : sponsor }
      @$('ul#sponsor-list').append(row.render().el)
    return @
