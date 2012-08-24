_ = require "underscore"
Backbone = require "backbone-browserify"

module.exports = class SponsorView extends Backbone.View
  
  template : _.template('<div class="image"><img src="img/sponsors/<%= image %>" width="320" height="125"></div><div class="blurb"><%= blurb %></div><div class="url"><a href="<%= url %>" class="url"><%= url %></a></div>')

  title : null

  backLabel : "Back"

  events : { }
  
  initialize : ()-> 
    @title = @model.get("name")

  render : ()=>
    j = @model.toJSON()
    $(@el).html(@template(j))
    return @