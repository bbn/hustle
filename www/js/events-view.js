var EventsView = Backbone.View.extend({

  title : null,

  backLabel : "Back",
  
  initialize : function(options) {
    _.bindAll(this, "render");
    this.title = options.title;
    this.eventsToList = options.eventsToList;
    if (options.dateFormatString) {
      this.dateFormatString = options.dateFormatString;
    }
  },
  
  template : _.template('<ul id="event-list" class="listview"></ul>'),
	
	dateFormatString : "dddd, mmmm dS h:MM TT",
	
  render : function() {
    
    $(this.el).html(this.template( { title : this.title }));
    
    //event list
    var eventListEl = this.$("#event-list");
    var dateFormatString = this.dateFormatString;
    this.eventsToList.forEach(function(e) {
      var item = new EventListView({ model : e, dateFormatString : dateFormatString });
      eventListEl.append(item.render().el);
    });
    
    //legend
    var legendEl = this.$('#legend');
    festival.categories.forEach(function(c) {
      tab = new CategoryFooterListView( { model : c } );
      legendEl.append(tab.render().el);
    });
    
    return this;
  }
  
});
