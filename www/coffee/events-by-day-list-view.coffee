_ = require "underscore"
Backbone = require "backbone-browserify"

module.exports = class EventsByDayListView extends Backbone.View

  tagName : "li"
  
  initialize : (options)-> 
    @slug = options.slug
    @date = options.date
    @name = options.name

  template : _.template("<a class='button' href='#event/<%= slug %>'><%= name %></a>")

  render : ()->
    dateString = dateFormat(@date, "dddd, mmmm dS")
    $(@el).html(@template({slug:@slug, dateString:dateString, name:@name}))

    return @