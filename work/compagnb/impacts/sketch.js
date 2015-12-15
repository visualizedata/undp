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
var expSchF = [];
var expSchM = [];
var expSchGap = [];
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
    'GNI Rating',
    'GDP Rating'];

var comparisonOpts2 = [
    'GDP Rating',
    'HDR Rating',
    'Life Expectancy',
    'Avg. Years of Schooling',
    'Expected Years of Schooling',
    'GNI Rating'];

var legend1;
var legend2;
var header;
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

var dropdown;
var dropdown2;
var dropValue = 'HDR Rating';
var dropValue2 = 'GDP Rating';
var africa;

function preload(){
  africa = loadJSON("africa.json");

}
function setup() {
  showData(africa);
  heading(dropValue, dropValue2);
  // loadJSON("africa.json", showData);
  canvas = createCanvas(windowWidth, windowHeight-75); // full window p5 canvas
  canvas.parent('maps'); // make p5 and leaflet use the same canvas (and z-index)

  initLeaflet(); // load leaflet functions and creat map and defined view
  // checkBoxes();

  comparisonFilter();
  comparisonFilter2();
  checkBoxes();
  for(var i = 0; i< geometrys.length; i++){
        addCountry(i, 1);
        addCountry(i, 2);
  }
  legendInfo(map1, dropValue);
  legend2Info(map2, dropValue2);
}

function draw() {
}

function addGeoJson(mapNum) {

  if (mapNum == 1){
    countriesLayer.clearLayers();
      if (central == true){
        for(var i = 0; i< geometrys.length; i++){
          if( jsonRegions[i] == 'central'){
          addCountry(i, mapNum);
          }
        }
      }
      if (eastern == true){
        for(var i = 0; i< geometrys.length; i++){
          if( jsonRegions[i] == 'east'){
          addCountry(i, mapNum);
          }
        }
      }
      if (western == true){
        for(var i = 0; i< geometrys.length; i++){
          if( jsonRegions[i] == 'west'){
            addCountry(i, mapNum);
          }
        }
      }
      if (northern == true){
        for(var i = 0; i< geometrys.length; i++){
          if( jsonRegions[i] == 'northern'){
            addCountry(i, mapNum);
          }
        }
      }
      if (southern == true){
        for(var i = 0; i< geometrys.length; i++){
          if( jsonRegions[i] == 'southern'){
            addCountry(i, mapNum);
          }
        }
      }
  } else if ( mapNum == 2){
    countriesLayer2.clearLayers();
      if (central == true){
        for(var i = 0; i< geometrys.length; i++){
          if( jsonRegions[i] == 'central'){
          addCountry(i, mapNum);
          }
        }
      }
      if (eastern == true){
        for(var i = 0; i< geometrys.length; i++){
          if( jsonRegions[i] == 'east'){
          addCountry(i, mapNum);
          }
        }
      }
      if (western == true){
        for(var i = 0; i< geometrys.length; i++){
          if( jsonRegions[i] == 'west'){
            addCountry(i, mapNum);
          }
        }
      }
      if (northern == true){
        for(var i = 0; i< geometrys.length; i++){
          if( jsonRegions[i] == 'northern'){
            addCountry(i, mapNum);
          }
        }
      }
      if (southern == true){
        for(var i = 0; i< geometrys.length; i++){
          if( jsonRegions[i] == 'southern'){
            addCountry(i, mapNum);
          }
        }
      }
  }
}

function addCountry(i, mapNum){
  if (mapNum == 1){
   var country = L.geoJson([geometrys[i]],{
        style: addStyle(i, mapNum),
      });

    countriesLayer.addLayer(country);

    } else if (mapNum == 2){
      var country = L.geoJson([geometrys[i]],{
        style: addStyle(i, mapNum)
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
        map2.fitBounds(e.target.getBounds());
      });

      countriesLayer2.addLayer(country);
    }
}

function addStyle(i, mapNum){
  return{
    weight: 1,
    opacity: 1,
    color: '#FFF',
    dashArray: '0',
    fillOpacity: 1,
    fillColor: setColor(i, mapNum)
  }
}

function setColor(i, mapNum){
  if (mapNum == 1){
    if (dropValue == 'HDR Rating'){
      // console.log(hdiGap[i]);
      return hdiGap[i] > 0.1 ? '#800026' :
        hdiGap[i]  > 0.09 ? '#BD0026' :
        hdiGap[i]  > 0.07 ? '#E31A1C' :
        hdiGap[i]  > 0.05 ? '#FC4E2A' :
        hdiGap[i]  > 0.03 ? '#FD8D3C' :
        hdiGap[i]  > 0.01 ? '#FEB24C' :
        hdiGap[i]  > 0 ? '#FED976' :
        '#FED976';
    }
    if (dropValue == 'Life Expectancy'){
      return lifeGap[i] > 5.5 ? '#800026' :
       lifeGap[i]  > 4.5 ? '#BD0026' :
       lifeGap[i]  > 3.5 ? '#E31A1C' :
       lifeGap[i]  > 2.5 ? '#FC4E2A' :
       lifeGap[i]  > 1.5 ? '#FD8D3C' :
       lifeGap[i]  > 0.5 ? '#FEB24C' :
       lifeGap[i]  > 0 ? '#FED976' :
       '#FED976';
    }
    if (dropValue == 'Avg. Years of Schooling'){
      return xSchoolGap[i] > 3.0 ? '#800026' :
        xSchoolGap[i]  > 2.5 ? '#BD0026' :
        xSchoolGap[i]  > 2.0 ? '#E31A1C' :
        xSchoolGap[i]  > 1.5 ? '#FC4E2A' :
        xSchoolGap[i]  > 1.0 ? '#FD8D3C' :
        xSchoolGap[i]  > 0.5 ? '#FEB24C' :
        xSchoolGap[i]  > 0 ? '#FED976' :
        '#FED976';
    }
    if (dropValue == 'Expected Years of Schooling'){
      return xSchoolGap[i] > 3.0 ? '#800026' :
        expSchGap[i]  > 2.5 ? '#BD0026' :
        expSchGap[i]  > 2.0 ? '#E31A1C' :
        expSchGap[i]  > 1.5 ? '#FC4E2A' :
        expSchGap[i]  > 1.0 ? '#FD8D3C' :
        expSchGap[i]  > 0.5 ? '#FEB24C' :
        expSchGap[i]  > 0 ? '#FED976' :
        '#FED976';
    }
    if (dropValue == 'GNI Rating'){
      return gniGap[i] > 10000 ? '#800026' :
       gniGap[i]  > 8000 ? '#BD0026' :
       gniGap[i]  > 6000 ? '#E31A1C' :
       gniGap[i]  > 4000 ? '#FC4E2A' :
       gniGap[i]  > 2000 ? '#FD8D3C' :
       gniGap[i]  > 500 ? '#FEB24C' :
       gniGap[i]  > 0 ? '#FED976' :
       '#FED976';
    }
    if (dropValue == 'GDP Rating'){
      return gdp[i] > 200 ? '#800026' :
       gdp[i]  > 100 ? '#BD0026' :
       gdp[i]  > 80 ? '#E31A1C' :
       gdp[i]  > 60 ? '#FC4E2A' :
       gdp[i]  > 40 ? '#FD8D3C' :
       gdp[i]  > 20 ? '#FEB24C' :
       gdp[i]  > 0 ? '#FED976' :
       '#FED976';
    }
  }
    if (mapNum == 2){
    if (dropValue2 == 'HDR Rating'){
      // console.log(hdiGap[i]);
      return hdiGap[i] > 0.1 ? '#800026' :
        hdiGap[i]  > 0.09 ? '#BD0026' :
        hdiGap[i]  > 0.07 ? '#E31A1C' :
        hdiGap[i]  > 0.05 ? '#FC4E2A' :
        hdiGap[i]  > 0.03 ? '#FD8D3C' :
        hdiGap[i]  > 0.01 ? '#FEB24C' :
        hdiGap[i]  > 0 ? '#FED976' :
        '#FED976';
    }
    if (dropValue2 == 'Life Expectancy'){
      return lifeGap[i] > 5.5 ? '#800026' :
       lifeGap[i]  > 4.5 ? '#BD0026' :
       lifeGap[i]  > 3.5 ? '#E31A1C' :
       lifeGap[i]  > 2.5 ? '#FC4E2A' :
       lifeGap[i]  > 1.5 ? '#FD8D3C' :
       lifeGap[i]  > 0.5 ? '#FEB24C' :
       lifeGap[i]  > 0 ? '#FED976' :
       '#FED976';
    }
    if (dropValue2 == 'Avg. Years of Schooling'){
      return xSchoolGap[i] > 3.0 ? '#800026' :
        xSchoolGap[i]  > 2.5 ? '#BD0026' :
        xSchoolGap[i]  > 2.0 ? '#E31A1C' :
        xSchoolGap[i]  > 1.5 ? '#FC4E2A' :
        xSchoolGap[i]  > 1.0 ? '#FD8D3C' :
        xSchoolGap[i]  > 0.5 ? '#FEB24C' :
        xSchoolGap[i]  > 0 ? '#FED976' :
        '#FED976';
    }
    if (dropValue2 == 'Expected Years of Schooling'){
      return xSchoolGap[i] > 3.0 ? '#800026' :
        expSchGap[i]  > 2.5 ? '#BD0026' :
        expSchGap[i]  > 2.0 ? '#E31A1C' :
        expSchGap[i]  > 1.5 ? '#FC4E2A' :
        expSchGap[i]  > 1.0 ? '#FD8D3C' :
        expSchGap[i]  > 0.5 ? '#FEB24C' :
        expSchGap[i]  > 0 ? '#FED976' :
        '#FED976';
    }
    if (dropValue2 == 'GNI Rating'){
      return gniGap[i] > 10000 ? '#800026' :
       gniGap[i]  > 8000 ? '#BD0026' :
       gniGap[i]  > 6000 ? '#E31A1C' :
       gniGap[i]  > 4000 ? '#FC4E2A' :
       gniGap[i]  > 2000 ? '#FD8D3C' :
       gniGap[i]  > 500 ? '#FEB24C' :
       gniGap[i]  > 0 ? '#FED976' :
       '#FED976';
    }
    if (dropValue2 == 'GDP Rating'){
      return gdp[i] > 200 ? '#800026' :
       gdp[i]  > 100 ? '#BD0026' :
       gdp[i]  > 80 ? '#E31A1C' :
       gdp[i]  > 60 ? '#FC4E2A' :
       gdp[i]  > 40 ? '#FD8D3C' :
       gdp[i]  > 20 ? '#FEB24C' :
       gdp[i]  > 0 ? '#FED976' :
       '#FED976';
    }
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
      hdiGap[i] = data.features[i].properties.hdiGap;
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


    expSchM[i] = data.features[i].properties.XSchM;
    expSchF[i] = data.features[i].properties.XSchF;
    if (expSchF[i] > expSchM[i]){
     expSchGap[i] = expSchF[i] - expSchM[i];
    }else if( expSchF[i] < expSchM[i]){
      expSchGap[i] = xSchoolM[i] - expSchF[i];
    }else{
      expSchGap[i] = "unknown";
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

    gdp[i] = data.features[i].properties.GDP;
    geometrys[i]= data.features[i].geometry;
    jsonRegions[i] = data.features[i].properties.region;
  }

  loaded = true;
}

function initLeaflet() {

  // api key
  L.mapbox.accessToken = 'pk.eyJ1IjoiY29tcGFnbmIiLCJhIjoiY2lnYjM5cjh1MW5wZnY5bTNrZ2d2ejVtZyJ9.XdZ79YPqoFtpksmMM-5FkQ';

  // custom map load
  map1 = L.mapbox.map('map1', 'compagnb.AfricaHDR', {
    doubleClickZoom: false,
    zoomControl: false
  }).setView([3, 17], 3)
  .on('moveend', follow)
  .on('zoomend', follow)
  .on('dblclick', function(e) {
  // Zoom exactly to each double-clicked point
    map1.setView(e.latlng, map1.setView([3, 17], 3));
    });

  map2 = L.mapbox.map('map2', 'compagnb.AfricaHDR', {
    doubleClickZoom: false,
    zoomControl: false
  }).setView([3, 17], 3);

  // double click to zoom out !
  // when either map finishes moving, trigger an update on the other one.
  // map1.

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

  new L.Control.Zoom({ position: 'bottomright' }).addTo(map2);

  countriesLayer = new L.FeatureGroup().addTo(map1);

  countriesLayer2 = new L.FeatureGroup().addTo(map2);

}

function comparisonFilter() {
  dropdown = createElement('select');
  dropdown.addClass('styled-select');
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
    header.remove()
    heading(dropValue, dropValue2);
    addGeoJson(1);
    legend1.remove();
    legendInfo(map1, dropValue);
  }
}

function comparisonFilter2() {
  dropdown2 = createElement('select');
  dropdown2.addClass('styled-select');
  dropdown2.position(0, 0);
  for (var i = 0; i < comparisonOpts2.length; i++) {
    var option = createElement('option');
    option.attribute('value', comparisonOpts2[i]);
    option.html(comparisonOpts2[i]);
    option.parent(dropdown2);
  }
  dropdown2.parent('filter2');
  var droptest2 = createDiv('GDP Rating');
  droptest2.parent('value2');

  dropdown2.elt.onchange = function() {
    droptest2.html(this.value);
    dropValue2 = this.value;
    header.remove()
    heading(dropValue, dropValue2);
    addGeoJson(2);
    legend2.remove();
    legend2Info(map2, dropValue2);
  }
}

function update(){
}

function heading(dropV, dropV2){
  var text;
  var text2;
  if ( dropV != 'GDP Rating'){
    text = 'Comparing gaps in ';
  }else if (dropV == 'GDP Rating') {
    text = 'Comparing '
  }
  if ( dropV2 != 'GDP Rating'){
    text2 = ' to gaps in ';
  }else if (dropV2 == 'GDP Rating'){
    text2= ' to '
  }
  header = createDiv('<h1>' + text + '<span>'+ dropV + '</span>' + text2 + '<span>'+ dropV2 + '</span>' +' within African Countries </h1> ');
  header.id('header');
  header.position(0, 0);
  var sources = createDiv('<p> Sources: <a class="source" href="http://hdr.undp.org/en/content/human-development-report-2014" target="_blank">UNDP 2014 Human Development Report </a> and <a class="source" href="http://databank.worldbank.org/data/download/GDP.pdf" target="_blank">GDP Ranking provided by World Bank </a.');
  // sources.id('source');
  sources.parent(header);
}

function legendInfo(map, dropV) {
  var colorArray = [];
  colorArray = ['#800026', '#BD0026', '#E31A1C', '#FC4E2A', '#FD8D3C', '#FEB24C', '#FED976']
  var unitsOfMeasure;

  var rangeArray = [];
  if (dropV == 'HDR Rating'){
    rangeArray = [0.1, 0.09, 0.07, 0.05, 0.03, 0.01, "Unknown"];
    unitsOfMeasure = "HDR Points"
  }
  if (dropV == 'Life Expectancy'){
    rangeArray = [5.5, 4.5, 3.5, 2.5, 1.5, 0.5, "Unknown"];
    unitsOfMeasure = "Years"
  }

  if (dropV == 'Avg. Years of Schooling'){
    rangeArray = [3.0, 2.5, 2.0, 1.5, 1.0, 0.5, "Unknown"];
    unitsOfMeasure = "Years"
  }
   if (dropV == 'Expected Years of Schooling'){
    rangeArray = [3.0, 2.5, 2.0, 1.5, 1.0, 0.5, "Unknown"];
    unitsOfMeasure = "Years"
  }

  if (dropV == 'GNI Rating'){
    rangeArray = [10000, 8000, 6000, 4000, 2000, 500, "Unknown"];
    unitsOfMeasure = "GNI Points"
  }

   if (dropV == 'GDP Rating'){
    rangeArray = [200, 100, 80, 60, 40, 20, "Unknown"];
    unitsOfMeasure = "GDP Points"
  }

  legend1 = createDiv('<h4>' + dropV +' Gaps </h4>');
  legend1.id('legend1');
  legend1.parent('map1');
  // div.position(50, height-100);
  legend1.style('z-index', 30);
  for (var i=0; i < rangeArray.length; i++){
    var unavail = createDiv( rangeArray[i] + ' ' + unitsOfMeasure);
    unavail.parent(legend1);
    unavail.addClass('legendLabel');
      var unavailColor = createDiv("");
      unavailColor.parent(legend1);
      unavailColor.addClass('legendColorBox')
      unavailColor.style('background-color', colorArray[i]);
      unavailColor.style('width', 20);
      unavailColor.style('height', 20);
  }
}

function legend2Info(map, dropV) {
  var colorArray = [];
  colorArray = ['#800026', '#BD0026', '#E31A1C', '#FC4E2A', '#FD8D3C', '#FEB24C', '#FED976']
  var unitsOfMeasure;

  var rangeArray = [];
  if (dropV == 'HDR Rating'){
    rangeArray = [0.1, 0.09, 0.07, 0.05, 0.03, 0.01, "Unknown"];
    unitsOfMeasure = "HDR Points"
  }
  if (dropV == 'Life Expectancy'){
    rangeArray = [5.5, 4.5, 3.5, 2.5, 1.5, 0.5, "Unknown"];
    unitsOfMeasure = "Years"
  }

  if (dropV == 'Avg. Years of Schooling'){
    rangeArray = [3.0, 2.5, 2.0, 1.5, 1.0, 0.5, "Unknown"];
    unitsOfMeasure = "Years"
  }

  if (dropV == 'Expected Years of Schooling'){
    rangeArray = [3.0, 2.5, 2.0, 1.5, 1.0, 0.5, "Unknown"];
    unitsOfMeasure = "Years"
  }

  if (dropV == 'GNI Rating'){
    rangeArray = [10000, 8000, 6000, 4000, 2000, 500, "Unknown"];
    unitsOfMeasure = "GNI Points"
  }

   if (dropV == 'GDP Rating'){
    rangeArray = [200, 100, 80, 60, 40, 20, "Unknown"];
    unitsOfMeasure = "GDP Points"
  }

  legend2 = createDiv('<h4>' + dropV +' Gaps </h4>');
  legend2.id('legend2');
  legend2.parent('map2');
  // div.position(50, height-100);
  legend2.style('z-index', 30);
  for (var i=0; i < rangeArray.length; i++){
    var unavail = createDiv( rangeArray[i] + ' ' + unitsOfMeasure);
    unavail.parent(legend2);
    unavail.addClass('legendLabel');
      var unavailColor = createDiv("");
      unavailColor.parent(legend2);
      unavailColor.addClass('legendColorBox')
      unavailColor.style('background-color', colorArray[i]);
      unavailColor.style('width', 20);
      unavailColor.style('height', 20);
  }
}

function checkBoxes() {

  var centralBut = L.easyButton({
    id: 'toggle-check-and-x',
    states: [{
        icon: '<strong>Central</strong>',
        stateName: 'check-mark',
        onClick: function(btn,map) {
            // btn.button.style.backgroundColor = 'red';
            btn.state('x-mark');
            handleCentral();
        }
    }, {
        icon: '<strong>Central</strong>',
        stateName: 'x-mark',
        onClick: function(btn,map) {
            // btn.button.style.backgroundColor = 'red';
            btn.state('check-mark');
            handleCentral();
        }
    }]
  });
  centralBut.addTo(map1);

  var northernBut = L.easyButton({
    id: 'toggle-check-and-x',
    states: [{
        icon: '<strong>Northern</strong>',
        stateName: 'check-mark',
        onClick: function(btn,map) {
            btn.state('x-mark');
            handleNorthern();
        }
    }, {
        icon: '<strong>Northern</strong>',
        stateName: 'x-mark',
        onClick: function(btn,map) {
            btn.state('check-mark');
            handleNorthern();
        }
    }]
  });
  northernBut.addTo(map1);

  var southernBut = L.easyButton({
    id: 'toggle-check-and-x',
    states: [{
        icon: '<strong>Southern</strong>',
        stateName: 'check-mark',
        onClick: function(btn,map) {
            btn.state('x-mark');
            handleSouthern();
        }
    }, {
        icon: '<strong>Southern</strong>',
        stateName: 'x-mark',
        onClick: function(btn,map) {
            btn.state('check-mark');
            handleSouthern();
        }
    }]
  });
  southernBut.addTo(map1);

  var eastBut = L.easyButton({
    id: 'toggle-check-and-x',
    states: [{
        icon: '<strong>Eastern</strong>',
        stateName: 'check-mark',
        onClick: function(btn,map) {
            btn.state('x-mark');
            handleEastern();
        }
    }, {
        icon: '<strong>Eastern</strong>',
        stateName: 'x-mark',
        onClick: function(btn,map) {
            btn.state('check-mark');
            handleEastern();
        }
    }]
  });
  eastBut.addTo(map1);

  var westernBut = L.easyButton({
    id: 'toggle-check-and-x',
    states: [{
        icon: '<strong>Western</strong>',
        stateName: 'check-mark',
        onClick: function(btn,map) {
            btn.state('x-mark');
            handleWestern();
        }
    }, {
        icon: '<strong>Western</strong>',
        stateName: 'x-mark',
        onClick: function(btn,map) {
            btn.state('check-mark');
            handleWestern();
        }
    }]
  });
  westernBut.addTo(map1);




  // var centralBut = L.easyButton('<strong>Central</strong>', function(btn, map1){
  //   handleCentral();
  // }).addTo(map1);
  // var northernBut = L.easyButton('<strong>Northern</strong>', function(btn, map1){
  //   handleNorthern();
  // }).addTo(map1);
  // var southernBut = L.easyButton('<strong>Southern</strong>', function(btn, map1){
  //   handleSouthern();
  // }).addTo(map1);
  // var eastBut = L.easyButton('<strong>Eastern</strong>', function(btn, map1){
  //   handleEastern();
  // }).addTo(map1);
  // var westernBut = L.easyButton('<strong>Western</strong>', function(btn, map1){
  //   handleWestern();
  // }).addTo(map1);

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
  addGeoJson(1);
  addGeoJson(2);
  // alert("Clicked, checked = " + this.checked);
}
function handleEastern() {
  eastern = !eastern;
  // console.log(eastern);
  addGeoJson(1);
  addGeoJson(2);
  // alert("Clicked, checked = " + this.checked);
}
function handleNorthern() {
  northern = !northern;
  // console.log(central);
  addGeoJson(1);
  addGeoJson(2);
  // alert("Clicked, checked = " + this.checked);
}
function handleSouthern() {
  southern = !southern;
  // console.log(eastern);
  addGeoJson(1);
  addGeoJson(2);
  // alert("Clicked, checked = " + this.checked);
}
function handleWestern() {
  western = !western;
  // console.log(central);
  addGeoJson(1);
  addGeoJson(2);
  // alert("Clicked, checked = " + this.checked);
}


// function to change window size when modified
window.onresize = function() {
  canvas.size(windowWidth, windowHeight-75);

};
