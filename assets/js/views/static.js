(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};
  root.app.Model = root.app.Model || {};

  // View for display results
  root.app.View.StaticView = Backbone.View.extend({

    el: '#staticView',

    events: {
      'click .m-static-title' : 'clickToggleContent',
      'click .js-static-tab' : 'clickToggleAside',
      'click .js-static-page' : 'clickGoToTop',
      'click .js-static-content-close' : 'clickCloseCount'
    },

    model: new (Backbone.Model.extend({
      defaults: {
        tab: null,
        tag: null
      }
    })),

    collection: new (Backbone.Collection.extend({
      parse: function(response) {
        return _.map(response, function(r){
          r.tags = this.slugify(r.tags);
          return r;
        }.bind(this))
      },

      getTabs: function() {
        this.collection = _.pluck(_.sortBy(_.uniq(this.toJSON(),function(c) {
          return c.tags_order && c.tags
        }),'tags_order'), 'tags');

        return this.collection;
      },

      getTags: function(tag) {
        return _.sortBy(_.where(this.toJSON(), {'tags': tag}), 'order');
      },

      slugify: function(text) {
        return text.toString().toLowerCase().trim()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/&/g, '-and-')         // Replace & with 'and'
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-');        // Replace multiple - with single -
      },

    })),

    template: HandlebarsTemplates['static'],

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);

      enquire.register("screen and (min-width: 850px)", {
        match: function(){
          this.mobile = false;
        }.bind(this)
      });
      enquire.register("screen and (max-width: 850px)", {
        match: function(){
          this.mobile = true;
        }.bind(this)
      });

      
      this.collection.fetch({
        url: baseurl + '/json/'+this.options.page+'.json'
      }).done(function() {
        this.setListeners();
        this.render();
        this.model.set(this.options);
      }.bind(this));
    },

    setListeners: function() {
      this.model.on('change:tab', this.render.bind(this));
      this.model.on('change:tag', this.toggleContent.bind(this));

      this.model.on('change:tab change:tag', this.updateRouter.bind(this));

      if (!this.mobile) {
        $(document).on('scroll',_.bind(this.scrollDocument,this)); 
      }
    },

    cache: function() {
      this.$window = $(window);
      this.$document = $(document);

      this.$content = this.$el.find('.js-static-content');
      this.$aside = this.$el.find('.js-static-aside'); 

      this.$tabs = this.$el.find('.js-static-tab');
      this.$tags = this.$el.find('.js-static-tag');
    },

    render: function() {
      this.$el.html(this.template({
        tabs: this.collection.getTabs(),
        tags: this.collection.getTags(this.model.get('tab') || this.collection.getTabs()[0]),
        tab: this.model.get('tab') || this.collection.getTabs()[0],
        pageName: this.options.pageName,
        uniq: (this.collection.getTags(this.model.get('tab')).length == 1) ? true : false
      }));

      this.afterRender();
    },

    afterRender: function() {
      this.cache();
      this.toggleContent();
    },

    // Aside
    clickToggleAside: function(e) {
      var new_tab = $(e.currentTarget).data('tab');
      this.model.set('tag', null, { silent:true });
      this.model.set('tab', new_tab);
    },

    clickGoToTop: function(e) {
      e && e.preventDefault();
      $('html,body').animate({
        scrollTop: 0
      }, 250);
    },

    // Content
    clickToggleContent: function(e) {
      var tag = this.model.get('tag');
      var new_tag = $(e.currentTarget).data('tag');
      this.model.set('tag', (new_tag != tag) ? new_tag : null)
    },

    clickCloseCount: function(e) {
      e && e.preventDefault();
      this.model.set('tag', null);
      this.model.set('tab', null);            
    },

    toggleContent: function() {
      var tab = (!this.mobile) ? this.model.get('tab') || this.collection.getTabs()[0] : this.model.get('tab') || null,
          tag = this.model.get('tag'),
          tabEl = _.find(this.$tabs, function(e){
            return (tab == $(e).data('tab'))
          }),
          tagEl = _.find(this.$tags, function(e){
            return (tag == $(e).data('tag'))
          });

      this.$tabs.removeClass('-selected');
      $(tabEl).addClass('-selected');

      this.$tags.removeClass('-selected');
      $(tagEl).addClass('-selected');

      // To prevent a little blink issue with the aside box
      this.scrollDocument();

      // Mobile behaviour
      if (!!this.model.get('tab')) {
        this.$content.addClass('-active');
        (this.mobile) ? $('html,body').addClass('-no-scroll-allowed') : null;
      } else {
        (this.mobile) ? $('html,body').removeClass('-no-scroll-allowed') : null;
      }
    },

    updateRouter: function() {
      var params = {
        tab: (!this.mobile) ? this.model.get('tab') || this.collection.getTabs()[0] : this.model.get('tab') || null,
        tag: this.model.get('tag')
      }
      Backbone.Events.trigger('route/update', params);
    },

    // Scroll
    setOffsets: function() {
      var top = this.$content.offset().top;
      this.model.set('offset', top);
      this.model.set('offsetBottom', top + this.$content.innerHeight() - this.$aside.innerHeight());
    },

    scrollDocument: function(e){
      this.setOffsets();
      var scrollTop = this.$document.scrollTop();
      if (scrollTop > this.model.get('offset')) {
        this.$aside.addClass('-fixed');
        if(scrollTop < this.model.get('offsetBottom')) {
          this.$aside.removeClass('-bottom').addClass('-fixed');
        }else{
          this.$aside.removeClass('-fixed').addClass('-bottom');
        }
      }else{
        this.$aside.removeClass('-fixed -bottom');
      }
    },



  });

})(this);
