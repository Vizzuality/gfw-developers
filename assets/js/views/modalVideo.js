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
      // this.presenter = new SourceModalPresenter(this);
      this.render();
      this._initVars();
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

    // Fetch model when click
    videoClick: function(e) {
      e && e.preventDefault() && e.stopPropagation();
      this.show();
      console.log('hello');
      // // current
      // this.$current = $(e.currentTarget);
      // this.$current.find('svg').attr('class','spinner start');

      // this.sourceModel = new SourceModel({
      //   slug: this.$current.data('source'),
      // });
      // this.sourceModel.fetch({
      //   update:true,
      //   parse: true,
      //   success: this.sourceSuccess.bind(this),
      //   error: this.sourceError.bind(this),
      // });
    },

  });

})(this);