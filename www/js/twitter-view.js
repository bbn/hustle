(function() {
  var Backbone, TwitterView, _,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  _ = require("underscore");

  Backbone = require("backbone-browserify");

  module.exports = TwitterView = (function(_super) {

    __extends(TwitterView, _super);

    function TwitterView() {
      TwitterView.__super__.constructor.apply(this, arguments);
    }

    TwitterView.prototype.el = "#twitter-wrapper";

    TwitterView.prototype.title = "Twitter";

    TwitterView.prototype.backLabel = "Back";

    TwitterView.prototype.template = _.template('<div id="twitter-wrapper"></div>');

    TwitterView.prototype.events = {};

    TwitterView.prototype.initialize = function(options) {
      return this.search = options.search;
    };

    TwitterView.prototype.render = function() {
      this.widget = new TWTR.Widget({
        version: 2,
        id: "twitter-wrapper",
        type: 'search',
        search: this.search,
        interval: 6000,
        title: 'tweets about',
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
      return this;
    };

    return TwitterView;

  })(Backbone.View);

}).call(this);
