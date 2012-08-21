_ = require "underscore"
Backbone = require "backbone"

module.exports = class VenueView extends Backbone.View
  
  template : _.template('<div id="map" class="loading"><img src="http://maps.googleapis.com/maps/api/staticmap?center=<%= address %>&zoom=15&size=320x200&markers=color:red%7C<%=address%>&sensor=false"></div><div class="address"><div class="name"><%= name %></div><%= address %></div><div id="venue-wrapper"><ul id="venue-events" class="listview"></ul></div>')

  title : null

  backLabel : "Back"

  events : {}
  
  initialize : (options)->
    @title = @model.get("name")
  
  render: ()->
    $(@el).html(@template(@model.toJSON()))
    for event in @model.events()
      item = new EventListView { model : event }
      @$("#venue-events").append(item.render().el)
    return @