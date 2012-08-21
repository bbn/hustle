(function() {
  var Backbone, EventListView, EventsView, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  _ = require("underscore");

  Backbone = require("backbone-browserify");

  EventListView = require("./event-list-view");

  module.exports = EventsView = (function(_super) {

    __extends(EventsView, _super);

    function EventsView() {
      this.render = __bind(this.render, this);
      EventsView.__super__.constructor.apply(this, arguments);
    }

    EventsView.prototype.title = null;

    EventsView.prototype.backLabel = "Back";

    EventsView.prototype.initialize = function(options) {
      this.title = options.title;
      this.eventsToList = options.eventsToList;
      if (options.dateFormatString) {
        return this.dateFormatString = options.dateFormatString;
      }
    };

    EventsView.prototype.template = _.template('<ul id="event-list" class="listview"></ul>');

    EventsView.prototype.dateFormatString = "dddd, mmmm dS h:MM TT";

    EventsView.prototype.render = function() {
      var eventListEl,
        _this = this;
      $(this.el).html(this.template({
        title: this.title
      }));
      eventListEl = this.$("#event-list");
      this.eventsToList.forEach(function(e) {
        var item;
        item = new EventListView({
          model: e,
          dateFormatString: _this.dateFormatString
        });
        return eventListEl.append(item.render().el);
      });
      return this;
    };

    return EventsView;

  })(Backbone.View);

}).call(this);
