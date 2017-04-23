var signedUrl = 'https://api.meetup.com/cork-javascript-meetup/events?' +
  'desc=true&photo-host=public&page=20&sig_id=210143296&callback=updateDOM&' +
  'status=past%2Cupcoming&sig=4a36a805aac0c8de4199cb3008a95f9fa292ca9b';
var months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept',
  'Oct', 'Nov', 'Dec'
];
var days = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

var getMeetups = function(url) {
  var head = document.head;
  var script = document.createElement('script');

  script.setAttribute('src', url);
  head.appendChild(script);
  head.removeChild(script);
}

var updateDOM = function(responseJSON) {
  var events = responseJSON.data;

  // Checks if no meetups were returned
  if (!(events && events.length > 0)) {
    console.log('ERROR: No meetups returned from request.');
    return;
  };

  var latestEvent = events[0];

  // Replace banner text
  if (latestEvent.status == 'past') {
    document.getElementById('latest-status').innerHTML = 'Previous';
  } else {
    document.getElementById('latest-status').innerHTML = 'Upcoming';
  }
  
  // Replace title, description
  document.getElementById('latest-title').innerHTML = latestEvent.name;
  document.getElementById('latest-desc').innerHTML = latestEvent.description;
  
  // Replace date text
  var date = new Date(latestEvent.time);
  document.getElementById('latest-date').innerHTML =
    (
      days[date.getDay() -1] + ' ' + date.getDate() + ' ' +
      months[date.getMonth()] + ', ' + date.getFullYear() + ' - ' +
      date.getHours() + ':' + date.getMinutes()
    );

  // Add link to title
  var link = latestEvent.link;
  document.getElementById('latest-link').href = link;

  // Replace location data
  var location = latestEvent.venue;
  document.getElementById('latest-location').innerHTML =
    (
      location.name + '<br>' + location.address_1 +
      ' - [ <a href="http://maps.google.com/?q=' + location.name +
      '" target="_blank">Directions</a> ]'
    );

  // Add embed map
  var map = document.getElementById('map');
  map.src = 'https://www.google.com/maps/embed/v1/place?' +
    'key=AIzaSyC9JxGGhS0Xr1429ae62E3MEfk227kqDIA&q=' +
    location.name + ', Cork, Ireland' + '&zoom=17';

  // Add attendance count
  if (latestEvent.status == 'past') {
    document.getElementById("rsvp-count").innerHTML = 'Attended: ' +
      latestEvent.yes_rsvp_count;
  } else {
    document.getElementById("rsvp-count").innerHTML = 'Attending: ' +
      latestEvent.yes_rsvp_count;
  }
}

getMeetups(signedUrl);
