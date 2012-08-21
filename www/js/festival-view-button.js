(function() {
  var Backbone, FestivalViewButton, _,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  _ = require("underscore");

  Backbone = require("backbone");

  module.exports = FestivalViewButton = (function(_super) {

    __extends(FestivalViewButton, _super);

    function FestivalViewButton() {
      FestivalViewButton.__super__.constructor.apply(this, arguments);
    }

    FestivalViewButton.prototype.initialize = function(options) {
      this.name = options.name;
      return this.selectorLink = options.selectorLink;
    };

    FestivalViewButton.prototype.template = _.template('<a href="<%= selectorLink  %>" class="button"><%= name %></a>');

    FestivalViewButton.prototype.render = function() {
      $(this.el).html(this.template({
        selectorLink: this.selectorLink,
        name: this.name
      }));
      return this;
    };

    return FestivalViewButton;

  })(Backbone.View);

}).call(this);
