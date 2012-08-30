_ = require "underscore"
Backbone = require "backbone-browserify"
ArtistCollection = require "./artist-collection"
CategoryCollection = require "./category-collection"

module.exports = class Event extends Backbone.Model  
  
  dereference: (fieldName, modelCollection)=>
    references = @get fieldName
    modelCollection.filter (model)->
      if typeof(references) == "object"
        return model.id in references
      else
        return model.id == references       
  
  name: ()->
    @get "name" or _(@artists()).pluck("name").join(', ')
    
  description: ()-> 
    @get("description") or @artists().at(0).get "blurb"
  
  image: ()->
    @get("image") or @artists().at(0).get "image"
  
  categories: ()->
    new CategoryCollection @dereference("category", festival.categories)

  artists: ()->
    new ArtistCollection(@dereference("artist", festival.artists))
  
  venue: ()->
    @dereference("venue", festival.venues)[0]