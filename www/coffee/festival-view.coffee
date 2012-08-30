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
      schedule:"#events-by-day"
      categories:"#categories"
      artists:"#artists"
      venues:"#venues"
      sponsors:"#sponsors"
      info:"#info"
      twitter:"#twitter"
    for key,val of buttons
      button = new FestivalViewButton( { name:key, selectorLink:val } )
      @$("#buttons").append(button.render().el)
    return @