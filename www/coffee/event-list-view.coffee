_ = require "underscore"
Backbone = require "backbone-browserify"

module.exports = class EventListView extends Backbone.View

  tagName : "li"
  
  template : _.template("<a href='#event/<%= id %>'><span class='cat'></span><div class='details'><span class='name'><%= eventName %></span><span class='venue'><%= venuename %></span><span class='time'><%= timeString %></span></div></a>")

  initialize : (options)->
    if options.dateFormatString
      @dateFormatString = options.dateFormatString
  
  dateFormatString : "dddd, mmmm dS h:MM TT"

  render: ()=>
    j = @model.toJSON()
    event = @model
    _.extend j, 
      eventName: event.name()
      timeString: dateFormat event.get("date"), @dateFormatString
      venuename: event.venue().get('name') 
    $(@el).html @template(j)
    
    categories = event.categories().models
    if !categories
      console.log "PROBLEM: no categories for #{event.name()}"
    else
      for category in categories
        $(@el).addClass category.attributes.name
        @$('cat').addClass(category.attributes.name)
    return @