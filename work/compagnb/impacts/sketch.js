var map; // global
var canvas; // p5 canvas
var countryNames = [];
var hdiRanks = [];
var hdiGaps = [];
var Fhdis = [];
var Mhdis = [];
var geometrys = [];
var geojson = [];

function preload(){
  
}
function setup() {
  canvas = createCanvas(windowWidth, windowHeight); // full window p5 canvas
  canvas.parent('map'); // make p5 and leaflet use the same canvas (and z-index)
   
  initLeaflet(); // load leaflet functions and creat map and defined view
  loadJSON("africa.json", showData);


}

function draw() {
  

}

function addLegend(){
  var legend = L.control({
     position: 'bottomleft'
  });
  legend.on('add', function(e){
     var div = L.DomUtil.create('div', 'info legend'),
       grades = ["Unavailable", 50, 75, 100, 125, 150, 175],
       labels = [];
    div.innerHTML += '<h4> HDR Ranks </h4>';
     // iterate through the array and make a label with a colored square
     for (var i = 0; i < grades.length; i++) {
       // for all numbers do the following to mark hdr ranges
       if (grades[i] != "Unavailable") {
         div.innerHTML +=
           '<i style="background:' + setColor(grades[i] + 1) + '"></i> ' +
           grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
       }
       // but I don't want a range for the first "unavailable" so do this instead
       if (grades[i] == "Unavailable") {
         div.innerHTML +=
           '<i style="background:' + setColor(grades[i]) + '"></i> ' +
           grades[i] + '<br>';
       }
     }
  //   // return the div when completed
    return div;
  // };
  })
   legend.addTo(map);

}

function addGeoJson(data) {

  for(var i = 0; i< data.features.length; i++){
    
    geojson[i] = L.geoJson([data.features[i].geometry],{
      style: addStyle(i)
      // onEachFeature: onEachFeature(i)
      });
    geojson[i].on('mouseover', function(e) {
      var layer = e.target;
      // console.log("test in");
      layer.setStyle({
        weight: 3,
        color: '#FFF',
      });
    }).on('mouseout', function(e) {
      // console.log("test out");
      var layer = e.target;
      layer.setStyle({
        weight: 1,
        color: '#FFF',
      });
    }).on('click', function(e){
      map.fitBounds(e.target.getBounds());
    }).addTo(map);
    // geojson[i].addTo(map);
  }

}

function addStyle(i){
  return{
    weight: 1,
    opacity: 1,
    color: '#FFF',
    dashArray: '0',
    fillOpacity: 0.7,
    fillColor: setColor(hdiRanks[i])
  }
}

function setColor(hdiRank){
  return hdiRank > 175 ? '#800026' :
       hdiRank > 150 ? '#BD0026' :
       hdiRank > 125 ? '#E31A1C' :
       hdiRank > 100 ? '#FC4E2A' :
       hdiRank > 75 ? '#FD8D3C' :
       hdiRank > 50 ? '#FEB24C' :
       hdiRank > 25 ? '#FED976' :
       '#FED976';
}

function showData(data) {
  // put info into arrays 
  for(var i = 0; i< data.features.length; i++){
    countryNames[i]= data.features[i].properties.name;
    hdiRanks[i]= data.features[i].properties.hdrRank;
    hdiGaps[i]= data.features[i].properties.hdrGap;
    // Fhdis[i]= data.features[i].properties.2013Fhdi;
    // Mhdis[i]= data.features[i].properties.2013Mhdi;
    geometrys[i]= data.features[i].geometry;
  }
  addGeoJson(data);
}

// init leaflet using a custom mapbox
function initLeaflet() {

  // api key
  L.mapbox.accessToken = 'pk.eyJ1IjoiY29tcGFnbmIiLCJhIjoiY2lnYjM5cjh1MW5wZnY5bTNrZ2d2ejVtZyJ9.XdZ79YPqoFtpksmMM-5FkQ';

  // custom map load
  map = L.mapbox.map('map', 'compagnb.AfricaHDR').setView([3, 17], 3);

  // leaflet needs this function, no need to do anything here
  function onMapClick(e) {}
  map.on('click', onMapClick);
}

// // function to change window size when modified
// window.onresize = function() {
//   canvas.size(windowWidth * .4, windowHeight-75);
// };