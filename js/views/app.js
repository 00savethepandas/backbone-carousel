(function(){

	define([
		'ns',
		'backbone',
		'jquery',
		'underscore',
		'animate',
		'views/image'
	], function (namespace, Backbone, $, _) {

		"use strict";

		namespace('Carousel.App.View');
		Carousel.App.View = Backbone.View.extend({

			el: '#carousel-viewport',

			placed: false,

			events: {
				'click #carousel-left': 'goBack',
				'click #carousel-right': 'goForward'
			},

			width: 0,

			initialize: function () {
				_.bindAll(this);
				Carousel.EventBus.on('carousel-move', this.move, this);
				this.carousel = this.$('#carousel-wrapper');
				this.model.images.on('add', this.addOne, this);
				this.model.images.on('reset', this.addAll, this);
				this.model.images.fetch();
				this.window = $(window);
				$('body').on('keydown', this.checkKeys);
			},

			checkKeys: function (e) {
				switch(e.keyCode) {
					case 37: return this.goBack.call(this, e);
					case 39: return this.goForward.call(this, e);
				}
			},

			addOne: function (model) {
				var view;
				view = new Carousel.Image.View({
					model: model
				});
				this.width += model.get('width') + 2;
				this.carousel.append(view.render().$el);
			},

			addAll: function (collection) {
				this.width = 0;
				this.carousel.html('');
				collection.each(this.addOne);
				this.carousel.css('width', this.width);
			},

			goBack: function (e) {
				Carousel.EventBus.trigger('move', -1);
				e.preventDefault();
			},

			goForward: function (e) {
				Carousel.EventBus.trigger('move', 1);
				e.preventDefault();
			},

			move: function (dx) {
				var action;
				if(this.placed === false) {
					this.placed = true;
					action = 'css';
				}
				else {
					action = 'animate';
				}
				this.carousel[action]({
					marginLeft: -dx
				}, 175, 'ease-in');
			}

		});

	});

}).call(this);