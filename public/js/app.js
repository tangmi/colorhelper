$(document).ready(function() {
	animateTime = 500; //total length of animation
	prevMax = 4; //max number of history
	helpText = new Array;
	helpText[0] = "Type something and hit enter!";
	helpText[1] = "Every phrase has a unique color.";
	helpText[2] = "It loosely imitates synesthesia.";
	helpText[3] = "Have fun!";
	help = 0; //index of which helpText message to display
	prevCounter = 0;

	processText("Color Helper");
});

$("form").submit(function(event) {
	event.preventDefault();
	var text = $("#text").val();
	if (text == "") {
		//		location.reload();
	} else {
		processText(text);
	}

	// if (fileExists(window.location + text + ".jpg")) {
	// 	$("#overlay").css("background-image", "url(" + text + ".jpg)");
	// 	$("#helpP").css("text-shadow", "2px 2px 5px black");
	// 	$("#helpP").css("color", "white");
	// } else {
	// 	$("#overlay").css("background-image", "url(back.png)");
	// 	$("#helpP").css("text-shadow", "none");
	// 	$("#helpP").css("color", "inherit");
	// }
});

// function fileExists(url) {
//  var http = new XMLHttpRequest();
//  http.open('HEAD', url, false);
//  http.send();
//  return http.status != 404; //file exists
// }

function processText(text) {
	var map = new Object();
	disableTextBox();
	$.ajax({
		url: 'color/' + encodeURIComponent(text),
		dataType: 'json',
		success: function(data) {
			$.each(data, function(key, val) {
				map[key] = val;
			});
			updatePageWithObject(map);
		}
	})
	return map;
}

function updatePageWithObject(map) {
	$("#prev").append('<div class="color" style="top: 50px; background-color: ' + map["color"] + '; color: ' + map["textcolor"] + ' !important;" title="' + map["color"] + '">' + map["text"] + '</div>');

	$(".color:last").animate({ //push new one up
		top: 0
	}, animateTime / 2, false);
	prevCounter++;
	if (prevCounter > prevMax) {
		$(".color:first").animate({ //pull old one down
			top: 50
		}, animateTime / 2, false, function() {
			var width = $(".color:first").width() + (2 * 14) + 20; //width + padding + margin
			$("#prev").animate({ //move list over
				left: -width
			}, animateTime / 2, false, function() {
				$("#prev").css({ //reset list before removing old element
					"left": 0
				});
				$(".color:first").remove(); //remove old element
			});
		});

		prevCounter = prevMax;
	}

	$("body").css({
		"color": map["textcolor"]
	});
	$("body").animate({
		backgroundColor: map["color"],
	}, animateTime);
	$('#displayText').animate({
		opacity: 0,
		top: 50
	}, animateTime / 2, false, function() {
		$("#displayText").text(map["text"]);
		$('#displayText').animate({
			opacity: 1,
			top: 0
		}, animateTime / 2);
		enableTextBox(); //reenable the text box
	});

	if (help < helpText.length) {
		$("#helpP").text(helpText[help]);
		help++;
	} else {
		$("#helpP").text("");
	}
}

function disableTextBox() {
	$("#text").attr("disabled", "disabled");
	$("#load").css("display", "block");
}

function enableTextBox() {
	$("#text").removeAttr("disabled");
	$("#load").css("display", "none");
	$("#text").focus();
	$("#text").val("");
}