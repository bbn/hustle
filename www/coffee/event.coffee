_ = require "underscore"
Backbone = require "backbone-browserify"
ArtistCollection = require "./artist-collection"

module.exports = class Event extends Backbone.Model

  initialize: ()-> 
    # _.bindAll(this, "dereference", "name", "image", "description", "category", "artists", "venue");
  
  
  dereference : (fieldName, modelCollection)=>
    modelId = @get fieldName
    modelCollection.filter (model)->
      if typeof(modelId) == "object"
        return modelId.indexOf(model.id) != -1
      else
        return model.id == modelId       
  
  name: ()->
    @get "name" or _(@artists()).pluck("name").join(', ')
    
  description: ()-> 
    @get("description") or @artists().at(0).get "blurb"
  
  image: ()->
    @get("image") or @artists().at(0).get "image"
  
  category: ()->
    @dereference("category", festival.categories)[0]
  
  artists: ()->
    new ArtistCollection(@dereference("artist", festival.artists))
  
  venue: ()->
    @dereference("venue", festival.venues)[0]