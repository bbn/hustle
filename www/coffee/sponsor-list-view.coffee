_ = require "underscore"
Backbone = require "backbone"

module.exports = class SponsorListView extends Backbone.View

  tagName : "li"

  template : _.template("<a href='#sponsor/<%= id %>'><%= name %></a>")

  render : ()=>
    $(@el).html(@template(@model.toJSON()))
    return @
