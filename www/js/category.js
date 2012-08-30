(function() {
  var Backbone, Category,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Backbone = require("backbone-browserify");

  module.exports = Category = (function(_super) {

    __extends(Category, _super);

    function Category() {
      Category.__super__.constructor.apply(this, arguments);
    }

    Category.prototype.events = function() {
      var EventCollection, events,
        _this = this;
      EventCollection = require("./event-collection");
      events = festival.events.filter(function(e) {
        var _ref;
        return _ref = _this.id, __indexOf.call(e.categories().pluck("id"), _ref) >= 0;
      });
      return new EventCollection(events);
    };

    return Category;

  })(Backbone.Model);

}).call(this);
