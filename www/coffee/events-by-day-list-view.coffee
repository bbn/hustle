_ = require "underscore"
Backbone = require "backbone-browserify"

module.exports = class EventsByDayListView extends Backbone.View

  tagName : "li"
  
  initialize : (options)-> 
    @slug = options.slug
    @date = options.date

  template : _.template("<a class='button' href='#event/<%= slug %>'><%= dateString %></a>")

  render : ()->
    dateString = dateFormat(@date, "dddd, mmmm dS")
    $(@el).html(@template({slug:@slug, dateString:dateString}))

    return @