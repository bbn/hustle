_ = require "underscore"
Backbone = require "backbone"
VenueListView = require "./venue-list-view"

module.exports = class EventView extends Backbone.View
  
  title: null
  backLabel : "Back"

  template : _.template('<div class="copy-block"><label>WHEN</label><div id="date"><%= dateString %></div><label>WHERE</label><ul id="venuename"></ul><label>WHAT</label><div id="description"><%= description %></div></div><ul class="listview" id="event-artists"></ul>')
  
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
    
    for artist in @model.artists()
      item = new ArtistListView { model : artists.at(i) }
      @$("#event-artists").append(item.render().el)

    return @