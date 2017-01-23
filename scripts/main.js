var helloCork = function() {
  	console.log('Hello Cork');
};

var signedUrl = "https://api.meetup.com/cork-javascript-meetup/events?desc=true&photo-host=public&page=20&sig_id=210143296&callback=updateDOM&status=past%2Cupcoming&sig=4a36a805aac0c8de4199cb3008a95f9fa292ca9b";
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
var days = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

var jsonp = function(url) {
      var head = document.head;
      var script = document.createElement("script");

      script.setAttribute("src", url);
      head.appendChild(script);
      head.removeChild(script);
}

var getMeetups = function() {
	jsonp(signedUrl);
	//console.log(signedUrl);
}

var updateDOM = function(responseJSON) {
	var events = responseJSON.data;
	//console.log(events);

	//Checks if no meetups were returned
	if (events.length != 0) {

		//Replace banner text
		if (events[0].status == "past") {
			document.getElementById("latest-status").innerHTML = "Previous";
		} else {
			document.getElementById("latest-status").innerHTML = "Upcoming";
		}

		//Replace title, description
		document.getElementById("latest-title").innerHTML = events[0].name;
		document.getElementById("latest-desc").innerHTML = events[0].description;

		//Replace date
		var date = new Date(events[0].time);
		document.getElementById("latest-date").innerHTML = (days[date.getDay() -1] + " " + date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear() + " - " 
			+ date.getHours() + ":" + date.getMinutes() );

	} else {
		//There's no reason for this to ever happen. Unless group is deleted, is there any point of this check?
		console.log("ERROR: No meetups returned from request.");   
	}
}

helloCork();
getMeetups();