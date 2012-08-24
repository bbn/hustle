_ = require "underscore"
Backbone = require "backbone-browserify"

module.exports = class SponsorView extends Backbone.View
  
  template : _.template('<div class="image loading"><img src="img/sponsors/<%= image %>" max-width="320" max-height="125"></div><div class="blurb"><%= blurb %></div><div class="url"><a href="<%= url %>" class="url"><%= url %></a></div>')

  title : null

  backLabel : "Back"

  events : { }
  
  initialize : ()-> 
    @title = @model.get("name")

  render : ()=>
    j = @model.toJSON()
    $(@el).html(@template(j))
    return @