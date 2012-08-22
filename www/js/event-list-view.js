// Generated by CoffeeScript 1.3.3
(function() {
  var Backbone, EventListView, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require("underscore");

  Backbone = require("backbone-browserify");

  module.exports = EventListView = (function(_super) {

    __extends(EventListView, _super);

    function EventListView() {
      this.render = __bind(this.render, this);
      return EventListView.__super__.constructor.apply(this, arguments);
    }

    EventListView.prototype.tagName = "li";

    EventListView.prototype.template = _.template("<a href='#event/<%= id %>'><span class='cat'></span><div class='details'><span class='name'><%= eventName %></span><span class='venue'><%= venuename %></span><span class='time'><%= timeString %></span></div></a>");

    EventListView.prototype.initialize = function(options) {
      if (options.dateFormatString) {
        return this.dateFormatString = options.dateFormatString;
      }
    };

    EventListView.prototype.dateFormatString = "dddd, mmmm dS h:MM TT";

    EventListView.prototype.render = function() {
      var category, event, j;
      j = this.model.toJSON();
      event = this.model;
      _.extend(j, {
        eventName: event.name(),
        timeString: dateFormat(event.get("date"), this.dateFormatString),
        venuename: event.venue().get('name')
      });
      $(this.el).html(this.template(j));
      category = event.category();
      if (!category) {
        console.log("PROBLEM: no category for " + (event.name()));
      } else {
        $(this.el).addClass(category.attributes.name);
        this.$('cat').addClass(category.attributes.name);
      }
      return this;
    };

    return EventListView;

  })(Backbone.View);

}).call(this);
