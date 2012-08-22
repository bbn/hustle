(function() {
  var ArtistCollection, Backbone, Event, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  _ = require("underscore");

  Backbone = require("backbone-browserify");

  ArtistCollection = require("./artist-collection");

  module.exports = Event = (function(_super) {

    __extends(Event, _super);

    function Event() {
      this.dereference = __bind(this.dereference, this);
      Event.__super__.constructor.apply(this, arguments);
    }

    Event.prototype.initialize = function() {};

    Event.prototype.dereference = function(fieldName, modelCollection) {
      var modelId;
      modelId = this.get(fieldName);
      return modelCollection.filter(function(model) {
        if (typeof modelId === "object") {
          return modelId.indexOf(model.id) !== -1;
        } else {
          return model.id === modelId;
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

    Event.prototype.category = function() {
      return this.dereference("category", festival.categories)[0];
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
