/**
 * @file Returns a slugified string
 * @version 1.0.0
 * @author {@link http://github.com/furzeface Daniel Furze}
 */

Handlebars.registerHelper('slugify', function (component, options) {
  /**
  * Return a slug for a DOM id or class.
  * @function slugify
  * @memberof Handlebars.helpers
  * @param {string} component - string to slugify.
  * @example
  * // returns stuff-in-the-title-lots-more
  * Handlebars.helpers.slugify('Stuff in the TiTlE & Lots More');
  * @returns {string} slug
  */
  var slug = component.replace(/[^\w\s]+/gi, '').replace(/ +/gi, '-');

  return slug.toLowerCase();

});

Handlebars.registerHelper('deslugify', function (component, options) {
  if (!!component) {
    var slug = component.replace(/-/g, " ");;
    return slug.toLowerCase();    
  }
  return component;

});

(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};
  root.app.Model = root.app.Model || {};

  // View for display results
  root.app.View.AsideView = Backbone.View.extend({

    el: '#asideView',

    events: {
      'click .toggle-themes' : 'toggleThemes'
    },

    submenuTemplate: HandlebarsTemplates['aside-submenu'],

    model: new (Backbone.Model.extend({
      defaults: {
        collapsed: true
      }
    })),

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.setListeners();
      this.cache();

      // inits
      this.toggleThemes();
      this.highlight();
    },

    cache: function() {
      // html vars
      this.$asideThemeView = $('#asideThemeView');
      this.$contentThemeNames = $('#contentThemeView > li');

      // model vars
      this.model.set(this.options.model);
      this.model.set('themes',this.$asideThemeView.find('li'));
    },

    setListeners: function() {
      this.model.on('change:id', this.getData.bind(this));
    },

    // Themes behaviour
    toggleThemes: function() {
      if (! !!this.model.get('id')) {
        if (this.model.get('collapsed')) {
          var arr = _.union(
            _.first(this.model.get('themes'), 4),
            [$('<li>').addClass('toggle-themes').html('. . .')]
          );
          this.renderThemes(arr);
        } else {
          var arr = this.model.get('themes');
          this.renderThemes(arr);
        }
        this.model.set('collapsed', !this.model.get('collapsed'));
      }
    },

    renderThemes: function(arr) {
      this.$asideThemeView.html(this.parseThemes(arr));
    },

    parseThemes: function(arr) {
      return _.reduce(arr, function(memo, item){
        return memo + $(item)[0].outerHTML;
      }, '');
    },

    highlight: function() {
      if (!!this.model.get('id')) {
        var $el = this.$el.find('#aside-'+this.model.get('id'));
        $el.addClass('-active');
        if ($el.hasClass('-theme')) {
          $el.parent().append(this.submenuTemplate({ submenu: this.model.get('submenu') }));
        }
      }
    },

    getData: function() {
      var submenu =  _.compact(_.map(this.$contentThemeNames, function(el) {
        if ($(el).hasClass('-active')) {
          return {
            title: $(el).data('title'),
            id: $(el).data('id')
          }
        }
      }));
      this.model.set('submenu', submenu);
    },

  });

})(this);

(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};
  root.app.Model = root.app.Model || {};

  // View for display results
  root.app.View.BlogView = Backbone.View.extend({

    el: '#blogView',

    template: HandlebarsTemplates['blog'],

    model: new (Backbone.Model.extend({
      url: 'https://gfw-huggin.herokuapp.com/users/1/web_requests/21/blogrss.json',
    })),

    events: {

    },

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.options.sample = ($(window).width() < 850) ? 1 : 2;


      this.cache();

      this.model.fetch().success(function(data){
        this.render();
      }.bind(this));
    },

    cache: function() {
    },

    render: function() {
      this.$el.html(this.template({ blogposts: this.parse() }))
    },

    parse: function() {
      var groups = _.groupBy(_.map(this.model.get('items'), function(item){
        item.categories = (!!item.categories) ? this.slugify(item.categories) : 'default';
        return item;
      }.bind(this)), 'categories');

      var items = _.map(_.sample(groups,this.options.sample), function(group){
        return _.sample(group);
      });

      return items;
    },

    slugify: function(text) {
      return text.toString().toLowerCase().trim()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/&/g, '-and-')         // Replace & with 'and'
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-');        // Replace multiple - with single -
    },

  });

})(this);

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
(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};
  root.app.Model = root.app.Model || {};

  root.app.Model.ModalModel = Backbone.Model.extend({
    defaults: {
      hidden: true,
    }
  });



  // View for display results
  root.app.View.ModalView = Backbone.View.extend({

    events: {
      'click .modal-backdrop' : 'hide',
      'click .modal-close' : 'hide'
    },

    initialize: function() {
      // Model
      this.model = new root.app.Model.ModalModel();

      // Init
      this.model.on("change:hidden", this._toggle, this);
    },

    _initVars: function() {
      this.$window = $(window);
      this.$document = $(document);
      this.$body = $('body');
      this.$htmlbody = $('html, body');

      this.$content =        this.$el.find('.modal-content');
      this.$contentWrapper = this.$el.find('.modal-wrapper');
      this.$backdrop =       this.$el.find('.modal-backdrop');
      this.$close =          this.$el.find('.modal-close');

      this.mobile = (this.$window.width() > 850) ? false : true;
    },

    _initBindings: function() {
      // document keyup
      this.$document.on('keyup', _.bind(function(e) {
        if (e.keyCode === 27) {
          this.hide();
        }
      },this));
      // backdrop
      this.$backdrop.on('click', _.bind(function() {
        this.hide();
      },this));
    },

    _stopBindings: function() {
      this.$document.off('keyup');
      this.$backdrop.off('click');
    },

    _toggle: function() {
      (!!this.model.get('hidden')) ? this._stopBindings() : this._initBindings();
      this.$el.toggleClass('-active', !this.model.get('hidden'));
      //Prevent scroll beyond modal window.
      this.$htmlbody.toggleClass('-no-scroll-allowed', !this.model.get('hidden'));
    },

    hide: function(e) {
      e && e.preventDefault();
      this.model.set('hidden', true);

      //Give back scroll beyond modal window.
      this.$htmlbody.removeClass('-no-scroll-allowed');

      return this;
    },

    show: function(e) {
      e && e.preventDefault() && e.stopPropagation();
      this.model.set('hidden', false);
    },

  });

})(this);
(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};

  // View for display results
  root.app.View.ModalVideoView = root.app.View.ModalView.extend({

    id: '#modalVideo',

    className: "m-modal",

    template: HandlebarsTemplates['modal-video'],

    initialize: function() {
      // Inits
      this.constructor.__super__.initialize.apply(this);
      this.render();
      this._initVars();
      this._youtubeApi();
      this.setListeners();
      
      this.$body.append(this.el);
    },

    setListeners: function() {
      this.$body.on('click', '.js-card-video', _.bind(this.videoClick, this ));
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    // YOUTUBE api
    _youtubeApi: function(){
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = function(){
        this._loadPlayer();
      }.bind(this)
    },

    _loadPlayer: function(id) {
      this.player = new YT.Player('modal-video', {
        videoId: id,
        width: 356,
        height: 200,
        playerVars: {
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          showInfo: 0
        }
      });
    },

    // Fetch video when user clicks a video
    videoClick: function(e) {
      e && e.preventDefault() && e.stopPropagation();
      // Load current video
      var id = $(e.currentTarget).data('video');
      this.player.loadVideoById(id);

      this.show();
    },

    // Overrides hide function
    hide: function(e) {
      e && e.preventDefault();
      this.model.set('hidden', true);

      this.player.stopVideo();

      //Give back scroll beyond modal window.
      this.$htmlbody.removeClass('-no-scroll-allowed');

      return this;
    },



  });

})(this); 
(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};
  root.app.Collection = root.app.Collection || {};

  // Model for getting the data
  root.app.Collection.SearchCollection = Backbone.Collection.extend({
    url: baseurl + '/json/search.json'
  });

  // View for display results
  root.app.View.SearchView = Backbone.View.extend({

    el: '#searchView',

    events: {
      'keyup #search-input' : 'search',
      'click #search-close' : 'removeResults'
    },

    resultsTemplate: HandlebarsTemplates['search'],

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.collection = new root.app.Collection.SearchCollection();

      this.collection.fetch().done(function(){
        this.cache();
        this.initFuse();
      }.bind(this));
    },

    cache: function() {
      this.searchIndex = 0;
      this.$searchInput = this.$el.find('#search-input');
      this.$searchClose = this.$el.find('#search-close');
      this.$searchResults = this.$el.find('#search-results');

    },

    initFuse: function() {
      var json = this.collection.toJSON();
      this.fuse = new Fuse(json, {
        caseSensitive: false,
        includeScore: false,
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        keys: ['title','content','category','tags']
      });
    },

    search: function(e) {
      var val = $(e.currentTarget).val();
      switch(e.keyCode) {
        case 13:
          this.selectResult();
        break;
        case 27:
          this.removeResults();
        break;
        case 38:
          this.indexResults('up');
        break;
        case 40:
          this.indexResults('down');
        break;
        default:
          (!!val) ? this.setResults(val) : this.removeResults();
          this.highlightResults();
      }
    },

    indexResults: function(direction) {
      if (!!this.results.length) {
        switch(direction) {
          case 'up':
            (this.searchIndex != 0) ? this.searchIndex-- : this.searchIndex = 0;
          break;
          case 'down':
            (this.searchIndex < this.results.length - 1) ? this.searchIndex++ : this.searchIndex = this.results.length - 1;
          break;
        }
      }
      this.highlightResults();
    },

    highlightResults: function() {
      this.$searchResults.children('li').removeClass('-highlight');
      this.$searchResults.children('li').eq(this.searchIndex).addClass('-highlight');
    },

    selectResult: function() {
      var href = this.$searchResults.children('li').eq(this.searchIndex).children('a').attr('href');
      window.location = href;
    },

    setResults: function(val) {
      this.results = this.fuse.search(val).slice(0, 5);
      this.$searchResults.addClass('-active').html(this.resultsTemplate({ results: (!!this.results.length) ? this.results : null }));
      // svg addClass
      this.$searchClose.addClass('-active');
    },

    removeResults: function() {
      this.searchIndex = 0;
      this.results = this.fuse.search('');
      this.$searchInput.val('');
      this.$searchResults.removeClass('-active').html(this.resultsTemplate({ results: []}));
      // svg removeClass
      this.$searchClose.removeClass('-active');
    }

  });

})(this);

(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};

  root.app.View.SliderView = Backbone.View.extend({

    events: {
      'click .js_slide_navigation li' : 'clickNavigation'
    }, 

    navTemplate: HandlebarsTemplates['slider'],

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);

      if(! !!this.el) {
        return;
      }

      enquire.register("screen and (min-width: 850px)", {
        match: function(){
          this.mobile = false;
          this.initSlider();
        }.bind(this)
      });
      enquire.register("screen and (max-width: 850px)", {
        match: function(){
          this.mobile = true;
          this.initSlider();
        }.bind(this)
      });
    },

    initSlider: function() {
      this.options.slider = this.setOptions();
      this.initNavigation();
      this.initLory();
    },

    cache: function() {
      this.$slider = this.$el.find('.js_slider');
      this.$sliderItems = this.$el.find('.js_slide');
      this.slideCount = this.$el.find('.js_slide').length;

      this.$sliderNavigation = this.$el.find('.js_slide_navigation');
    },

    // Slider plugin
    initLory: function() {
      // init slider
      if (!!this.slider) {
        this.slider.reset();
        this.slider.destroy();
      }

      // set width of each element
      this.$slider[0].addEventListener('before.lory.init', this.setSlideWidth.bind(this));
      this.$slider[0].addEventListener('on.lory.resize', this.setSlideWidth.bind(this));

      this.slider = lory(this.$slider[0], this.options.slider);
    },

    setOptions: function() {
      this.cache();
      return {
        slidesToScroll: (!!this.mobile) ? 1 : 3,
        infinite: (!!this.mobile) ? 1 : 3,
        slides_per_slide: (!!this.mobile) ? 1 : 3
      }
    },

    setSlideWidth: function() {
      var width = this.$slider.width()/this.options.slider.slides_per_slide;
      this.$sliderItems.width(width);
    },

    initNavigation: function() {
      var pages = Math.ceil(this.slideCount/this.options.slider.slides_per_slide);
      var arrayPages =(function(a,b){while(a--)b[a]=a+1;return b})(pages,[]);

      this.$sliderNavigation.html(this.navTemplate({pages: null}));
      this.$sliderNavigationItems = this.$sliderNavigation.find('li');
    },

    // Events
    clickNavigation: function(e) {
      e && e.preventDefault();
      var index = $(e.currentTarget).data('index');
      var direction = $(e.currentTarget).data('direction');
      if (index != undefined) {
        this.slider.slideTo(index*this.options.slider.slides_per_slide)
      } else {
        switch (direction) {
          case 'left':
            this.slider.prev();
          break;
          case 'right':
            this.slider.next();
          break;
        }
      }
    },

  });

})(this);

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

      $(document).on('scroll',_.bind(this.scrollDocument,this)); 
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
        tab: this.model.get('tab') || this.collection.getTabs()[0]
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

    // Content
    clickToggleContent: function(e) {
      var tag = this.model.get('tag');
      var new_tag = $(e.currentTarget).data('tag');
      this.model.set('tag', (new_tag != tag) ? new_tag : null)
    },

    toggleContent: function() {
      var tab = this.model.get('tab') || this.collection.getTabs()[0],
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
    },

    updateRouter: function() {
      var params = {
        tab: this.model.get('tab') || this.collection.getTabs()[0],
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

(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};
  root.app.Model = root.app.Model || {};

  // View for display results
  root.app.View.ToggleView = Backbone.View.extend({

    el: '#toggleView',

    model: new (Backbone.Model.extend({
      defaults: {
        toggle: 'desktop'
      }
    })),

    events: {
      'click .choice' : 'toggle'
    },

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);

      this.cache();
      this.listeners();
      this.changeToggle();
    },

    cache: function() {
      this.$desktopContent = $('#desktopContent');
      this.$mobileContent = $('#mobileContent');

      this.$buttons = this.$el.find('.choice');
      this.$skitter = this.$el.find('.skitter');
    },

    listeners: function() {
      this.model.on('change:toggle', this.changeToggle.bind(this));
    },

    toggle: function(e) {
      e && e.preventDefault();

      this.$buttons.removeClass('-active');
      $(e.currentTarget).addClass('-active');

      this.model.set('toggle',$(e.currentTarget).data('toggle'));
    },

    changeToggle: function() {
      var toggle = this.model.get('toggle');
      switch(toggle) {
        case 'desktop':
          this.$desktopContent.show(0);
          this.$mobileContent.hide(0);
          this.$skitter.css({ left: '0%' });
        break;
        case 'mobile':
          this.$desktopContent.hide(0);
          this.$mobileContent.show(0);
          this.$skitter.css({ left: '50%' });
        break;
      }
    }

  });

})(this);

(function(root) {

  'use strict';

  root.app = root.app || {};

  root.app.Router = Backbone.Router.extend({

    routes: {
      // HOME
      '': 'home',
      // MAP BUILDER      
      'map-builder(/)': 'map-builder',
      'map-builder(/)gallery(/)': 'gallery',
      // DEVELOP YOUR OWN APP
      'develop-your-own-app(/)': 'develop',
      // // APP
      // 'apps/:id(/)': 'category',
      // //THEME
      // 'themes/:id(/)': 'tag',
      // // POST
      // 'gfw/:id' : 'post',
      // 'climate/:id' : 'post',
      // 'fires/:id' : 'post',
      // 'commodities/:id' : 'post',

    },

    ParamsModel: Backbone.Model.extend({}),

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);

      this.params = new this.ParamsModel(); // This object save the URL params
      this.setListeners();
    },

    setListeners: function() {
      Backbone.Events.on('route/update', function(params) {
        _.each(params,function(v,k){
          this.setParams(k,v);
        }.bind(this));
        this.updateUrl();
      }.bind(this));
    },

    /**
     * Set params and update model
     * @param {String} name
     * @param {String|Object|Array} value
     * @param {Array[String]} keys
     */
    setParams: function(name, value, keys) {
      if (typeof value === 'string' || typeof value === 'number') {
        this.params.set(name, value);
      } else if (typeof value === 'object' && !_.isArray(value)) {
        if (keys && _.isArray(keys)) {
          // var params = _.pick(value, 'id', 'opacity', 'order');
          // this.params.set(name, JSON.stringify(params));
        } else {
          this.params.set(name, JSON.stringify(value));
        }
      } else if (typeof value === 'object' && _.isArray(value)) {
        if (keys && _.isArray(keys)) {
          var params = _.map(value, function(v) {
            return _.pick(v, keys);
          });
          this.params.set(name, JSON.stringify(params));
        } else {
          this.params.set(name, JSON.stringify(value));
        }
      }
    },

    /**
     * Change url with params
     */
    updateUrl: function() {
      var url = location.pathname.slice(1) + '?' + this._serializeParams();
      this.navigate(url, { trigger: false });
    },

    /**
     * This method will update this.params object when URL change
     * @param  {String} routeName
     * @param  {Array} params
     */
    updateParams: function(params, routeName) {
      if (this.options.decoded && params[0]) {
        try {
          params = this._decodeParams(params[0]);
        } catch(err) {
          console.error('Invalid params. ' + err);
          params = null;
          return this.navigate('');
        }
        this.params.clear({ silent: true }).set({ config: params });
      } else {
        var p = this._unserializeParams();
        this.params.clear({ silent: true }).set(this._unserializeParams());
      }
    },

    /**
     * Transform URL string params to object
     * @return {Object}
     */
    _unserializeParams: function() {
      var params = {};
      if (location.search.length) {
        var paramsArr = decodeURIComponent(location.search.slice(1)).split('&'),
          temp = [];
        for (var p = paramsArr.length; p--;) {
          temp = paramsArr[p].split('=');
          if (temp[1] && !_.isNaN(Number(temp[1]))) {
            params[temp[0]] = Number(temp[1]);
          } else if (temp[1]) {
            params[temp[0]] = temp[1];
          }
        }
      }
      return params;
    },

    /**
     * Transform object params to URL string
     * @return {String}
     */
    _serializeParams: function() {
      return this.params ? $.param(this.params.attributes) : null;
    }

  });

})(this);

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
      // this.setGlobalViews();
      this.setListeners();
    },

    setListeners: function() {
      this.listenTo(this.router, 'route:home', this.homePage);
      this.listenTo(this.router, 'route:map-builder', this.mapBuilderPage);
      this.listenTo(this.router, 'route:gallery', this.galleryPage);
      this.listenTo(this.router, 'route:develop', this.developPage);
      
      // this.listenTo(this.router, 'route:category', this.appPage);
      // this.listenTo(this.router, 'route:tag', this.themePage);
      // this.listenTo(this.router, 'route:post', this.postPage);
    },

    start: function() {
      Backbone.history.start({
        pushState: true,
        root: (!!baseurl) ? baseurl : "/"
      });
    },

    homePage: function() {
      this.featuredForestSliderView = new root.app.View.SliderView({
        el: '#featuredForestSliderView'
      });
      this.asideView = new root.app.View.AsideView({ options: { model: { id: null }}});
    },

    mapBuilderPage: function() {
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
          page: 'develop'
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

    // setGlobalViews: function() {
    //   this.blogView = new root.app.View.BlogView();
    //   this.searchView = new root.app.View.SearchView();
    // }

  });

  new app.AppView().start();

})(this);
