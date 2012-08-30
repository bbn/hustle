_ = require "underscore"
Backbone = require "backbone-browserify"
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

    artists = _(window.festival.artists.models).sortBy (artist) -> artist.get("name").toLowerCase()

    for artist in artists
      row = new ArtistListView { model:artist }
      @$('ul#artist-list').append row.render().el

    return @
  
