(function(){

	define([
		'backbone',
		'ns'
	], function (Backbone, namespace) {

		"use strict";

		namespace('Carousel.Image.Model');
		return Carousel.Image.Model = Backbone.Model.extend({
			
			defaults: {
				title: 'My New Image',
				width: 0,
				height: 0,
				path: null,
				active: false
			},

			initialize: function () {
				if(this.get('path')) {
					this.set('href', app.pathRoot+'/'+this.get('path'));
				}
				else {
					this.set('href', null);
				}

				this.setSize();

				Carousel.EventBus.on('image-ready', this.fetch, this);
			},

			setSize: function () {
				var height, r;
				height = 350;
				r = height/+this.get('height');
				this.set('width', r * +this.get('width'));
				this.set('height');
			},

			fetch: function (cid) {
				if(this.cid === cid) {
					this.set('active', true);
				}
				else {
					this.set('active', false);
				}
			}

		});


	});

}).call(this);