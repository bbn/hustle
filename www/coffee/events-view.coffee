_ = require "underscore"
Backbone = require "backbone"
EventsByDayListView = require "./events-by-day-list-view"

module.exports = class EventsView extends Backbone.View

  title : null

  backLabel : "Back"
  
  initialize : (options)-> 
    @title = options.title
    @eventsToList = options.eventsToList
    if options.dateFormatString
      @dateFormatString = options.dateFormatString
  
  template : _.template '<ul id="event-list" class="listview"></ul>'
  
  dateFormatString : "dddd, mmmm dS h:MM TT"
  
  render : ()=>
    
    $(@el).html(@template( { title : @title }))
    
    eventListEl = @$("#event-list")
    @eventsToList.forEach (e)=>
      item = new EventListView
        model : e
        dateFormatString : @dateFormatString
      eventListEl.append(item.render().el)
    
    festival.categories.forEach (c)=>
      tab = new CategoryFooterListView { model : c }
      @$('#legend').append(tab.render().el)
    
    return @