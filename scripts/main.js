var helloCork = function() {
  console.log('Hello Cork');
};

var getUpcomingEventsAsync = function() {
	//Calling another meetup just for test because CorkJS has no upcoming meetups
	var url = "http://api.meetup.com/openstack-cork/events?&sign=true&photo-host=public&page=20&key=/*YOUR_API_KEY*/";
	var request = new XMLHttpRequest();
	request.open( "GET", url, true);
	request.send(null);	
}

helloCork();
var data = getUpcomingEventsAsync();

/*$.ajax({
	type: "GET",
	dataType: "jsonp",
	url: "url"
})*/

var test = function() {
	document.getElementsByClassName("meetup-title").innerHTML = data[0].name();
	console.log("Works");
}