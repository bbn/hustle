(function() {
  var Backbone, Category, EventCollection,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Backbone = require("backbone");

  EventCollection = require("./event-collection");

  module.exports = Category = (function(_super) {

    __extends(Category, _super);

    function Category() {
      Category.__super__.constructor.apply(this, arguments);
    }

    Category.prototype.events = function() {
      var events,
        _this = this;
      events = festival.events.filter(function(e) {
        return e.get("category") === _this.id;
      });
      return new EventCollection(events);
    };

    return Category;

  })(Backbone.Model);

}).call(this);
