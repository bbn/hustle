(function() {
  var Backbone, SponsorListView, SponsorsView, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  _ = require("underscore");

  Backbone = require("backbone-browserify");

  SponsorListView = require("./sponsor-list-view");

  module.exports = SponsorsView = (function(_super) {

    __extends(SponsorsView, _super);

    function SponsorsView() {
      this.render = __bind(this.render, this);
      SponsorsView.__super__.constructor.apply(this, arguments);
    }

    SponsorsView.prototype.className = "sponsors-page";

    SponsorsView.prototype.title = "Sponsors";

    SponsorsView.prototype.backLabel = "Back";

    SponsorsView.prototype.template = _.template('<ul id="sponsor-list" class="listview"></ul>');

    SponsorsView.prototype.events = {};

    SponsorsView.prototype.initialize = function(options) {
      return this.festival = options.festival;
    };

    SponsorsView.prototype.render = function() {
      var row, sponsor, _i, _len, _ref;
      $(this.el).html(this.template());
      _ref = this.festival.sponsors.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        sponsor = _ref[_i];
        row = new SponsorListView({
          model: sponsor
        });
        this.$('ul#sponsor-list').append(row.render().el);
      }
      return this;
    };

    return SponsorsView;

  })(Backbone.View);

}).call(this);
