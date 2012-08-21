(function(){

	define([
		'ns',
		'backbone',
		'underscore',
		'collections/image'
	], function (namespace, Backbone, _) {

		"use strict";

		namespace('Carousel.App.Model');
		Carousel.App.Model = Backbone.Model.extend({

			initialize: function () {
				this.images = this.nestCollection(this, 'images', new Carousel.Image.Collection(this.get('images')));
			},

			nestCollection: function (model, attributeName, nestedCollection) {
				model.attributes[attributeName] = [];
				for(var i in nestedCollection.length) {
					model.attributes[attributeName][i] = nestedCollection.at(i).attributes;
				}

				nestedCollection.on('add', function (initiative) {
					if(!model.get(attributeName)) {
						model.attrbutes[attributeName] = [];
					}
					model.get(attributeName).push(initiative.attrbutes);
				});

				nestedCollection.on('remove', function (initiative) {
					var updateObj;
					updateObj[attributeName] = _.without(model.get(attributeName), initiative.attributes);
					model.set(updateObj);
				});

				return nestedCollection;
			}

		});

	});

}).call(this);