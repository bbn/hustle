(function() {
  var Backbone, EventCollection, Venue,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Backbone = require("backbone");

  EventCollection = require("./event-collection");

  module.exports = Venue = (function(_super) {

    __extends(Venue, _super);

    function Venue() {
      Venue.__super__.constructor.apply(this, arguments);
    }

    Venue.prototype.events = function() {
      var events, id,
        _this = this;
      id = this.get("id");
      events = festival.events.filter(function(event) {
        return event.get("venue") === id;
      });
      return new EventCollection(events);
    };

    return Venue;

  })(Backbone.Model);

}).call(this);
