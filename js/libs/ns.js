(function(){

	define([], function () {

		"use strict";

		var namespace;

		return function namespace (ns, splitter) {
			var o, len, lim, i, resp;

			splitter = (splitter || '.');
			ns = ns.split(splitter);
			
			o = window;
			len = ns.length;
			lim = len-1;

			for(i=0; i<len; i++) {
				resp = i === lim ? null : {};
				o = o[ns[i]] = o[ns[i]] || resp;
			}

			return o;
		};

	});

}).call(this);