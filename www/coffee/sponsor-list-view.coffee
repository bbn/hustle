_ = require "underscore"
Backbone = require "backbone-browserify"

module.exports = class SponsorListView extends Backbone.View

  tagName : "li"

  template : _.template("<a class='details button' href='#sponsor/<%= id %>'><%= name %></a>")

  render : ()=>
    $(@el).html(@template(@model.toJSON()))
    return @
