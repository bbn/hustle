(function() {
  var Backbone, SponsorView, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  _ = require("underscore");

  Backbone = require("backbone");

  module.exports = SponsorView = (function(_super) {

    __extends(SponsorView, _super);

    function SponsorView() {
      this.render = __bind(this.render, this);
      SponsorView.__super__.constructor.apply(this, arguments);
    }

    SponsorView.prototype.template = _.template('<div class="image loading"><img src="img/sponsors/<%= image %>" width="320" height="125"></div><div class="blurb"><%= blurb %></div><div class="url"><a href="<%= url %>" class="url"><%= url %></a></div>');

    SponsorView.prototype.title = null;

    SponsorView.prototype.backLabel = "Back";

    SponsorView.prototype.events = {};

    SponsorView.prototype.initialize = function() {
      return this.title = this.model.get("name");
    };

    SponsorView.prototype.render = function() {
      var j;
      j = this.model.toJSON();
      $(this.el).html(this.template(j));
      return this;
    };

    return SponsorView;

  })(Backbone.View);

}).call(this);
