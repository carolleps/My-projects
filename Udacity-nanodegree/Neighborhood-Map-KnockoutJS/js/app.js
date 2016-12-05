var map;
var defaultIcon = "img/icon-default.png";
var hoverIcon = "img/icon-hover.png";
var markers = [];


// ViewModel
function initMap(){
  var sydney = {lat: -33.8688729, lng: 151.2025101};
  map = new google.maps.Map(document.getElementById("map"), {
      center: sydney,
      zoom: 11
  });

  var model = [
    {
      name:"Bah BQ Brazilian Grill",
      location: {lat: -33.8241738, lng: 151.1993332},
      placeid: "4e562ce2d164a0684c5ad03a",
      type: ["food"]
    },
    {
      name:"Cafecito",
      location: {lat: -33.8732475, lng: 151.2030512},
      placeid: "4b74c8a0f964a520dbf12de3",
      type: ["food"]
    },
    {
      name:"Hair by Marcia Bento",
      location: {lat: -33.9533515, lng: 151.135525},
      placeid: "5656ba8d498ef1ac55b4a618",
      type: ["hair", "nails", "eyebrow"]
    },

    {
      name:"NNC Pro Beauty",
      location: {lat: -33.8775868, lng: 151.2166922},
      lat: "-33.8775868",
      lng: "151.2166922",
      placeid: "56821297498eb126410047f8",
      type: ["hair", "nails", "eyebrow"]
    },
    {
      name:"Ovo Cafe",
      location: {lat: -33.8786941, lng: 151.2114242},
      placeid: "51d63b93498ee198deb6ba5d",
      type: ["food"]
    },
  ];

  var bounds = new google.maps.LatLngBounds();
  infoWindow = new google.maps.InfoWindow();

  function hideMarkers(){
    for(var i = 0; i < markers.length; i++){
      markers[i].setMap(null);
    }
  } 

  for(var i = 0; i< model.length; i++){
    var location = model[i].location; //latlng
    var name = model[i].name;
    var address = model[i].address;
    var phone = model[i].phone;
    var website = model[i].website;
    var category = model[i].type;
    var placeid = model[i].placeid; // FourSquare Api id


    var marker = new google.maps.Marker({
      map: map,
      position: location,
      animation: google.maps.Animation.DROP,
      icon: defaultIcon,
      title: name,
      placeid: placeid,
      // address: address,
      // phone: phone,
      // website: website,
      category: category
    });

    markers.push(marker);

    marker.addListener('mouseover', function() {
        this.setIcon(hoverIcon);
    });

    marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
    })    

    addFourSquareApi(this);

    marker.addListener('click', function(){
        populateInfoWindow(this, infoWindow);
    });
  }

  // Adding FourSquare Api info to a marker          
  function addFourSquareApi(marker){
    var CLIENT_ID = "CELRLYF4G3HUCWR13FCSDQWBFFRMMQB4N4AG2V1CLE1033RA";
    var CLIENT_SECRET = "HZI32FORJWCCUAEB5ZBDKHURVHVLVGDEDUJ1AKX21BYMB20Q";
    $.ajax({
      // url: 'https://api.foursquare.com/v2/venues/' + marker.placeid + '?client_id=CELRLYF4G3HUCWR13FCSDQWBFFRMMQB4N4AG2V1CLE1033RA&client_secret=HZI32FORJWCCUAEB5ZBDKHURVHVLVGDEDUJ1AKX21BYMB20Q'
      url:'https://api.foursquare.com/v2/venues/search',
      dataType: 'json',
      data: 'limit=1' +
          '&ll=' + marker.lat + ', ' + marker.lng +
          '&query=' + marker.placeid +
          '&client_id='+ CLIENT_ID +
          '&client_secret='+ CLIENT_SECRET +
          '&v=20130815',

      async: true,
      success: function(data){
        console.log('success');
        var result = data.response.venue;
        marker.photo = result.hasOwnProperty('bestPhoto')? result.bestPhoto.prefix + '200x200' + result.bestPhoto.suffix: '';
        marker.likes = result.hasOwnProperty('likes')? result.likes.summary: '';
        marker.rating = result.hasOwnProperty('rating')? result.rating: ''; 
        marker.url = result.hasOwnProperty('url')? result.url: ''; 
        marker.phone = result.contact.hasOwnProperty('formattedPhone')? result.contact.formattedPhone: ''; 
        if (result.location.hasOwnProperty('formattedAddress')){
          marker.address =[];
          for(var i = 0; i < result.location.formattedAddress.length; i++){
            marker.address = marker.address + result.location.formattedAddress.shift() + ' ';
          }
        }
      },
      error: function(error){
        var errorInfowindow = new google.maps.InfoWindow();
        errorInfowindow.marker = marker;
        errorInfowindow.setContent("<div><p>Sorry something went wrong..</p></div>");
        errorInfowindow.open(map, marker);
      }
    });
  }

  ko.applyBindings(new ViewModel());

  document.getElementById('show-listings').addEventListener('click', showListings);
  document.getElementById('hide-listings').addEventListener('click', hideListings);

  // Two event listeners - one for mouseover, one for mouseout,
  // to change icon back and forth.
  
}


var ViewModel = function(){
  var self = this;
  self.list = ko.observableArray(markers);

  self.showListings = function(){
    showListings();
  };

  self.hideListings = function(){
    hideListings();
  };
  
  self.query = ko.observable('');
  
  self.search = ko.computed(function(){
    return ko.utils.arrayFilter(self.list(), function(marker){
      // Check if location matches query
      var match =  marker.title.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
      // Simultaneously update markers on the map
      marker.setVisible(match);
      return match;
    });
  });

  self.selectPlace = function(marker){
    populateInfoWindow(marker, infoWindow);
  };

}


  
    


   

  function populateInfoWindow(marker, infowindow){
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
      infowindow.setContent(
        '<h3>' + marker.title + '</h3>'+
        '<div><p><strong>Address: </strong>' + marker.address + '</p>' +
        '<p><strong>Phone: </strong>' + marker.phone + '</p>' +
        '<p><strong>Website: </strong><a target="_blank" href="' + marker.url + '">'+ marker.website + '</a></p>'+
        '<p><strong>Services: </strong>' + marker.category + '</p>' +
        '<p>' + 'Rating: ' + marker.rating + '/10, ' + marker.likes + '</p>' + 
        '<img id="infowindow-image" src=' + marker.photo + ' /></div>'
        );          
      marker.setIcon(hoverIcon);
      infowindow.marker = marker;
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
        marker.setIcon(defaultIcon);
      });
      infowindow.open(map, marker);
    }
  }
  self.zoom = function(){
    zoomToArea();
  };
  
  function showListings() {
    var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
      bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
  }

  // This function will loop through the listings and hide them all.
  function hideListings() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  } 

  function googleMapErrorHandler(){
    alert('Google map did not load correctly. Please try it again');
  }




 


// This function takes the input value in the find nearby area text input
// locates it, and then zooms into that area. This is so that the user can
// show all listings, then decide to focus on one area of the map.
function zoomToArea() {
  // Initialize the geocoder.
  var geocoder = new google.maps.Geocoder();
  // Get the address or place that the user entered.
  var address = document.getElementById('zoom-to-area-text').value;
  // Make sure the address isn't blank.
  if (address == '') {
    window.alert('You must enter an area, or address.');
  } else {
    // Geocode the address/area entered to get the center. Then, center the map
    // on it and zoom in
    geocoder.geocode(
      { 
        componentRestrictions: {country: 'AU',
      postalCode: address}
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          map.setZoom(15);
        } else {
          window.alert('We could not find that location - try entering a more' +
              ' specific place.');
        }
      });
  }
}
