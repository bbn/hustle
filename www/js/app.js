// Generated by CoffeeScript 1.3.3
(function() {
  var ArtistsView, Backbone, CategoriesView, EventsByDayView, Festival, FestivalRouter, FestivalView, InfoView, SponsorsView, TwitterView, VenuesView, conHeight, footHeight, headHeight;

  Backbone = require("backbone-browserify");

  Festival = require("./festival");

  FestivalRouter = require("./festival-router");

  FestivalView = require("./festival-view");

  ArtistsView = require("./artists-view");

  CategoriesView = require("./categories-view");

  EventsByDayView = require("./events-by-day-view");

  SponsorsView = require("./sponsors-view");

  VenuesView = require("./venues-view");

  InfoView = require("./info-view");

  TwitterView = require("./twitter-view");

  window.app = {
    initialize: function() {
      return this.bind();
    },
    bind: function() {
      if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
        return document.addEventListener('deviceready', this.deviceready, false);
      } else {
        return this.prepData();
      }
    },
    deviceready: function() {
      app.checkConnection();
      return app.prepData();
    },
    prepData: function() {
      var hasLoadedData, postDataLoad;
      window.viewNavigator = new ViewNavigator('body');
      hasLoadedData = false;
      postDataLoad = function(data) {
        if (!hasLoadedData) {
          hasLoadedData = true;
          return app.loadData(data);
        }
      };
      $.ajax({
        dataType: "jsonp",
        jsonpCallback: "jsonp1",
        url: 'http://www.mainsocial.com/fest/nff2012.json?callback=?',
        success: function(data) {
          postDataLoad(data);
          return window.localStorage.setItem("festivalData", JSON.stringify(data));
        }
      });
      return $('.page').css('height', window.innerHeight);
    },
    checkConnection: function() {
      var networkState, states;
      console.log("checking internet connection...");
      networkState = navigator.network.connection.type;
      states = {};
      states[Connection.UNKNOWN] = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI] = 'WiFi connection';
      states[Connection.CELL_2G] = 'Cell 2G connection';
      states[Connection.CELL_3G] = 'Cell 3G connection';
      states[Connection.CELL_4G] = 'Cell 4G connection';
      states[Connection.NONE] = 'No network connection';
      if (states[networkState] === 'Unknown connection' || states[networkState] === 'No network connection') {
        return alert("No internet connection detected. Check your connection and restart the app.");
      }
    },
    loadData: function(data) {
      window.festival = new Festival(data);
      window.festivalRouter = new FestivalRouter({
        model: window.festival
      });
      window.festivalView = new FestivalView({
        model: window.festival,
        router: window.festivalRouter
      });
      window.festivalView.render();
      Backbone.history.start();
      window.artistsView = new ArtistsView({
        router: window.festivalRouter
      });
      window.artistsView.render();
      window.categoriesView = new CategoriesView({
        router: window.festivalRouter
      });
      window.categoriesView.render();
      window.eventsByDayView = new EventsByDayView({
        festival: festival
      });
      window.eventsByDayView.render();
      window.sponsorsView = new SponsorsView({
        festival: festival
      });
      window.sponsorsView.render();
      window.venuesView = new VenuesView({
        festival: festival
      });
      window.venuesView.render();
      window.infoView = new InfoView({
        model: festival.get("info")
      });
      window.infoView.render();
      window.twitterView = new TwitterView({
        search: "@NewFormsFest"
      });
      return window.twitterView.render();
    }
  };

  window.winHeight = window.innerHeight;

  headHeight = $('.active .header').height();

  if (headHeight === null) {
    headHeight = 0;
  } else {
    $('.active .content').css('top', headHeight);
    $('.active .header').css('height', headHeight);
  }

  footHeight = $('.active .footer').height();

  if (footHeight === null) {
    footHeight = 0;
  } else {
    $('.active .footer').css('height', footHeight);
  }

  conHeight = winHeight - headHeight - footHeight;

  $('.active .content').css('height', conHeight);

}).call(this);
