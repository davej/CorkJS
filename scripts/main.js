var helloCork = function() {
  	console.log('Hello Cork');
};

var signedUrlUpcoming = "https://api.meetup.com/cork-javascript-meetup/events?photo-host=public&page=20&sig_id=210143296&sig=d07ac4460173bc86aa05e0c5b65acd79b2b8ae1b";
var signedUrlPast = "https://api.meetup.com/cork-javascript-meetup/events?photo-host=public&page=20&sig_id=210143296&status=past&sig=052868f6f4d1f5a525fa6ca28a74e771165ad4ea";

var getUpcomingEvents = function() {
	var call = $.ajax({
		type: "GET",
		dataType: "jsonp",
		url: signedUrlUpcoming
	});
	//console.log(call);
	updateDOM(call, true);
	return call;
}

var getPastEvents = function() {
	var call = $.ajax({
		type: "GET",
		dataType: "jsonp",
		url: signedUrlPast 
	});
	//console.log(call);
	updateDOM(call, false);
}

var updateDOM = function(call, upcoming) {
	//When ajax call is complete
	$(document).ajaxStop(function() {
		var events = (call.responseJSON.data);
		//console.log(events);
		if (events.length != 0) {
			var index = 0;
			if (!upcoming) {
				index = events.length - 1;
				$("#latest-status").text("Previous");
			} else {
				$("#latest-status").text("Upcoming");
			}
			$("#latest-title").text(events[index].name);
			$("#latest-desc").replaceWith(events[index].description);
		}
	});
}

helloCork();
getPastEvents();
getUpcomingEvents();