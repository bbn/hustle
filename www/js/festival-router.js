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
      var e, eventView, evnt, _i, _len, _ref;
      id = parseInt(id);
      evnt = null;
      _ref = this.model.events.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        if (e.id === id) {
          evnt = e;
          break;
        }
      }
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
      var a, artist, artistView, _i, _len, _ref;
      artist = null;
      _ref = this.model.artists.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        a = _ref[_i];
        if (a.id === id) {
          artist = a;
          break;
        }
      }
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
      var v, venue, venueView, _i, _len, _ref;
      id = parseInt(id);
      venue = null;
      _ref = this.model.venues.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        v = _ref[_i];
        if (v.id === id) {
          venue = v;
          break;
        }
      }
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
      var s, sponsor, view, _i, _len, _ref;
      id = parseInt(id);
      sponsor = null;
      _ref = this.model.sponsors.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        s = _ref[_i];
        if (s.id === id) {
          sponsor = s;
          break;
        }
      }
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
