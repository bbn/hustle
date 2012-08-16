var Event = Backbone.Model.extend( {  

  initialize : function() {
    _.bindAll(this, "dereference", "name", "description", "category", "artists", "venue");
  },
  
  dereference : function(fieldName, modelCollection) {
    var modelId = this.get(fieldName);
    return modelCollection.filter(function(model) { 
      if (typeof(modelId) == "object") {
        return (modelId.indexOf(model.id) != -1);
      } else {
        return (model.id == modelId); 
      }
    });
  },
  
  name : function() {
    if (this.get("name")) {
      return this.get("name");
    } else {
      return this.artists().map(function(a){return a.get("name");}).join(', ');
    }
  },
  
  description : function() {
    if (this.get("description")) {
      return this.get("description");
    } else {
      var aa = this.artists();
      if (aa.length == 1) {
        return aa.at(0).get("blurb");
      }
    }
  },
  
  image : function() {
    if (this.get("image")) {
      return this.get("image");
    } else {
      var aa = this.artists();
      if (aa.length == 1) {
        return aa.at(0).get("image");
      }
    }
  },
  
  category : function() {
    return this.dereference("category", festival.categories)[0];
  },
  
  artists : function() {
    return new ArtistCollection(this.dereference("artist", festival.artists));
  },
  
  venue : function() {
    return this.dereference("venue", festival.venues)[0];
  }

} );