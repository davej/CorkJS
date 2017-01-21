var helloCork = function() {
  	console.log('Hello Cork');
};

var getUpcomingEvents = function() {
	//Calling another meetup just for test because CorkJS has no upcoming meetups
	var signedTestUrl = "https://api.meetup.com/openstack-cork/events?photo-host=public&page=20&sig_id=210143296&omit=group&_=1485037467231&sig=3a5e1b900646da97688cc54f55f67827eafd814d";
	var signedUrl = "https://api.meetup.com/openstack-cork/events?photo-host=public&page=20&sig_id=210143296&sig=d07ac4460173bc86aa05e0c5b65acd79b2b8ae1b";
	
	var call = $.ajax({
		type: "GET",
		dataType: "jsonp",
		url: signedUrl
	});

	console.log(call);

	//When ajax call is complete
	$(document).ajaxStop(function() {
		var events = (call.responseJSON.data);
		console.log(events);

		updateDOM(events);
	});
}

var updateDOM = function(events) {
	if (events.length > 0) {
		$("#latest-title").text( events[0].name);
		$("#latest-desc").text(events[0].description);
	} else {
		$("#latest-title").text("No upcoming events");
	}
}

helloCork();
getUpcomingEvents();
