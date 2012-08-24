_ = require "underscore"
Backbone = require "backbone-browserify"
FestivalViewButton = require "./festival-view-button"

module.exports = class FestivalView extends Backbone.View

  className : "home-page"
  
  title : null

  backLabel : null

  template : _.template('<div id="buttons"></div>')

  events : {}
  
  initialize : (options)->
    @title = @model.get("info").name

  render : ()-> 
    $(@el).html(@template())
    buttons = 
      events:"#events-by-day"
      artists:"#artists"
      venues:"#venues"
      twitter:"#twitter"
      sponsors:"#sponsors"
      info:"#info"
    for key,val of buttons
      button = new FestivalViewButton( { name:key, selectorLink:val } )
      @$("#buttons").append(button.render().el)
    return @