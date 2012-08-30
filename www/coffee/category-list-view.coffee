_ = require "underscore"
Backbone = require "backbone-browserify"

module.exports = class CategoryListView extends Backbone.View

  tagName: "li"
  template: _.template "<a class='details button' href='#category/<%= id %>'><span class='cat <%= name %>'></span><%= name %></a>"
  
  render: =>
    $(@el).html @template @model.toJSON()
    return @