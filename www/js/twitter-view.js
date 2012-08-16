var TwitterView = Backbone.View.extend({

  className : "twitter-view",

  title : "Twitter",

  backLabel : "Back",

  template : _.template('<div id="twitter-wrapper"></div>'),


  events : {},
  
  initialize : function(options) {
    _.bindAll(this,"render");
    this.search = options.search;
  },

  render : function () {
    $(this.el).html(this.template(this.model));
    this.widget = new TWTR.Widget({
         version: 2,
         id: "twitter-wrapper",
         type: 'search',
         search: this.search,
         interval: 6000,
         title: 'tweets about',
          //subject: 'olio festival',
         width: 320,
         height: 400,
         theme: {
           shell: {
             background: '#ffffff',
             color: '#ffffff'
           },
           tweets: {
             background: '#ffffff',
             color: '#555555',
             links: '#000000'
           }
         },
         features: {
           scrollbar: false,
           loop: false,
           live: false,
           hashtags: true,
           timestamp: true,
           avatars: true,
           toptweets: true,
           behavior: 'all'
         }
       });
    this.widget.render();
    this.widget.start();
  }

});
