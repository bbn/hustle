(function() {
  var Backbone, InfoView, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  _ = require("underscore");

  Backbone = require("backbone-browserify");

  module.exports = InfoView = (function(_super) {

    __extends(InfoView, _super);

    function InfoView() {
      this.render = __bind(this.render, this);
      InfoView.__super__.constructor.apply(this, arguments);
    }

    InfoView.prototype.className = 'info-view';

    InfoView.prototype.title = "Info";

    InfoView.prototype.backLabel = "Back";

    InfoView.prototype.template = _.template('<p><%= ticketinfo %></p><p><%= about %></p><p><a href="<%= url %>" class="url" target="_blank"><%= url %></a></p><div id="credit"><h3>Who made this app?</h3><br>Your pals at <a id="credit-link" href="http://www.mainsocial.com">mainsocial</a> made this.</div>');

    InfoView.prototype.render = function() {
      $(this.el).html(this.template(this.model));
      return this;
    };

    return InfoView;

  })(Backbone.View);

}).call(this);
