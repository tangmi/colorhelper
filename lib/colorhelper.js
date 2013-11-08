'use strict';

var chash = require('./chash');
var rules = require('./rules');

module.exports = function(input) {
	var color;
	if (input.toLowerCase() == 'random') {
		color = (Math.random() * 900000 + 100000 + "").substring(0, 6);
	} else {
		color = rules[input] || chash(input);
	}

	return color;
};