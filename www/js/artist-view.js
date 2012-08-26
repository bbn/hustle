// Generated by CoffeeScript 1.3.3
(function() {
  var ArtistView, Backbone, EventListView, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require("underscore");

  Backbone = require("backbone-browserify");

  EventListView = require("./event-list-view");

  module.exports = ArtistView = (function(_super) {

    __extends(ArtistView, _super);

    function ArtistView() {
      this.render = __bind(this.render, this);
      return ArtistView.__super__.constructor.apply(this, arguments);
    }

    ArtistView.prototype.title = null;

    ArtistView.prototype.backLabel = "Back";

    ArtistView.prototype.template = _.template('<div class="copy-block"><div class="artist-img"></div><label>WHO</label><div id="blurb"><%= blurb %></div><div id="url"><a href="<%= url %>" class="url" target="_blank">Visit Link</a></div></div><ul id="artist-events" class="listview"></ul>');

    ArtistView.prototype.initialize = function() {
      return this.title = this.model.get("name");
    };

    ArtistView.prototype.render = function() {
      var artist, artistimage, event, item, _i, _len, _ref;
      $(this.el).html(this.template(this.model.toJSON()));
      artist = this.model.toJSON();
      if (artist.image === '' || artist.image === null) {
        artistimage = 'img/artists/nff-default.png';
      } else {
        artistimage = artist.image;
      }
      this.$(".artist-img").html("<img src='img/artists/" + artistimage + "' class='artist-img-src'>");
      _ref = this.model.events().models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        item = new EventListView({
          model: event
        });
        this.$("#artist-events").append(item.render().el);
      }
      return this;
    };

    return ArtistView;

  })(Backbone.View);

}).call(this);
