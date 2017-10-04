const signedUrl = 'https://api.meetup.com/cork-javascript-meetup/events?' +
  'desc=true&photo-host=public&page=20&sig_id=210143296&callback=updateDOM&' +
  'status=past%2Cupcoming&sig=4a36a805aac0c8de4199cb3008a95f9fa292ca9b';
const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept',
  'Oct', 'Nov', 'Dec'
];
const days = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

let getMeetups = function(url) {
  let head = document.head;
  let script = document.createElement('script');

  script.setAttribute('src', url);
  head.appendChild(script);
  head.removeChild(script);
}

let updateDOM = function(responseJSON) {
  let events = responseJSON.data;

  // Checks if no meetups were returned
  if (!(events && events.length > 0)) {
    console.log('ERROR: No meetups returned from request.');
    return;
  };

  let latestEvent = events[0];

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
  let date = new Date(latestEvent.time);
  document.getElementById('latest-date').innerHTML = (`
    ${days[date.getDay() -1]} ${date.getDate()}
    ${months[date.getMonth()]}, ${date.getFullYear()} - 
    ${date.getHours()}:${date.getMinutes()}    
  `);

  // Add link to title
  let link = latestEvent.link;
  document.getElementById('latest-link').href = link;

  // Replace location data
  let location = latestEvent.venue;
  document.getElementById('latest-location').innerHTML =
    (`
      ${location.name}<br>${location.address_1}
       - [ <a href="http://maps.google.com/?q=${location.name}
        target="_blank">Directions</a> ]    
    `);

  // Add embed map
  let map = document.getElementById('map');
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
