(function() {
  var Backbone, EventsByDayListView, EventsByDayView, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  _ = require("underscore");

  Backbone = require("backbone-browserify");

  EventsByDayListView = require("./events-by-day-list-view");

  module.exports = EventsByDayView = (function(_super) {

    __extends(EventsByDayView, _super);

    function EventsByDayView() {
      this.render = __bind(this.render, this);
      EventsByDayView.__super__.constructor.apply(this, arguments);
    }

    EventsByDayView.prototype.className = "events-by-day";

    EventsByDayView.prototype.title = "Events";

    EventsByDayView.prototype.backLabel = "Back";

    EventsByDayView.prototype.template = _.template('<ul id="events-by-day-list" class="listview"></ul>');

    EventsByDayView.prototype.events = {};

    EventsByDayView.prototype.initialize = function(options) {
      return this.festival = options.festival;
    };

    EventsByDayView.prototype.render = function() {
      var dateFromThisCollection, row, slug, val, _ref;
      _ref = this.festival.eventsByDay;
      for (slug in _ref) {
        val = _ref[slug];
        dateFromThisCollection = val.at(0).get("date");
        row = new EventsByDayListView({
          slug: slug,
          date: dateFromThisCollection
        });
        $(this.el).append(row.render().el);
      }
      return this;
    };

    return EventsByDayView;

  })(Backbone.View);

}).call(this);
