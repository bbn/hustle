_ = require "underscore"
Backbone = require "backbone-browserify"

module.exports = class EventsByDayListView extends Backbone.View

  tagName : "li"
  
  initialize : (options)-> 
    @id = options.id
    @date = options.date
    @name = options.name

  template : _.template("<a class='button' href='#event/<%= id %>'><%= name %></a>")

  render : ()->
    dateString = dateFormat(@date, "dddd, mmmm dS")
    $(@el).html(@template({id:@id, dateString:dateString, name:@name}))

    return @