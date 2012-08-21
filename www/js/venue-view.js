(function() {
  var Backbone, VenueView, _,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  _ = require("underscore");

  Backbone = require("backbone-browserify");

  module.exports = VenueView = (function(_super) {

    __extends(VenueView, _super);

    function VenueView() {
      VenueView.__super__.constructor.apply(this, arguments);
    }

    VenueView.prototype.template = _.template('<div id="map" class="loading"><img src="http://maps.googleapis.com/maps/api/staticmap?center=<%= address %>&zoom=15&size=320x200&markers=color:red%7C<%=address%>&sensor=false"></div><div class="address"><div class="name"><%= name %></div><%= address %></div><div id="venue-wrapper"><ul id="venue-events" class="listview"></ul></div>');

    VenueView.prototype.title = null;

    VenueView.prototype.backLabel = "Back";

    VenueView.prototype.events = {};

    VenueView.prototype.initialize = function(options) {
      return this.title = this.model.get("name");
    };

    VenueView.prototype.render = function() {
      var event, item, _i, _len, _ref;
      $(this.el).html(this.template(this.model.toJSON()));
      _ref = this.model.events();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        item = new EventListView({
          model: event
        });
        this.$("#venue-events").append(item.render().el);
      }
      return this;
    };

    return VenueView;

  })(Backbone.View);

}).call(this);
