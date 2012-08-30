(function() {
  var ArtistCollection, Backbone, CategoryCollection, EventCollection, Festival, SponsorCollection, VenueCollection, slugify,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Backbone = require("backbone-browserify");

  EventCollection = require("./event-collection");

  VenueCollection = require("./venue-collection");

  ArtistCollection = require("./artist-collection");

  CategoryCollection = require("./category-collection");

  SponsorCollection = require("./sponsor-collection");

  slugify = function(text) {
    text = text.replace(/[^-a-zA-Z0-9,&\s]+/ig, '');
    text = text.replace(/-/gi, "_");
    text = text.replace(/\s/gi, "-");
    return text;
  };

  module.exports = Festival = (function(_super) {

    __extends(Festival, _super);

    function Festival() {
      Festival.__super__.constructor.apply(this, arguments);
    }

    Festival.prototype.initialize = function() {
      var d, e, s, slug, _i, _len, _ref, _results;
      this.venues = new VenueCollection(this.get("venues"));
      this.artists = new ArtistCollection(this.get("artists"));
      this.categories = new CategoryCollection(this.get("categories"));
      this.events = new EventCollection(this.get("events"));
      this.sponsors = new SponsorCollection(this.get("sponsors"));
      this.eventsByDay = {};
      _ref = this.events.models;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        d = new Date(e.get("date"));
        s = d.toDateString();
        slug = slugify(s);
        if (!this.eventsByDay[slug]) {
          this.eventsByDay[slug] = new EventCollection();
        }
        _results.push(this.eventsByDay[slug].add(e));
      }
      return _results;
    };

    return Festival;

  })(Backbone.Model);

}).call(this);
