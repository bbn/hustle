(function() {
  var Backbone, FestivalView, _,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  _ = require("underscore");

  Backbone = require("backbone");

  module.exports = FestivalView = (function(_super) {

    __extends(FestivalView, _super);

    function FestivalView() {
      FestivalView.__super__.constructor.apply(this, arguments);
    }

    FestivalView.prototype.className = "home-page";

    FestivalView.prototype.title = null;

    FestivalView.prototype.backLabel = null;

    FestivalView.prototype.template = _.template('<div id="buttons"></div>');

    FestivalView.prototype.events = {};

    FestivalView.prototype.initialize = function(options) {
      return this.title = this.model.get("info").name;
    };

    FestivalView.prototype.render = function() {
      var button, buttons, key, val, _len;
      $(this.el).html(this.template());
      buttons = {
        schedule: "#events-by-day",
        artists: "#artists",
        venues: "#venues",
        twitter: "#twitter",
        sponsors: "#sponsors",
        info: "#info"
      };
      for (val = 0, _len = buttons.length; val < _len; val++) {
        key = buttons[val];
        button = new FestivalViewButton({
          name: key,
          selectorLink: val
        });
        this.$("#buttons").append(button.render().el);
      }
      return this;
    };

    return FestivalView;

  })(Backbone.View);

}).call(this);
