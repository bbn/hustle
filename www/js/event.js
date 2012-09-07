(function() {
  var ArtistCollection, Backbone, CategoryCollection, Event, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ = require("underscore");

  Backbone = require("backbone-browserify");

  ArtistCollection = require("./artist-collection");

  CategoryCollection = require("./category-collection");

  module.exports = Event = (function(_super) {

    __extends(Event, _super);

    function Event() {
      this.dereference = __bind(this.dereference, this);
      Event.__super__.constructor.apply(this, arguments);
    }

    Event.prototype.dereference = function(fieldName, modelCollection) {
      var references;
      references = this.get(fieldName);
      return modelCollection.filter(function(model) {
        var _ref;
        if (typeof references === "object") {
          return _ref = model.id, __indexOf.call(references, _ref) >= 0;
        } else {
          return model.id === references;
        }
      });
    };

    Event.prototype.name = function() {
      return this.get("name" || _(this.artists()).pluck("name").join(', '));
    };

    Event.prototype.description = function() {
      return this.get("description") || this.artists().at(0).get("blurb");
    };

    Event.prototype.image = function() {
      return this.get("image") || this.artists().at(0).get("image");
    };

    Event.prototype.categories = function() {
      return new CategoryCollection(this.dereference("category", festival.categories));
    };

    Event.prototype.artists = function() {
      return new ArtistCollection(this.dereference("artist", festival.artists));
    };

    Event.prototype.venue = function() {
      return this.dereference("venue", festival.venues)[0];
    };

    return Event;

  })(Backbone.Model);

}).call(this);
