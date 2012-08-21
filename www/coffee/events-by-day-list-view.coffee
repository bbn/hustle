_ = require "underscore"
Backbone = require "backbone-browserify"

module.exports = class EventsByDayListView extends Backbone.View

  tagName : "li"
  
  initialize : (options)-> 
    @slug = options.slug
    @date = options.date

  template : _.template("<a href='#events/<%= slug %>'><%= dateString %></a>")

  render : ()->
    dateString = dateFormat(@date, "dddd, mmmm dS")
    $(@el).html(@template({slug:@slug, dateString:dateString}))
    return @