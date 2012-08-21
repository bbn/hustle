(function() {
  var Backbone, Event, EventCollection,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Backbone = require("backbone");

  Event = require("./event");

  module.exports = EventCollection = (function(_super) {

    __extends(EventCollection, _super);

    function EventCollection() {
      EventCollection.__super__.constructor.apply(this, arguments);
    }

    EventCollection.prototype.model = Event;

    EventCollection.prototype.comparator = function(event) {
      return new Date(event.get("date"));
    };

    return EventCollection;

  })(Backbone.Collection);

}).call(this);
