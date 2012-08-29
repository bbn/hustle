_ = require "underscore"
Backbone = require "backbone-browserify"
EventsByDayListView = require "./events-by-day-list-view"

module.exports = class EventsByDayView extends Backbone.View

  className : "events-by-day"

  title : "Events"

  backLabel : "Back"

  template : _.template('<ul id="events-by-day-list" class="listview"></ul>')

  events : {}

  initialize : (options)->
    @festival = options.festival

  render : ()=>

    for slug,val of @festival.eventsByDay
      dateFromThisCollection = val.at(0).get("date")
      row = new EventsByDayListView { slug : slug, date : dateFromThisCollection }
      $(@el).append(row.render().el)
    
    return @
