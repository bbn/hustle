(function() {
  var Backbone, CategoryListView, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  _ = require("underscore");

  Backbone = require("backbone-browserify");

  module.exports = CategoryListView = (function(_super) {

    __extends(CategoryListView, _super);

    function CategoryListView() {
      this.render = __bind(this.render, this);
      CategoryListView.__super__.constructor.apply(this, arguments);
    }

    CategoryListView.prototype.tagName = "li";

    CategoryListView.prototype.template = _.template("<a href='#category/<%= id %>'><%= name %></a>");

    CategoryListView.prototype.render = function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    };

    return CategoryListView;

  })(Backbone.View);

}).call(this);
