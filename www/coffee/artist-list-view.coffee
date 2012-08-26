_ = require "underscore"
Backbone = require "backbone-browserify"

module.exports = class ArtistListView extends Backbone.View

  tagName: "li"
  template: _.template "<a class='button' href='#artist/<%= id %>'><%= name %></a>"
  
  # initialize: ()->
  #   # _.bindAll(this,"render");

  render: ()=>
    $(@el).html @template @model.toJSON()
    return @
