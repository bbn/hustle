(function() {
  var Artist, Backbone,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Backbone = require("backbone");

  module.exports = Artist = (function(_super) {

    __extends(Artist, _super);

    function Artist() {
      Artist.__super__.constructor.apply(this, arguments);
    }

    Artist.prototype.events = function() {
      var artistId, events;
      artistId = this.id;
      events = festival.events.filter(function(e) {
        return (e.artists().map((function(a) {
          return a.id;
        }))).indexOf(artistId) !== -1;
      });
      return new EventCollection(events);
    };

    return Artist;

  })(Backbone.Model);

}).call(this);
