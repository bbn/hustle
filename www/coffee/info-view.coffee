_ = require "underscore"
Backbone = require "backbone-browserify"

module.exports = class InfoView extends Backbone.View
  
  className: 'info-view'

  title : "Info"

  backLabel : "Back"

  template : _.template('<div class="copy-block"><p><%= ticketinfo %></p><p><%= about %></p><p><a href="<%= url %>" class="url"><%= url %></a></p><div id="credit"><h3>Who made this app?</h3><br>Your pals at <a id="credit-link" href="http://www.mainsocial.com" target="_blank">mainsocial</a> made this.</div></div>')

  render : ()=>
    $(@el).html(@template(@model))
    return @
