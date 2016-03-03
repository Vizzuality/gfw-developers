(function(root) {

  'use strict';

  /**
   * Provide top-level namespaces for our javascript.
   * @type {Object}
   */
  root.app = root.app || {
    Model: {},
    Collection: {},
    View: {},
    Helper: {}
  };

  /**
   * Main Application View
   */
  root.app.AppView = Backbone.View.extend({

    /**
     * Main DOM element
     * @type {Object}
     */
    el: document.body,

    initialize: function() {
      this.router = new root.app.Router();
      this.setListeners();
    },

    setListeners: function() {
      this.listenTo(this.router, 'route:home', this.homePage);
      this.listenTo(this.router, 'route:map-builder', this.mapBuilderPage);
      this.listenTo(this.router, 'route:gallery', this.galleryPage);
      this.listenTo(this.router, 'route:develop', this.developPage);      
    },

    start: function() {
      Backbone.history.start({
        pushState: true,
        root: (!!baseurl) ? baseurl : "/"
      });

      this.setGlobalViews();
    },

    homePage: function() {
      this.featuredForestSliderView = new root.app.View.SliderView({
        el: '#featuredForestSliderView'
      });
      this.asideView = new root.app.View.AsideView({ options: { model: { id: null }}});
    },

    mapBuilderPage: function() {
      this.featuredForestSliderView = new root.app.View.SliderView({
        el: '#stepsSliderView',
        options: {
          defaultSlider: {
            infinite: false,
            navigation: false
          }            
        }
      });
      this.featuredForestSliderView = new root.app.View.SliderView({
        el: '#featuredForestSliderView'
      });
      this.tutorialsSliderView = new root.app.View.SliderView({
        el: '#tutorialsSliderView'
      });
      this.videoModalView = new root.app.View.ModalVideoView();
    },

    galleryPage: function() {
      this.galleryView = new root.app.View.GalleryView({

      })
    },

    tutorialsPage: function() {
      this.staticView = new root.app.View.StaticView({
        options: _.extend(this.router._unserializeParams(),{
          page: 'tutorials'
        })
      });
    },

    developPage: function() {
      this.staticView = new root.app.View.StaticView({
        options: _.extend(this.router._unserializeParams(),{
          page: 'develop',
          pageName: 'Develop your own app'
        })
      });
    },

    // appPage: function(id) {
    //   this.sliderView = new root.app.View.SliderView();
    //   this.asideView = new root.app.View.AsideView({
    //     options: {
    //       model: {
    //         id: id
    //       }
    //     }
    //   });
    // },

    // themePage: function(id) {
    //   this.sliderView = new root.app.View.SliderView();
    //   this.asideView = new root.app.View.AsideView({
    //     options: {
    //       model: {
    //         id: id
    //       }
    //     }
    //   });
    // },

    // postPage: function() {
    //   this.toggleView = new root.app.View.ToggleView();
    //   this.asideView = new root.app.View.AsideView({ options: { model: { id: null }}});
    // },

    setGlobalViews: function() {

      var fragment = (!!Backbone.history.fragment) ? Backbone.history.fragment.replace(/\//g,'') : null;
      this.menuView = new root.app.View.MenuView({
        options: {
          page: fragment
        }
      });
    }

  });

  new app.AppView().start();

})(this);
