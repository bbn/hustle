_ = require "underscore"
Backbone = require "backbone-browserify"
VenueListView = require "./venue-list-view"
ArtistListView = require "./artist-list-view"

module.exports = class EventView extends Backbone.View
  
  title: null
  backLabel : "Back"

  template : _.template('<div class="copy-block"><label>WHEN</label><div id="date"><%= dateString %></div><label>WHAT</label><div id="description"><%= description %></div><label>WHERE</label></div><ul id="venuename" class="listview"></ul><ul class="listview" id="event-artists"></ul>')
  
  initialize : ()->
    @title = @model.get("name")
    $(@el).addClass("event-content")

  render: ()=> 
    data = @model.toJSON()
    _.extend data,
      name : @model.name()
      description : (@model.description() || "")
      dateString : dateFormat(@model.get("date"), "dddd, mmmm dS, yyyy, h:MM:ss TT")
    $(@el).html(@template(data))
    @$("ul#venuename").html((new VenueListView({model:@model.venue()})).render().el)
    
    for artist in @model.artists().models
      item = new ArtistListView { model : artist }
      @$("#event-artists").append(item.render().el)

    return @