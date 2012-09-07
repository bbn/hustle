(function() {
  var Backbone, CategoriesView, CategoryListView, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  _ = require("underscore");

  Backbone = require("backbone-browserify");

  CategoryListView = require("./category-list-view");

  module.exports = CategoriesView = (function(_super) {

    __extends(CategoriesView, _super);

    function CategoriesView() {
      this.render = __bind(this.render, this);
      CategoriesView.__super__.constructor.apply(this, arguments);
    }

    CategoriesView.prototype.className = "categories-page";

    CategoriesView.prototype.title = "Categories";

    CategoriesView.prototype.backLabel = "Back";

    CategoriesView.prototype.template = _.template('<ul id="category-list" class="listview"></ul>');

    CategoriesView.prototype.render = function() {
      var cat, categories, row, _i, _len;
      $(this.el).html(this.template());
      categories = _(window.festival.categories.models).sortBy(function(category) {
        return category.get("name").toLowerCase();
      });
      for (_i = 0, _len = categories.length; _i < _len; _i++) {
        cat = categories[_i];
        row = new CategoryListView({
          model: cat
        });
        this.$('ul#category-list').append(row.render().el);
      }
      return this;
    };

    return CategoriesView;

  })(Backbone.View);

}).call(this);
