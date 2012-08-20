_ = require "underscore"
Backbone = require "backbone"
ArtistListView = require "./artist-list-view"

module.exports = class ArtistsView extends Backbone.View

  className: "artists-page"

  title: "Artists"

  backLabel: "Back"

  template: _.template('<ul id="artist-list" class="listview"></ul>')

  events: {}

  initialize: (options)-> 
    # _.bindAll(this,"render")

  render: ()=> 
    $(@el).html @template()

    for artist in window.festival.artists
      row = new ArtistListView { model:window.festival.artists.at(i) }
      @$('ul#artist-list').append row.render().el

    return @
  
