(function() {
  var Backbone, VenueListView, VenuesView, _,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  _ = require("underscore");

  Backbone = require("backbone-browserify");

  VenueListView = require("./venue-list-view");

  module.exports = VenuesView = (function(_super) {

    __extends(VenuesView, _super);

    function VenuesView() {
      VenuesView.__super__.constructor.apply(this, arguments);
    }

    VenuesView.prototype.className = "venues-page";

    VenuesView.prototype.title = "Venues";

    VenuesView.prototype.backLabel = "Back";

    VenuesView.prototype.template = _.template('<ul id="venues-list" class="listview"></ul>');

    VenuesView.prototype.events = {};

    VenuesView.prototype.initialize = function(options) {
      return this.festival = options.festival;
    };

    VenuesView.prototype.render = function() {
      var row, venue, _i, _len, _ref;
      $(this.el).html(this.template());
      _ref = this.festival.venues.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        venue = _ref[_i];
        row = new VenueListView({
          model: venue
        });
        this.$('ul#venues-list').append(row.render().el);
      }
      return this;
    };

    return VenuesView;

  })(Backbone.View);

}).call(this);
