(function() {
  var ArtistListView, ArtistsView, Backbone, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  _ = require("underscore");

  Backbone = require("backbone-browserify");

  ArtistListView = require("./artist-list-view");

  module.exports = ArtistsView = (function(_super) {

    __extends(ArtistsView, _super);

    function ArtistsView() {
      this.render = __bind(this.render, this);
      ArtistsView.__super__.constructor.apply(this, arguments);
    }

    ArtistsView.prototype.className = "artists-page";

    ArtistsView.prototype.title = "Artists";

    ArtistsView.prototype.backLabel = "Back";

    ArtistsView.prototype.template = _.template('<ul id="artist-list" class="listview"></ul>');

    ArtistsView.prototype.events = {};

    ArtistsView.prototype.initialize = function(options) {};

    ArtistsView.prototype.render = function() {
      var artist, row, _i, _len, _ref;
      this.$(this.el).html(this.template());
      _ref = window.festival.artists.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        artist = _ref[_i];
        row = new ArtistListView({
          model: artist
        });
        this.$('ul#artist-list').append(row.render().el);
      }
      return this;
    };

    return ArtistsView;

  })(Backbone.View);

}).call(this);
