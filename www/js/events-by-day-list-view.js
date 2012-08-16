var EventsByDayListView = Backbone.View.extend({

  tagName : "li",
  
  initialize : function(options) {
    this.slug = options.slug;
    this.date = options.date;
  },

  template : _.template("<a href='#events/<%= slug %>'><%= dateString %></a>"),

  render : function() {
    var dateString = dateFormat(this.date, "dddd, mmmm dS");
    $(this.el).html(this.template({slug:this.slug, dateString:dateString}));
    return this;
  }

});
