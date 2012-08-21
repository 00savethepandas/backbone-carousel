(function(){
	"use strict";

	requirejs.config({
		locale: 'en-us',
		baseUrl: app.js,
		urlArgs: 'xcache='+(new Date()).getTime(),
		paths: {
			'backbone': 'vendors/backbone/backbone',
			'jquery': 'vendors/jquery/jquery',
			'underscore': 'vendors/underscore/underscore',
			'handlebars': 'vendors/handlebars/handlebars',
			'modernizr': 'vendors/modernizr/modernizr',
			'animate': 'vendors/jquery/jquery.animate-enhanced',
			'easing': 'vendors/jquery/jquery.easing',
			'text': 'vendors/requirejs/text',
			'ns': 'libs/ns',
			'templates': '../handlebars'
		},
		shim: {
			'backbone': {
				deps: ['underscore', 'jquery'],
				exports: function () {
					return Backbone.noConflict();
				}
			},
			'jquery': {
				exports: function () {
					return $.noConflict();
				}
			},
			'underscore':{
				exports: function () {
					return _.noConflict();
				}
			},
			'animate': {
				deps: ['jquery', 'easing'],
				exports: '$.fn.animate'
			},
			'easing': {
				deps: ['jquery'],
				exports: '$.fn.animate'
			},
			'handlebars': {
				exports: 'Handlebars'
			}
		}
	});

	require(['ns', 'routers/app'], function (namespace) {

		namespace('Carousel.Application');
		Carousel.Application = new Carousel.App.Router();
		
	});

}).call(this);