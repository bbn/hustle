var EventsByDayView = Backbone.View.extend({

  className : "events-by-day",

  title : "Events",

  backLabel : "Back",

  template : _.template('<ul id="events-by-day-list" class="listview"></ul>'),

  events : {},

  initialize : function(options) {
    _.bindAll(this,"render");
    this.festival = options.festival;
  },

  render : function() {
    for (var slug in this.festival.eventsByDay) {
      var dateFromThisCollection = this.festival.eventsByDay[slug].at(0).get("date");
      row = new EventsByDayListView( { slug : slug , date : dateFromThisCollection } );
      $(this.el).append(row.render().el);
    }
    return this;
  }

});
