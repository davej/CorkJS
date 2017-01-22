var helloCork = function() {
  	console.log('Hello Cork');
};

var signedUrl = "https://api.meetup.com/cork-javascript-meetup/events?desc=true&photo-host=public&page=20&sig_id=210143296&status=upcoming%2Cpast&sig=0607ea8f24a049a251ec629255d393a89c8ece7f";
var call;

var getMeetups = function() {
	call = $.ajax({
		type: "GET",
		dataType: "jsonp",
		url: signedUrl,

		success: updateDOM
	});
	//console.log(call);
}

var updateDOM = function(responseJSON) {
	var events = responseJSON.data;
	//console.log(events);

	//Checks if no meetups were returned
	if (events.length != 0) {
		if (events[0].status == "past") {
			document.getElementById("latest-status").innerHTML = "Previous";
		} else {
			document.getElementById("latest-status").innerHTML = "Upcoming";
		}

		document.getElementById("latest-title").innerHTML = events[0].name;
		document.getElementById("latest-desc").innerHTML = events[0].description;
	} else {
		//There's no reason for this to ever happen. Unless group is deleted, should is there any point of this check?
		console.log("ERROR: No meetups returned from request.");   
	}
}

helloCork();
getMeetups();