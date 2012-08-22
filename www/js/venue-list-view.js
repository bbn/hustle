(function() {
  var Backbone, VenueListView, _,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  _ = require("underscore");

  Backbone = require("backbone-browserify");

  module.exports = VenueListView = (function(_super) {

    __extends(VenueListView, _super);

    function VenueListView() {
      VenueListView.__super__.constructor.apply(this, arguments);
    }

    VenueListView.prototype.tagName = "li";

    VenueListView.prototype.template = _.template("<a href='#venue/<%= id %>'><%= name %></a>");

    VenueListView.prototype.render = function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    };

    return VenueListView;

  })(Backbone.View);

}).call(this);
