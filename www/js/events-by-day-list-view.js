// Generated by CoffeeScript 1.3.3
(function() {
  var Backbone, EventsByDayListView, _,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require("underscore");

  Backbone = require("backbone-browserify");

  module.exports = EventsByDayListView = (function(_super) {

    __extends(EventsByDayListView, _super);

    function EventsByDayListView() {
      return EventsByDayListView.__super__.constructor.apply(this, arguments);
    }

    EventsByDayListView.prototype.tagName = "li";

    EventsByDayListView.prototype.initialize = function(options) {
      this.slug = options.slug;
      this.date = options.date;
      return this.name = options.name;
    };

    EventsByDayListView.prototype.template = _.template("<a class='button' href='#event/<%= slug %>'><%= name %></a>");

    EventsByDayListView.prototype.render = function() {
      var dateString;
      dateString = dateFormat(this.date, "dddd, mmmm dS");
      $(this.el).html(this.template({
        slug: this.slug,
        dateString: dateString,
        name: this.name
      }));
      return this;
    };

    return EventsByDayListView;

  })(Backbone.View);

}).call(this);
