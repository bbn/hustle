(function() {
  var Backbone, SponsorListView, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  _ = require("underscore");

  Backbone = require("backbone-browserify");

  module.exports = SponsorListView = (function(_super) {

    __extends(SponsorListView, _super);

    function SponsorListView() {
      this.render = __bind(this.render, this);
      SponsorListView.__super__.constructor.apply(this, arguments);
    }

    SponsorListView.prototype.tagName = "li";

    SponsorListView.prototype.template = _.template("<a class='details button' href='#sponsor/<%= id %>'><%= name %></a>");

    SponsorListView.prototype.render = function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    };

    return SponsorListView;

  })(Backbone.View);

}).call(this);
