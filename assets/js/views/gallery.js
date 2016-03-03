(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};
  root.app.Collection = root.app.Collection || {};

  root.app.Collection.GalleryCollection = Backbone.Collection.extend({
    url: baseurl + '/json/gallery.json',
    
    comparator: function(item) {
      return parseInt(item.get("order"))
    },

    getPaginatedCollection: function(currentPage,itemsOnPage,filter) {
      var filteredCollection = (filter == 'all') ? this.toJSON() : this.filter(filter);
      return filteredCollection.slice(currentPage*itemsOnPage, (currentPage*itemsOnPage) + itemsOnPage)
    },

    getCount: function(filter) {
      var filteredCollection = (filter == 'all') ? this.toJSON() : this.filter(filter);
      return filteredCollection.length;
    },

    filter: function(filter) {
      return _.compact(_.map(this.toJSON(), function(v){
        return (v.filter == filter) ? v : null
      }))
    }

  });


  // View for display results
  root.app.View.GalleryView = Backbone.View.extend({

    el: '#galleryView',

    template: HandlebarsTemplates['gallery'],

    model: new (Backbone.Model.extend({
      defaults: {
        currentPage: 0,
        itemsOnPage: 5,
        filter: 'all'
      }
    })),

    events: {
      'change #gallery-filter' : 'changeFilter'
    },

    initialize: function() {
      this.setListeners();
      
      // Fetch collection
      this.collection = new root.app.Collection.GalleryCollection();
      this.collection.fetch().done(function(){
        this.render();
      }.bind(this));
    },

    setListeners: function() {
      this.model.on('change:currentPage', this.render.bind(this));
      this.model.on('change:filter', this.render.bind(this));
    },

    render: function() {
      this.$el.html(this.template({
        gallery: this.collection.getPaginatedCollection(this.model.get('currentPage'),this.model.get('itemsOnPage'),this.model.get('filter')),
        gallery_length: this.collection.getCount(this.model.get('filter'))
      }));

      this.cache();

      this.initPaginate();
      this.initChosen();
      this.scrollToTop();
    },

    cache: function() {
      this.$htmlbody = $("html, body");
      this.$paginator = this.$el.find('#gallery-paginator');
      this.$filters = this.$el.find('#gallery-filter');
    },

    // Inits after render
    initPaginate: function(){
      // pagination
      this.$paginator.pagination({
        items: this.collection.getCount(this.model.get('filter')),
        itemsOnPage: this.model.get('itemsOnPage'),
        currentPage: this.model.get('currentPage') + 1,
        displayedPages: 3,
        edges: 1,
        selectOnClick: false,
        prevText: ' ',
        nextText: ' ',
        onPageClick: _.bind(function(page, e){
          e && e.preventDefault();
          this.$paginator.pagination('drawPage', page);
          this.model.set('currentPage', page-1);
        }, this )
      });
    },

    initChosen: function() {
      this.$filters.val(this.model.get('filter'));

      // chosen
      this.$filters.chosen({
        disable_search: true
      });
    },

    scrollToTop: function() {
      this.$htmlbody.animate({
        scrollTop: this.$el.offset().top
      }, 250)
    },

    changeFilter: function(e) {
      this.model.set('currentPage', 0, { silent:true })
      this.model.set('filter', $(e.currentTarget).val());
    }

  });

})(this);