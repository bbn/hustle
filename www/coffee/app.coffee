Backbone = require "backbone-browserify"
Festival = require "./festival"
FestivalRouter = require "./festival-router"
FestivalView = require "./festival-view"

ArtistsView = require "./artists-view"
EventsByDayView = require "./events-by-day-view"
SponsorsView = require "./sponsors-view"
VenuesView = require "./venues-view"
InfoView = require "./info-view"
TwitterView = require "./twitter-view"


window.app =

  initialize: ()->
    @bind()
  
  bind: ()->
    if navigator.userAgent.match /(iPhone|iPod|iPad|Android|BlackBerry)/
      document.addEventListener 'deviceready', @deviceready, false
    else
      @prepData()

  deviceready: ()->
    app.checkConnection()
    app.prepData()

  prepData: ()-> 
    window.viewNavigator = new ViewNavigator('body')

    hasLoadedData = false
    postDataLoad = (data)->
      if !hasLoadedData
        hasLoadedData = true
        app.loadData data

    # // TODO get file cache working!

    # // var storeCache = new FileReader(); 
    # // storeCache.onload = function(jsonData){
    # //   console.log("storeCache.onload!");
    # //   var data = JSON.parse(jsonData);
    # // }; 
    # // storeCache.onerror = function(err){ 
    # //   console.log("error: "+JSON.stringify(err)); 
    # // }; 
    # // storeCache.readAsText('data/cityarts.json'); 


    storedData = window.localStorage.getItem "festivalData"
    if storedData
      # //TODO apparently there is no JSON object in Android 1.5 + 1.6.
      # //(source: https://groups.google.com/forum/?fromgroups#!topic/phonegap/OtiUFqjhW_E%5B1-25%5D)
      parsedData = JSON.parse storedData
      postDataLoad parsedData

    $.ajax
      dataType: "jsonp"
      jsonpCallback: "jsonp1"
      url:'http://www.mainsocial.com/fest/nff2012.json?callback=?'
      success: (data)->
        postDataLoad data
        window.localStorage.setItem "festivalData",JSON.stringify(data)
    
    $('.page').css('height', window.innerHeight);
      

  checkConnection: ()->
    console.log "checking internet connection..."
    networkState = navigator.network.connection.type
    states = {}
    states[Connection.UNKNOWN]  = 'Unknown connection'
    states[Connection.ETHERNET] = 'Ethernet connection'
    states[Connection.WIFI]     = 'WiFi connection'
    states[Connection.CELL_2G]  = 'Cell 2G connection'
    states[Connection.CELL_3G]  = 'Cell 3G connection'
    states[Connection.CELL_4G]  = 'Cell 4G connection'
    states[Connection.NONE]     = 'No network connection'
    if states[networkState] == 'Unknown connection' or states[networkState] == 'No network connection'
      alert "No internet connection detected. Check your connection and restart the app."

  # TODO most of what is in loadData should be in window.festival constructor
  loadData: (data)->
    # TODO adapt backbone code so that data can be updated in real-time if necessary.
    window.festival = new Festival data
    window.festivalRouter = new FestivalRouter {model:window.festival}
    window.festivalView = new FestivalView
      model: window.festival
      router: window.festivalRouter
    window.festivalView.render()

    Backbone.history.start()

    window.artistsView = new ArtistsView {router:window.festivalRouter}
    window.artistsView.render()

    window.eventsByDayView = new EventsByDayView {festival:festival}
    window.eventsByDayView.render()

    window.sponsorsView = new SponsorsView {festival:festival}
    window.sponsorsView.render()

    window.venuesView = new VenuesView {festival:festival}
    window.venuesView.render()
     
     # // //TODO remove the below.
     # // //create a view for the events-by-day div. populate the category footer in there.
     # // //create a view for the category footer. use it all over.
     # // festival.categories.forEach(function(c) {
     # //   tab = new CategoryFooterListView( { model : c } );
     # //   $("#legend").append(tab.render().el);
     # // });

    window.infoView = new InfoView {model:festival.get("info")}
    window.infoView.render()

    window.twitterView = new TwitterView {search:"@NewFormsFest"} #//festival.get("twitter").search });
    # //window.twitterView.render(); 
   

# TODO do we need the below method??

window.
  winHeight = window.innerHeight
  headHeight = $('.active .header').height()
  if headHeight == null
    headHeight = 0;
  else
    $('.active .content').css 'top', headHeight
    $('.active .header').css 'height', headHeight
  footHeight = $('.active .footer').height()
  if footHeight == null
    footHeight = 0;
  else
    $('.active .footer').css 'height', footHeight
  conHeight = winHeight - headHeight - footHeight
  $('.active .content').css 'height', conHeight