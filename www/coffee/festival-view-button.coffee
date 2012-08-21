_ = require "underscore"
Backbone = require "backbone"

module.exports = class FestivalViewButton extends Backbone.View

  initialize : (options)->
    @name = options.name
    @selectorLink = options.selectorLink

  template : _.template('<a href="<%= selectorLink  %>" class="button"><%= name %></a>')

  render : ()->
    $(@el).html(@template( { selectorLink:@selectorLink, name:@name } ))
    return @