Backbone = require "backbone-browserify"
Category = require "./category"

module.exports = class CategoryCollection extends Backbone.Collection
  
  model : Category
