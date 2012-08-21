(function() {
  var Backbone, Category, CategoryCollection,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Backbone = require("backbone");

  Category = require("./category");

  module.exports = CategoryCollection = (function(_super) {

    __extends(CategoryCollection, _super);

    function CategoryCollection() {
      CategoryCollection.__super__.constructor.apply(this, arguments);
    }

    CategoryCollection.prototype.model = Category;

    return CategoryCollection;

  })(Backbone.Collection);

}).call(this);
