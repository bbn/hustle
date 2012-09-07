_ = require "underscore"
Backbone = require "backbone-browserify"
EventListView = require "./event-list-view"

module.exports = class VenueView extends Backbone.View
  
  template : _.template('<div id="map" class="loading"><a href="http://maps.google.com/maps?q=<%= address %>&z=15" target="_blank"><img src="http://maps.googleapis.com/maps/api/staticmap?center=<%= address %>&zoom=15&size=320x200&markers=color:red%7C<%=address%>&sensor=false"></a></div><div class="address"><div class="name"><%= name %></div><%= address %><label>EVENTS AT THIS VENUE</label></div><div id="venue-wrapper"><ul id="venue-events" class="listview"></ul></div>')

  title : null

  backLabel : "Back"

  events : {}
  
  initialize : (options)->
    @title = @model.get("name")
  
  render: ()->
    $(@el).html(@template(@model.toJSON()))
    for event in @model.events().models
      item = new EventListView { model : event }
      @$("#venue-events").append(item.render().el)
    return @