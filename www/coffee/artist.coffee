Backbone = require "backbone"

module.exports = class Artist extends Backbone.Model

  events: ()->
    artistId = this.id
    events = festival.events.filter (e)->       
      (e.artists().map ((a)-> a.id)).indexOf(artistId) != -1
    new EventCollection events
