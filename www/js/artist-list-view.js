(function() {
  var ArtistListView, Backbone, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  _ = require("underscore");

  Backbone = require("backbone-browserify");

  module.exports = ArtistListView = (function(_super) {

    __extends(ArtistListView, _super);

    function ArtistListView() {
      this.render = __bind(this.render, this);
      ArtistListView.__super__.constructor.apply(this, arguments);
    }

    ArtistListView.prototype.tagName = "li";

    ArtistListView.prototype.template = _.template("<a href='#artist/<%= id %>'><%= name %></a>");

    ArtistListView.prototype.render = function() {
      this.$(this.el).html(this.template(this.model.toJSON()));
      return this;
    };

    return ArtistListView;

  })(Backbone.View);

}).call(this);
