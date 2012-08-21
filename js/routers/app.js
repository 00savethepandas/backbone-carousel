(function(){

	define([
		'ns',
		'backbone',
		'underscore',
		'modernizr',
		'views/app',
		'models/app'
	], function (namespace, Backbone, _) {

		"use strict";

		namespace('Carousel.EventBus');
		Carousel.EventBus = _.extend({}, Backbone.Events);

		namespace('Carousel.App.Router');
		return Carousel.App.Router = Backbone.Router.extend({
			
			routes: {
				':index'	:	'setIndex',
				''			:	'setIndex'
			},

			initialize: function () {
				var application;

				application = new Carousel.App.View({
					model: new Carousel.App.Model()
				});

				application.model.images.on('reset', this.startHistory, this);
			},

			setIndex: function (index) {
				index = (parseInt(index, 10) || 0);
				Carousel.EventBus.trigger('set-index', index);
			},

			startHistory: function () {
				var config;
				
				config = Modernizr.history ? {
					pushState: true,
					root: app.pathRoot+'/'
				} : {};

				Backbone.history.start();
			}

		});

	});

}).call(this);