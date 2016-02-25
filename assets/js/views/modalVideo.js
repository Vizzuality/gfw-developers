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
      this.show();

      // Load current video
      var id = $(e.currentTarget).data('video');
      this.player.loadVideoById(id);
    },

    // Overrides hide function
    hide: function(e) {
      e && e.preventDefault();
      this.model.set('hidden', true);

      this.player.stopVideo();

      //Give back scroll beyond modal window.
      this.$htmlbody.removeClass('-no-scroll');

      return this;
    },



  });

})(this); 