(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};

  // View for display results
  root.app.View.MenuView = Backbone.View.extend({

    el: '#menuView',

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);

      this.cache();
      this.setSelectedMenu();
    },

    cache: function() {
      this.$links = $('#menuView a');
    },

    setSelectedMenu: function() {
      if (!!this.options.page) {      
        _.each(this.$links, function(link){
          if (~this.options.page.indexOf(link.dataset.page)) {
            $(link).addClass('-selected');
          }
        }.bind(this));
      }
    }

  });

})(this);