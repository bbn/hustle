var EventListView = Backbone.View.extend({

  tagName : "li",
  
  template : _.template("<a href='#event/<%= id %>'><span class='cat'></span><div class='details'><span class='name'><%= eventName %></span><span class='venue'><%= venuename %></span><span class='time'><%= timeString %></span></div></a>"),

  initialize : function(options){
    if (options.dateFormatString) {
      this.dateFormatString = options.dateFormatString;
    }
  },
  
  dateFormatString : "dddd, mmmm dS h:MM TT",

  render : function() {
    var j = this.model.toJSON();
    var event = this.model;
    _.extend(j, { eventName : event.name(),
                  timeString : dateFormat(this.model.get("date"), this.dateFormatString),
                  venuename:this.model.venue().get('name') } );
    
    $(this.el).html(this.template(j));          
    
    var category = this.model.category();
    if (!category) {
      console.log('PROBLEM: no category for '+this.model.name());
    } else {
      $(this.el).addClass(category.attributes.name);
      this.$('cat').addClass(category.attributes.name);
    }

    return this;
  
  }

});
