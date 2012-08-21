(function() {
  var Backbone, EventsByDayListView, _,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  _ = require("underscore");

  Backbone = require("backbone");

  module.exports = EventsByDayListView = (function(_super) {

    __extends(EventsByDayListView, _super);

    function EventsByDayListView() {
      EventsByDayListView.__super__.constructor.apply(this, arguments);
    }

    EventsByDayListView.prototype.tagName = "li";

    EventsByDayListView.prototype.initialize = function(options) {
      this.slug = options.slug;
      return this.date = options.date;
    };

    EventsByDayListView.prototype.template = _.template("<a href='#events/<%= slug %>'><%= dateString %></a>");

    EventsByDayListView.prototype.render = function() {
      var dateString;
      dateString = dateFormat(this.date, "dddd, mmmm dS");
      $(this.el).html(this.template({
        slug: this.slug,
        dateString: dateString
      }));
      return this;
    };

    return EventsByDayListView;

  })(Backbone.View);

}).call(this);
