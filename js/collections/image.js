(function(){

	define([
		'ns',
		'backbone',
		'models/image'
	], function (namespace, Backbone) {

		"use strict";

		namespace('Carousel.Image.Collection');
		return Carousel.Image.Collection = Backbone.Collection.extend({
			
			model: Carousel.Image.Model,

			currentIndex: 0,

			lim: 0,

			url: function () {
				return app._resources+'/get-images.php';
			},

			initialize: function () {
				this.on('reset', this.setParams, this);
				Carousel.EventBus.on('set-index', this.setCurrentIndex, this);
				Carousel.EventBus.on('move', this.shift, this);
			},

			setParams: function () {
				this.lim = this.length;
			},

			setCurrentIndex: function (index) {
				this.currentIndex = index;
				this.controlCurrentIndex();
				this.dispatchResults();
			},

			controlCurrentIndex: function () {
				if(this.currentIndex <= 0) {
					this.currentIndex = 0;
				}
				else if(this.currentIndex >= this.lim) {
					this.currentIndex = this.lim-1;
				}
			},

			shift: function (dir) {
				var num, route;
				num = dir+this.currentIndex;
				route = '/'+num.toString();
				if(num >= 0 && num <= this.lim-1) {
					Backbone.history.navigate(route, {
						trigger: true
					});
				}
			},

			dispatchResults: function () {
				var model;
				model = this.at(this.currentIndex);
				//console.log(model);
				Carousel.EventBus.trigger('image-ready', model.cid);
			}

		});

	});

}).call(this);