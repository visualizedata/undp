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
    'All Africa - HDR',
    'Central - HDR',
    'East - HDR',
    'West - HDR',
    'Northern - HDR',
    'Southern - HDR'];
    
var countriesLayer = [];
    
var dropValue = 'All Africa - HDR';
var africa;

var loaded = false;

function preload(){
  africa = loadJSON("africa.json");
  
}
function setup() {
  showData(africa);
  // loadJSON("africa.json", showData);
  canvas = createCanvas(windowWidth, windowHeight); // full window p5 canvas
  canvas.parent('map'); // make p5 and leaflet use the same canvas (and z-index)
   
  initLeaflet(); // load leaflet functions and creat map and defined view
  
  regionFilter();
  addGeoJson();

  
}

function draw() {



}
function removeGeoJson(i) {
  map.removeLayer(geojson[i]);
  geojson[i].clearLayers();
}

function addGeoJson() {
    countriesLayer.clearLayers();
    
      if (dropValue == 'All Africa - HDR'){
        for(var i = 0; i< geometrys.length; i++){
          addCountry(i);
        }
      }
      if (dropValue ==  'Central - HDR'){
        for(var i = 0; i< geometrys.length; i++){
          if( jsonRegions[i] == 'central'){
          addCountry(i);
          }
        }
      }
      if (dropValue ==  'East - HDR'){
        for(var i = 0; i< geometrys.length; i++){
          if( jsonRegions[i] == 'east'){
          addCountry(i);
          }
        }
      }
      if (dropValue ==  'West - HDR'){
        for(var i = 0; i< geometrys.length; i++){
          if( jsonRegions[i] == 'west'){
          addCountry(i);
          }
        }
      }
      if (dropValue ==  'Northern - HDR'){
        for(var i = 0; i< geometrys.length; i++){
          if( jsonRegions[i] == 'northern'){
          addCountry(i);
          }
        }
      }
      if (dropValue ==  'Southern - HDR'){
        for(var i = 0; i< geometrys.length; i++){
          if( jsonRegions[i] == 'southern'){
          addCountry(i);
          }
        }
      }
  

}

function addCountry(i){
   var country = L.geoJson([geometrys[i]],{
        style: addStyle(i)
        // onEachFeature: onEachFeature(i)
        });
    
      country.on('mouseover', function(e) {
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
      });
      
      countriesLayer.addLayer(country);
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
  loaded = true;
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
  
  countriesLayer = new L.FeatureGroup().addTo(map);
  
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
    var droptest = createDiv('All Africa - HDR');
  droptest.parent('value');

  dropdown.elt.onchange = function() {
    droptest.html(this.value);
    dropValue = this.value;
    console.log(dropValue);
    // countriesLayer.clearLayers();
    addGeoJson();
  }
}

// function to change window size when modified
window.onresize = function() {
  canvas.size(windowWidth, windowHeight);

};