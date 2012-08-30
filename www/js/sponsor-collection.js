(function() {
  var Backbone, Sponsor, SponsorCollection,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Backbone = require("backbone-browserify");

  Sponsor = require("./sponsor");

  module.exports = SponsorCollection = (function(_super) {

    __extends(SponsorCollection, _super);

    function SponsorCollection() {
      SponsorCollection.__super__.constructor.apply(this, arguments);
    }

    SponsorCollection.prototype.model = Sponsor;

    return SponsorCollection;

  })(Backbone.Collection);

}).call(this);
