_ = require "underscore"
Backbone = require "backbone-browserify"

module.exports = class EventListView extends Backbone.View

  tagName : "li"
  
  template : _.template("<a href='#event/<%= id %>'><div class='details button'><span class='cat'></span><span class='name'><%= eventName %></span><span class='venue'><%= venuename %></span><span class='time'><%= timeString %></span></div></a>")

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
    
    category = event.category()
    if !category
      console.log "PROBLEM: no category for #{event.name()}"
    else
      $(@el).addClass category.attributes.name
      @$('cat').addClass(category.attributes.name)

    return @