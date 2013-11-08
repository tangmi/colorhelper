var colorhelper = require('../lib/colorhelper');

exports.getColor = function(req, res) {
	var input = req.param('input');
	var color = colorhelper(input);
	var brightness = getPerceivedBrightness(color);

	var text;
	if (color == "5a8dd3") {
		text = 'ffffff';
	} else {
		text = textColor(brightness);
	}

	res.json({
		"text": input,
		"color": "#" + color,
		"textcolor": "#" + text,
		"perceivedbrightness": brightness
	});
};

function textColor(brightness) {
	if (brightness > 0.51) {
		return "000000";
	} else {
		return "ffffff";
	}
};

function getPerceivedBrightness(color) {
	r = parseInt(color.substring(0, 2), 16);
	g = parseInt(color.substring(2, 4), 16);
	b = parseInt(color.substring(4, 6), 16);
	shade = Math.sqrt((0.299 * r * r) + (0.587 * g * g) + (0.114 * b * b));
	return shade / 255;
};