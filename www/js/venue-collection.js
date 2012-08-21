(function() {
  var Backbone, Venue, VenueCollection,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Backbone = require("backbone");

  Venue = require("./venue");

  module.exports = VenueCollection = (function(_super) {

    __extends(VenueCollection, _super);

    function VenueCollection() {
      VenueCollection.__super__.constructor.apply(this, arguments);
    }

    VenueCollection.prototype.model = Venue;

    return VenueCollection;

  })(Backbone.Collection);

}).call(this);
