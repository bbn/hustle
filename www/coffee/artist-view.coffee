_ = require "underscore"
Backbone = require "backbone-browserify"
EventListView = require "./event-list-view"

module.exports = class ArtistView extends Backbone.View
  
  title: null
  backLabel: "Back"
  
  template: _.template('<div class="artist-img loading"></div><div class="copy-block"><label>WHO</label><div id="blurb"><%= blurb %></div><div id="url"><a href="<%= url %>" class="url"><%= url %></a></div><label>WHEN</label></div><ul id="artist-events" class="listview"></ul>')
  
  initialize: ()->
    @title = @model.get "name"

  render: ()=> 
    $(@el).html(this.template(this.model.toJSON()))
    artist = @model.toJSON()
    if (artist.image == '' || artist.image == null) 
      artistimage = 'img/artists/noimage.png'
    else 
       artistimage = artist.image
    @$(".artist-img").html("<img src='img/artists/#{artistimage}' class='artist-img-src'>")
    for event in @model.events().models
      item = new EventListView { model: event }
      @$("#artist-events").append item.render().el
    return @
