(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};
  root.app.Collection = root.app.Collection || {};

  root.app.Collection.GalleryCollection = Backbone.Collection.extend({
    url: baseurl + '/json/gallery.json',
    comparator: function(item) {
      return item.get("order")
    }
  });



  // View for display results
  root.app.View.GalleryView = Backbone.View.extend({

    el: '#galleryView',

    template: HandlebarsTemplates['gallery'],

    initialize: function() {
      // Collection
      this.collection = new root.app.Collection.GalleryCollection();
      this.collection.fetch().done(function(){
        this.render();
      }.bind(this));
    },

    render: function() {
      this.$el.html(this.template({
        gallery: this.collection.toJSON(),
        gallery_length: this.collection.toJSON().length
      }));
    }


  });

})(this);