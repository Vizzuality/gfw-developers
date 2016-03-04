(function(root) {

  'use strict';

  root.app = root.app || {};

  root.app.Router = Backbone.Router.extend({

    routes: {
      // HOME
      '': 'home',
      // MAP BUILDER      
      'map-builder(/)': 'map-builder',
      // GALLERY
      'gallery(/)': 'gallery',
      // DEVELOP YOUR OWN APP
      'develop-your-own-app(/)': 'develop',
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
          if (!!value) {
            this.params.set(name, JSON.stringify(value));
          } else {
            this.params.set(name, value);
          }
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
      var serializedParams = (!!this._serializeParams()) ? '?' + this._serializeParams() : '';
      var url = location.pathname.replace(baseurl,'') + serializedParams;
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
      if (!!this.params) {
        var str = [];
        var obj = this.params.attributes;
        for(var p in obj) {          
          if (obj.hasOwnProperty(p) && !!obj[p]) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
        }
        return str.join("&");
      }
    }

  });

})(this);
