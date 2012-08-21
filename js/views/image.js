(function(){

	define([
		'ns',
		'backbone',
		'jquery',
		'handlebars',
		'text!templates/image.html',
		'animate'
	], function (namespace, Backbone, $, Handlebars, Template) {

		"use strict";

		namespace('Carousel.Image.View');
		return Carousel.Image.View = Backbone.View.extend({

			tagName: 'li',

			tpl: Handlebars.compile(Template),

			initialize: function () {
				this.setState(null, false, null);
				this.model.on('change:active', this.setState, this);
			},

			render: function () {
				var ctx, html;
				ctx = this.model.toJSON();
				html = this.tpl(ctx);
				this.$el.html(html);
				return this;
			},

			setState: function (model, status, changes) {
				var dx;
				this.$el.animate({
					opacity: status === true ? 1 : 0.1
				}, 150, 'ease-in');
				if(status === true) {
					dx = this.$el.offset().left - this.$el.parent().offset().left;
					Carousel.EventBus.trigger('carousel-move', dx);
				}
			}

		});

	});

}).call(this);