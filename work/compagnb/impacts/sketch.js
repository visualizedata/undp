var map1; // global
var map2; // global
var canvas; // p5 canvas

var countryNames = [];
var hdiRanks = [];
var hdiGap = [];
var lifeGap = [];
var xSchoolGap = [];
var gniGap = [];
var hdiF = [];
var hdiM = [];
var lifeF = [];
var lifeM = [];
var xSchoolF = [];
var xSchoolM = [];
var gniF = [];
var gniM = [];
var gdp = [];
var jsonRegions = [];
var geometrys = [];
var geojson = [];
var comparisonOpts = [
    'HDR Rating',
    'Life Expectancy',
    'Avg. Years of Schooling',
    'Expected Years of Schooling',
    'GNI',
    'GDP Ranking'];
    
var countriesLayer = [];
var countriesLayer2 = [];

var centralCheckBox, eastCheckBox, northernCheckBox, southernCheckBox, westCheckBox;
var central = true;
var eastern = true;
var northern = true;
var southern = true;
var western = true;

var gni = false;
var hdi = true;
var xSchool = false;
var life = false;
var gdi = false;

    
var dropValue = 'All Africa - HDR';
var dropValue2 = 'All Africa - HDR';


var loaded = false;

function preload(){
  africa = loadJSON("africa.json");
  
}
function setup() {
  // showData(africa);
  loadJSON("africa.json", showData);
  canvas = createCanvas(windowWidth, windowHeight); // full window p5 canvas
  canvas.parent('maps'); // make p5 and leaflet use the same canvas (and z-index)
   
  initLeaflet(); // load leaflet functions and creat map and defined view
  // checkBoxes();
  comparisonFilter();
  comparisonFilter2();
  checkBoxes();
  addGeoJson();
  
}

function draw() {

}
function removeGeoJson(i) {
  map.removeLayer(geojson[i]);
  geojson[i].clearLayers();
}

function addGeoJson(mapVal, layerVal) {
    layerVal.clearLayers();
    
      if (central == true && eastern == true && western == true && northern == true && southern == true){
        for(var i = 0; i< geometrys.length; i++){
        addCountry(mapVal, i, layerVal);
        }
      }
      if (central == true){
        for(var i = 0; i< geometrys.length; i++){
          if( jsonRegions[i] == 'central'){
          addCountry(map1, i, layerVal);
          }
        }
      }
      if (eastern == true){
        for(var i = 0; i< geometrys.length; i++){
          if( jsonRegions[i] == 'east'){
          addCountry(mapVal, i, layerVal);
          }
        }
      }
      if (western == true){
        for(var i = 0; i< geometrys.length; i++){
          if( jsonRegions[i] == 'west'){
          addCountry(mapVal, i, layerVal);
          }
        }
      }
      if (northern == true){
        for(var i = 0; i< geometrys.length; i++){
          if( jsonRegions[i] == 'northern'){
          addCountry(mapVal, i, layerVal);
          }
        }
      }
      if (southern == true){
        for(var i = 0; i< geometrys.length; i++){
          if( jsonRegions[i] == 'southern'){
          addCountry(mapVal, i, layerVal);
          }
        }
      }

}

function addCountry(mapVal,i, layerVal){
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
        mapVal.fitBounds(e.target.getBounds());
      });
      
      layerVal.addLayer(country);
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
  if (dropValue == 'HDR Rating' || dropValue2 == 'HDR Rating' ){
    return hdiRanks[i] > 175 ? '#800026' :
      hdiRanks[i]  > 150 ? '#BD0026' :
      hdiRanks[i]  > 125 ? '#E31A1C' :
      hdiRanks[i]  > 100 ? '#FC4E2A' :
      hdiRanks[i]  > 75 ? '#FD8D3C' :
      hdiRanks[i]  > 50 ? '#FEB24C' :
      hdiRanks[i]  > 25 ? '#FED976' :
      '#FED976';
    // return hdiGap[i] > 175 ? '#800026' :
    //   hdiGap[i]  > 150 ? '#BD0026' :
    //   hdiGap[i]  > 125 ? '#E31A1C' :
    //   hdiGap[i]  > 100 ? '#FC4E2A' :
    //   hdiGap[i]  > 75 ? '#FD8D3C' :
    //   hdiGap[i]  > 50 ? '#FEB24C' :
    //   hdiGap[i]  > 25 ? '#FED976' :
    //   '#FED976';
  }
  if (dropValue == 'Life Expectancy' || dropValue2 == 'Life Expectancy'){
    return lifeGap[i] > 6 ? '#800026' :
       lifeGap[i]  > 5 ? '#BD0026' :
       lifeGap[i]  > 4 ? '#E31A1C' :
       lifeGap[i]  > 3 ? '#FC4E2A' :
       lifeGap[i]  > 2 ? '#FD8D3C' :
       lifeGap[i]  > 1 ? '#FEB24C' :
       lifeGap[i]  > 0 ? '#FED976' :
       '#FED976';
  } 
}

function showData(data) {
  // put info into arrays 
  for(var i = 0; i< data.features.length; i++){
    countryNames[i]= data.features[i].properties.name;
    hdiRanks[i]= data.features[i].properties.hdrRank;
    
    hdiM[i] = data.features[i].properties.Mhdi;
    hdiF[i] = data.features[i].properties.Fhdi;
    if( hdiM[i] != "unknown"){
      // hdiM[i] = parseFloat(hdiM[i]);
      // hdiF[i] = parseFloat(hdiF[i]);
    }else if (hdiF[i] > hdiM[i]){
     hdiGap[i] = hdiF[i] - hdiM[i];
    }else if( hdiF[i] < hdiM[i]){
      hdiGap[i] = hdiM[i] - hdiF[i];
    }else{
      hdiGap[i] = "unknown";
    } 
    
    lifeM[i] = data.features[i].properties.Mlife;
    lifeF[i] = data.features[i].properties.Flife;
    if (lifeF[i] > lifeM[i]){
     lifeGap[i] = lifeF[i] - lifeM[i];
    }else if( lifeF[i] < lifeM[i]){
      lifeGap[i] = lifeM[i] - lifeF[i];
    }else{
      lifeGap[i] = "unknown";
    } 
      
      
    xSchoolM[i] = data.features[i].properties.XSchM;
    xSchoolF[i] = data.features[i].properties.XSchF;
    if (xSchoolF[i] > xSchoolM[i]){
     xSchoolGap[i] = xSchoolF[i] - xSchoolM[i];
    }else if( xSchoolF[i] < xSchoolM[i]){
      xSchoolGap[i] = xSchoolM[i] - xSchoolF[i];
    }else{
      xSchoolGap[i] = "unknown";
    } 
    
    gniM[i] = data.features[i].properties.gniM;
    gniF[i] = data.features[i].properties.gniF;
    if (gniF[i] > gniM[i]){
     gniGap[i] = gniF[i] - gniM[i];
    }else if( gniF[i] < gniM[i]){
      gniGap[i] = gniM[i] - gniF[i];
    }else{
      gniGap[i] = "unknown";
    }
   
    
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
  map1 = L.mapbox.map('map1', 'compagnb.AfricaHDR', {doubleClickZoom: false, zoomControl: false }).setView([3, 17], 3);
  map2 = L.mapbox.map('map2', 'compagnb.AfricaHDR', {zoomControl: false}).setView([3, 17], 3);
  
  // double click to zoom out !
  // when either map finishes moving, trigger an update on the other one.
  map1.on('moveend', follow).on('zoomend', follow).on('dblclick', function(e) {
    // Zoom exactly to each double-clicked point
    map1.setView(e.latlng, map1.setView([3, 17], 3));
    });
  map2.on('moveend', follow).on('zoomend', follow);
  
  // quiet is a cheap and dirty way of avoiding a problem in which one map
  // syncing to another leads to the other map syncing to it, and so on
  // ad infinitum. this says that while we are calling sync, do not try to 
  // loop again and sync other maps
  var quiet = false;
  function follow(e) {
    if (quiet) return;
    quiet = true;
    if (e.target === map1) sync(map2, e);
    if (e.target === map2) sync(map1, e);
    quiet = false;
  }

  // sync simply steals the settings from the moved map (e.target)
  // and applies them to the other map.
  function sync(map, e) {
    map.setView(e.target.getCenter(), e.target.getZoom(), {
        animate: false,
        reset: true
    });
}

  // leaflet needs this function, no need to do anything here
  function onMapClick(e) {}
  map1.on('click', onMapClick);
  map2.on('click', onMapClick);
  
  countriesLayer = new L.FeatureGroup().addTo(map1);
  countriesLayer2 = new L.FeatureGroup().addTo(map2);
  
}

function comparisonFilter() {
  var dropdown = createElement('select');
  dropdown.position(0, 0);
  for (var i = 0; i < comparisonOpts.length; i++) {
    var option = createElement('option');
    option.attribute('value', comparisonOpts[i]);
    option.html(comparisonOpts[i]);
    option.parent(dropdown);
  }
  dropdown.parent('filter');
    var droptest = createDiv('HDR Rating');
  droptest.parent('value');

  dropdown.elt.onchange = function() {
    droptest.html(this.value);
    dropValue = this.value;
    console.log(dropValue);
    addGeoJson(map1, countriesLayer);
  }
}

function comparisonFilter2() {
  var dropdown2 = createElement('select');
  dropdown2.position(0, 0);
  for (var i = 0; i < comparisonOpts.length; i++) {
    var option = createElement('option');
    option.attribute('value', comparisonOpts[i]);
    option.html(comparisonOpts[i]);
    option.parent(dropdown2);
  }
  dropdown2.parent('filter2');
  var droptest2 = createDiv('HDR Rating');
  droptest2.parent('value2');

  dropdown2.elt.onchange = function() {
    droptest2.html(this.value);
    dropValue2 = this.value;
    console.log(dropValue2);
    addGeoJson(map2, countriesLayer2);
  }
}

function checkBoxes() {

  var centralBut = L.easyButton('<strong>Central</strong>', function(btn, map1){
    handleCentral();
  }).addTo(map1);
  var northernBut = L.easyButton('<strong>Northern</strong>', function(btn, map1){
    handleNorthern();
  }).addTo(map1);
  var southernBut = L.easyButton('<strong>Southern</strong>', function(btn, map1){
    handleSouthern();
  }).addTo(map1);
  var eastBut = L.easyButton('<strong>Eastern</strong>', function(btn, map1){
    handleEastern();
  }).addTo(map1);
  var westernBut = L.easyButton('<strong>Western</strong>', function(btn, map1){
    handleWestern();
  }).addTo(map1);

  // centralCheckBox = L.control({position: 'topright'});
  // centralCheckBox.onAdd = function (map2) {
  //   var div = L.DomUtil.create('div', 'Central');
  
  //   div.innerHTML = '<form><input id="Central" type="checkbox" checked/>Central</form>'; 
  //   return div;
  // };
  // centralCheckBox.addTo(map2);
  // document.getElementById ("Central").addEventListener ("click", handleCentral, true);
  
  // eastCheckBox = L.control({position: 'topright'});
  // eastCheckBox.onAdd = function (map2) {
  //   var div = L.DomUtil.create('div', 'Eastern');
  // div.innerHTML = '<form><input id="Eastern" type="checkbox" checked/>Eastern</form>'; 
  //   return div;
  // };
  // eastCheckBox.addTo(map2);
  // document.getElementById ("Eastern").addEventListener ("click", handleEastern, true);
  
  // northernCheckBox = L.control({position: 'topright'});
  // northernCheckBox.onAdd = function (map2) {
  //   var div = L.DomUtil.create('div', 'Northern');
  // div.innerHTML = '<form><input id="Northern" type="checkbox" checked/>Northern</form>'; 
  //   return div;
  // };
  // northernCheckBox.addTo(map2);
  // document.getElementById ("Northern").addEventListener ("click", handleNorthern, true);
  
  // southernCheckBox = L.control({position: 'topright'});
  // southernCheckBox.onAdd = function (map2) {
  //   var div = L.DomUtil.create('div', 'Southern');
  // div.innerHTML = '<form><input id="Southern" type="checkbox" checked/>Southern</form>'; 
  //   return div;
  // };
  // southernCheckBox.addTo(map2);
  // document.getElementById ("Southern").addEventListener ("click", handleSouthern, true);
  
  
  // westCheckBox = L.control({position: 'topright'});
  // westCheckBox.onAdd = function (map2) {
  //   var div = L.DomUtil.create('div', 'Western');
  // div.innerHTML = '<form><input id="Western" type="checkbox" checked/>Western</form>'; 
  //   return div;
  // };
  // westCheckBox.addTo(map2);
  // document.getElementById ("Western").addEventListener ("click", handleWestern, true);
  

}

  // add the event handler
function handleCentral() {
  central = !central;
  // console.log(central);
  addGeoJson(map1, countriesLayer);
  addGeoJson(map2, countriesLayer2);
  // alert("Clicked, checked = " + this.checked);
}
function handleEastern() {
  eastern = !eastern;
  // console.log(eastern);
  addGeoJson(map1, countriesLayer);
  addGeoJson(map2, countriesLayer2);
  // alert("Clicked, checked = " + this.checked);
}
function handleNorthern() {
  northern = !northern;
  // console.log(central);
  addGeoJson(map1, countriesLayer);
  addGeoJson(map2, countriesLayer2);
  // alert("Clicked, checked = " + this.checked);
}
function handleSouthern() {
  southern = !southern;
  // console.log(eastern);
  addGeoJson(map1, countriesLayer);
  addGeoJson(map2, countriesLayer2);
  // alert("Clicked, checked = " + this.checked);
}
function handleWestern() {
  western = !western;
  // console.log(central);
  addGeoJson(map1, countriesLayer);
  addGeoJson(map2, countriesLayer2);
  // alert("Clicked, checked = " + this.checked);
}


// function to change window size when modified
window.onresize = function() {
  canvas.size(windowWidth, windowHeight);

};