// Generated by CoffeeScript 1.3.3
(function() {
  var Artist, Backbone,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Backbone = require("backbone-browserify");

  module.exports = Artist = (function(_super) {

    __extends(Artist, _super);

    function Artist() {
      return Artist.__super__.constructor.apply(this, arguments);
    }

    Artist.prototype.events = function() {
      var EventCollection, events,
        _this = this;
      EventCollection = require("./event-collection");
      events = festival.events.filter(function(e) {
        return (e.artists().map((function(a) {
          return a.id;
        }))).indexOf(_this.id) !== -1;
      });
      return new EventCollection(events);
    };

    return Artist;

  })(Backbone.Model);

}).call(this);
