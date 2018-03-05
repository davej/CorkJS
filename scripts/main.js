var signedUrl = 'https://api.meetup.com/cork-javascript-meetup/events?' +
  'desc=true&photo-host=public&page=20&sig_id=210143296&status=past%2C' +
  'upcoming&sig=4a36a805aac0c8de4199cb3008a95f9fa292ca9b&callback=updateDOM';
var months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept',
  'Oct', 'Nov', 'Dec'
];
var days = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

var getMeetups = function (url) {
  var head = document.head;
  var script = document.createElement('script');

  script.setAttribute('src', url);
  head.appendChild(script);
  head.removeChild(script);
};

window.updateDOM = function (responseJSON) {
  var events = responseJSON.data;

  // Checks if no meetups were returned
  if (!(events && events.length > 0)) {
    // eslint-disable-next-line no-console
    console.log('ERROR: No meetups returned from request.');
    return;
  }
  var nextEvent = getNextEvent();

  // Replace banner text
  if (nextEvent.status == 'past') {
    document.getElementById('latest-status').innerHTML = 'Previous';
  } else {
    document.getElementById('latest-status').innerHTML = 'Upcoming';
  }

  // Replace title, description
  document.getElementById('latest-title').innerHTML = nextEvent.name;
  document.getElementById('latest-desc').innerHTML = nextEvent.description;

  // Replace date text
  var date = new Date(nextEvent.time);
  document.getElementById('latest-date').innerHTML =
    (
      days[date.getDay() - 1] + ' ' + date.getDate() + ' ' +
      months[date.getMonth()] + ', ' + date.getFullYear() + ' - ' +
      date.getHours() + ':' + date.getMinutes()
    );

  // Add link to title
  var link = nextEvent.link;
  document.getElementById('latest-link').href = link;

  // Replace location data
  var location = nextEvent.venue;
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
  if (nextEvent.status == 'past') {
    document.getElementById('rsvp-count').innerHTML = 'Attended: ' +
      nextEvent.yes_rsvp_count;
  } else {
    document.getElementById('rsvp-count').innerHTML = 'Attending: ' +
      nextEvent.yes_rsvp_count;
  }

  function getNextEvent() {
    for (var event = 0; event < events.length; event++) {
      if (events[event].status == 'past') {
        return events[event - 1];
      }
    }
  }
};

getMeetups(signedUrl);
