_ = require "underscore"
Backbone = require "backbone-browserify"

module.exports = class CategoryListView extends Backbone.View

  tagName: "li"
  template: _.template "<a href='#category/<%= id %>'><%= name %></a>"
  
  render: =>
    $(@el).html @template @model.toJSON()
    return @