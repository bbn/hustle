(function() {
  var Backbone, EventView, VenueListView, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  _ = require("underscore");

  Backbone = require("backbone");

  VenueListView = require("./venue-list-view");

  module.exports = EventView = (function(_super) {

    __extends(EventView, _super);

    function EventView() {
      this.render = __bind(this.render, this);
      EventView.__super__.constructor.apply(this, arguments);
    }

    EventView.prototype.title = null;

    EventView.prototype.backLabel = "Back";

    EventView.prototype.template = _.template('<div class="copy-block"><label>WHEN</label><div id="date"><%= dateString %></div><label>WHERE</label><ul id="venuename"></ul><label>WHAT</label><div id="description"><%= description %></div></div><ul class="listview" id="event-artists"></ul>');

    EventView.prototype.initialize = function() {
      this.title = this.model.get("name");
      return $(this.el).addClass("event-content");
    };

    EventView.prototype.render = function() {
      var artist, data, item, _i, _len, _ref;
      data = this.model.toJSON();
      _.extend(data, {
        name: this.model.name(),
        description: this.model.description() || "",
        dateString: dateFormat(this.model.get("date"), "dddd, mmmm dS, yyyy, h:MM:ss TT")
      });
      $(this.el).html(this.template(data));
      this.$("ul#venuename").html((new VenueListView({
        model: this.model.venue()
      })).render().el);
      _ref = this.model.artists();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        artist = _ref[_i];
        item = new ArtistListView({
          model: artists.at(i)
        });
        this.$("#event-artists").append(item.render().el);
      }
      return this;
    };

    return EventView;

  })(Backbone.View);

}).call(this);
