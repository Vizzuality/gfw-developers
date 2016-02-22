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
      'click .js-static-tab' : 'clickToggleAside'
    },

    model: new (Backbone.Model.extend({
      defaults: {
        tab: 'using-the-interface',
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
    },

    cache: function() {
      this.$tabs = this.$el.find('.js-static-tab');
      this.$tags = this.$el.find('.js-static-tag');
    },

    render: function() {
      this.$el.html(this.template({
        tabs: this.collection.getTabs(),
        tags: this.collection.getTags(this.model.get('tab')),
        tab: this.model.get('tab')
      }));
      this.cache();
      this.toggleContent();
    },

    // Aside
    clickToggleAside: function(e) {
      var new_tab = $(e.currentTarget).data('tab');
      this.model.set('tag', null, { silent:true });
      this.model.set('tab', new_tab);
    },

    // Content
    clickToggleContent: function(e) {
      var tag = this.model.get('tag');
      var new_tag = $(e.currentTarget).data('tag');
      this.model.set('tag', (new_tag != tag) ? new_tag : null)
    },

    toggleContent: function() {
      var tab = this.model.get('tab'),
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
    },

    updateRouter: function() {
      var params = {
        tab: this.model.get('tab'),
        tag: this.model.get('tag')
      }
      Backbone.Events.trigger('route/update', params);
    },

  });

})(this);
