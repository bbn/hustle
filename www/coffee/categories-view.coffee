_ = require "underscore"
Backbone = require "backbone-browserify"
CategoryListView = require "./category-list-view"

module.exports = class CategoriesView extends Backbone.View

  className: "categories-page"

  title: "Categories"

  backLabel: "Back"

  template: _.template('<ul id="category-list" class="listview"></ul>')

  render: => 
    $(@el).html @template()

    categories = _(window.festival.categories.models).sortBy (category) -> category.get("name").toLowerCase()

    for cat in categories
      row = new CategoryListView { model:cat }
      @$('ul#category-list').append row.render().el

    return @