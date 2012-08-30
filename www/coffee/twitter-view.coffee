_ = require "underscore"
Backbone = require "backbone-browserify"

module.exports = class TwitterView extends Backbone.View

  el: "#twitter-wrapper"
  #className : "twitter-view"

  title : "Twitter"

  backLabel : "Back"

  template : _.template('<div id="twitter-wrapper"></div>')

  events : {}
  
  initialize : (options)->
    @search = options.search

  render : ()->
    # $(@el).html(@template(@model))
    @widget = new TWTR.Widget
      version: 2
      id: "twitter-wrapper"
      type: 'search'
      search: @search
      interval: 6000
      title: 'tweets about'
      #subject: 'olio festival',
      width: 320
      height: 400
      theme: 
        shell:
          background: '#ffffff'
          color: '#ffffff'
        tweets: 
          background: '#ffffff'
          color: '#555555'
          links: '#000000'
      features: 
        scrollbar: false
        loop: false
        live: false
        hashtags: true
        timestamp: true
        avatars: true
        toptweets: true
        behavior: 'all'
    @widget.render()
    @widget.start()
    return @
