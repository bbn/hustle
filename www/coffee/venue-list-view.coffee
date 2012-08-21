_ = require "underscore"
Backbone = require "backbone-browserify"

module.exports = class VenueListView extends Backbone.View

  tagName : "li"

  template : _.template("<a href='#venue/<%= id %>'><%= name %></a>")

  render : ()-> 
    $(@el).html(@template(@model.toJSON()))
    return @
