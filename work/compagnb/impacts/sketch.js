var map; // global
var canvas; // p5 canvas
var countryNames = [];
var hdiRanks = [];
var hdiGaps = [];
var Fhdis = [];
var Mhdis = [];
var jsonRegions = [];
var geometrys = [];
var geojson = [];
var regions = [
    'Pick A Region',
    'All Africa - HDR',
    'Central - HDR',
    'East - HDR',
    'West - HDR',
    'Northern - HDR',
    'Southern - HDR'];
    
var dropValue = 'Central - HDR';

function preload(){
  
}
function setup() {
  canvas = createCanvas(windowWidth, windowHeight); // full window p5 canvas
  canvas.parent('map'); // make p5 and leaflet use the same canvas (and z-index)
   
  initLeaflet(); // load leaflet functions and creat map and defined view
  loadJSON("africa.json", showData);
  regionFilter();

}

function draw() {



}
function removeGeoJson(i) {
  map.removeLayer(geojson[i]);
  geojson[i].clearLayers();
}

function addGeoJson(i) {
      geojson[i] = L.geoJson([geometrys[i]],{
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

}

function addStyle(i){
  return{
    weight: 1,
    opacity: 1,
    color: '#FFF',
    dashArray: '0',
    fillOpacity: 0.7,
    fillColor: setColor(i)
  }
}

function setColor(i){
    return hdiRanks[i] > 175 ? '#800026' :
       hdiRanks[i]  > 150 ? '#BD0026' :
       hdiRanks[i]  > 125 ? '#E31A1C' :
       hdiRanks[i]  > 100 ? '#FC4E2A' :
       hdiRanks[i]  > 75 ? '#FD8D3C' :
       hdiRanks[i]  > 50 ? '#FEB24C' :
       hdiRanks[i]  > 25 ? '#FED976' :
       '#FED976';
}

function showData(data) {
  // put info into arrays 
  for(var i = 0; i< data.features.length; i++){
    countryNames[i]= data.features[i].properties.name;
    hdiRanks[i]= data.features[i].properties.hdrRank;
    hdiGaps[i]= data.features[i].properties.hdrGap;
    geometrys[i]= data.features[i].geometry;
    jsonRegions[i] = data.features[i].properties.region;
   
  }
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

function regionFilter() {
  dropdown = createElement('select');
  dropdown.position(0, 0);
  for (var i = 0; i < regions.length; i++) {
    var option = createElement('option');
    option.attribute('value', regions[i]);
    option.html(regions[i]);
    option.parent(dropdown);
  }
  dropdown.parent('filter');
    var droptest = createDiv('what is selected?')
  droptest.parent('value');

  dropdown.elt.onchange = function() {
    droptest.html(this.value);
    dropValue = this.value;
    console.log(dropValue);
    for(var i = 0; i< geometrys.length; i++){
      if (dropValue === 'All Africa - HDR'){
        addGeoJson(i);
      } else if (dropValue === 'Central - HDR' && jsonRegions[i] === 'central'){
        addGeoJson(i);
      } else if (dropValue === 'Central - HDR' && jsonRegions[i] != 'central') {
        removeGeoJson(i);
      } else if (dropValue === 'East - HDR' && jsonRegions[i] === 'east'){
        addGeoJson(i);
      } else if (dropValue === 'East - HDR' && jsonRegions[i] !== 'east') {
        removeGeoJson(i);
      } else if (dropValue === 'Northern - HDR' && jsonRegions[i] === 'northern'){
        addGeoJson(i);
      } else if (dropValue === 'Northern - HDR' && jsonRegions[i] !== 'northern') {
        removeGeoJson(i);
      } else if (dropValue === 'Southern - HDR' && jsonRegions[i] === 'southern'){
        addGeoJson(i);
      } else if (dropValue === 'Southern - HDR' && jsonRegions[i] !== 'southern') {
        removeGeoJson(i);
      }else if (dropValue === 'West - HDR' && jsonRegions[i] === 'west'){
        addGeoJson(i);
      }else if (dropValue === 'West - HDR' && jsonRegions[i] !== 'west') {
        removeGeoJson(i);
      }else {
        removeGeoJson(i);
      }
    }
  }
}

// function to change window size when modified
window.onresize = function() {
  canvas.size(windowWidth, windowHeight);

};