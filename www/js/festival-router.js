(function() {
  var ArtistView, Backbone, EventView, EventsView, FestivalRouter, SponsorView, VenueView,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Backbone = require("backbone-browserify");

  EventView = require("./event-view");

  EventsView = require("./events-view");

  ArtistView = require("./artist-view");

  VenueView = require("./venue-view");

  SponsorView = require("./sponsor-view");

  module.exports = FestivalRouter = (function(_super) {

    __extends(FestivalRouter, _super);

    function FestivalRouter() {
      this.info = __bind(this.info, this);
      this.sponsor = __bind(this.sponsor, this);
      this.sponsors = __bind(this.sponsors, this);
      this.twitter = __bind(this.twitter, this);
      this.venue = __bind(this.venue, this);
      this.venues = __bind(this.venues, this);
      this.artist = __bind(this.artist, this);
      this.artists = __bind(this.artists, this);
      this.event = __bind(this.event, this);
      this.events = __bind(this.events, this);
      this.eventsByDay = __bind(this.eventsByDay, this);
      this.home = __bind(this.home, this);
      FestivalRouter.__super__.constructor.apply(this, arguments);
    }

    FestivalRouter.prototype.initialize = function(options) {
      return this.model = options.model;
    };

    FestivalRouter.prototype.routes = {
      "": "home",
      "events-by-day": "eventsByDay",
      "events/:slug": "events",
      "category/:id": "category",
      "artists": "artists",
      "artist/:id": "artist",
      "venues": "venues",
      "venue/:id": "venue",
      "twitter": "twitter",
      "sponsors": "sponsors",
      "sponsor/:id": "sponsor",
      "info": "info",
      "event/:id": "event"
    };

    FestivalRouter.prototype.showPage = function(view) {
      var viewDescriptor;
      viewDescriptor = {
        title: view.title,
        backLabel: view.backLabel,
        backCallback: this.handleNavigateBack,
        view: view.$el
      };
      window.viewNavigator.pushView(viewDescriptor);
      if (!view.noClickDelay) {
        new NoClickDelay(view.el);
        return view.noClickDelay = true;
      } else {
        return setTimeout((function() {
          return view.$("a.pressed").removeClass('pressed');
        }), 200);
      }
    };

    FestivalRouter.prototype.findObjectWithId = function(id, objects) {
      var x, y, _i, _len;
      id = parseInt(id);
      x = null;
      for (_i = 0, _len = objects.length; _i < _len; _i++) {
        y = objects[_i];
        if (y.id === id) {
          x = y;
          break;
        }
      }
      return x;
    };

    FestivalRouter.prototype.handleNavigateBack = function() {
      return history.back();
    };

    FestivalRouter.prototype.home = function() {
      return this.showPage(window.festivalView);
    };

    FestivalRouter.prototype.eventsByDay = function() {
      return this.showPage(window.eventsByDayView);
    };

    FestivalRouter.prototype.events = function(slug) {
      var dateString, events, view;
      events = festival.eventsByDay[slug];
      dateString = dateFormat(new Date(events.at(0).get("date")), "dddd mm/dd");
      view = new EventsView({
        title: dateString,
        eventsToList: events,
        dateFormatString: "h:MM TT"
      });
      view.render();
      return this.showPage(view);
    };

    FestivalRouter.prototype.event = function(id) {
      var eventView, evnt;
      evnt = this.findObjectWithId(id, this.model.events.models);
      eventView = new EventView({
        model: evnt
      });
      eventView.render();
      return this.showPage(eventView);
    };

    FestivalRouter.prototype.artists = function() {
      return this.showPage(window.artistsView);
    };

    FestivalRouter.prototype.artist = function(id) {
      var artist, artistView;
      artist = this.findObjectWithId(id, this.model.artists.models);
      artistView = new ArtistView({
        model: artist
      });
      artistView.render();
      return this.showPage(artistView);
    };

    FestivalRouter.prototype.venues = function() {
      return this.showPage(window.venuesView);
    };

    FestivalRouter.prototype.venue = function(id) {
      var venue, venueView;
      venue = this.findObjectWithId(id, this.model.venues.models);
      venueView = new VenueView({
        model: venue
      });
      venueView.render();
      return this.showPage(venueView);
    };

    FestivalRouter.prototype.twitter = function() {
      this.showPage(window.twitterView);
      return window.twitterView.render();
    };

    FestivalRouter.prototype.sponsors = function() {
      return this.showPage(window.sponsorsView);
    };

    FestivalRouter.prototype.sponsor = function(id) {
      var sponsor, view;
      sponsor = this.findObjectWithId(id, this.model.sponsors.models);
      view = new SponsorView({
        model: sponsor
      });
      view.render();
      return this.showPage(view);
    };

    FestivalRouter.prototype.info = function() {
      return this.showPage(window.infoView);
    };

    return FestivalRouter;

  })(Backbone.Router);

}).call(this);
