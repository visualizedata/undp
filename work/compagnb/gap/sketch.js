var table;
var countryInfo = [];
var areas = [];
var ranks = [];
var countries = [];
var hdrF = [];
var hdrM = [];
var lifeF = [];
var lifeM = [];
var meanSchoolF = [];
var meanSchoolM = [];
var expSchoolF = [];
var expSchoolM = [];
var gniF = [];
var gniM = [];
var loaded = false;

var hdr = true;
var life = false;
var meanSchool = false;
var expSchool = false;
var gni = false;

var dropValue = 'HDR Ratings';

var femaleImg, maleImg, headerImg;

// min and max values for the size
var minVal = 100; // make higher for worse case senerio
var maxVal = 0; // make lower for worse case and gets bumped up higher

var fontLight;
var c = [];

function preload() {
  // load data info from undpGoals.txt
  table = loadTable("data/hdrQuant.txt", "tsv", "header");
  femaleImg = loadImage("images/femalesm.png");
  maleImg = loadImage("images/malesm.png");
  headerImg = loadImage("images/header.png");
  fontLight = loadFont("fonts/Roboto-Light.ttf");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  // background(191, 222, 235);
  background('#3d3d3d');
  noLoop(); // no need for input or animation here
  noFill();
  textSize(10);

  // process all the data into arrays
  processData();
  console.log("min val: " + minVal + " ||  max val: " + maxVal);
  if (loaded) {
    for (row = 0; row < areas.length; row++) {
      countryInfo.push(new CountryInfo(row));
    }
  }
}

function draw() {

  createHeader();
  regionFilter();
  // fill("#D3D3D3");


}

function processData() {
  //  count the rows
  print(table.getRowCount() + " total rows in table");
  //  count the columns
  print(table.getColumnCount() + " total columns in table");
  //  print contents of column named Country Name
  areas = table.getColumn("Area");
  ranks = table.getColumn("HDI ranks");
  countries = table.getColumn("Country");
  hdrF = table.getColumn("hdrF2013");
  hdrM = table.getColumn("hdrM2013");
  lifeF = table.getColumn("lifeF2013");
  lifeM = table.getColumn("lifeM2013");
  meanSchoolF = table.getColumn("meanSchoolF2002-2012");
  meanSchoolM = table.getColumn("meanSchoolM2000-2012");
  expSchoolF = table.getColumn("expSchoolF2000-2012");
  expSchoolM = table.getColumn("expSchoolM2000-2012");
  gniF = table.getColumn("gniF2013");
  gniM = table.getColumn("gniM2013");
  // mapHighLow(3);
  // while parsing, give me the max and min values

  loaded = true;
}

// function to give max and min values
function mapHighLow(int) {
  minVal = 100000;
  maxVal = 0;
  var count = table.getRowCount();
  //get min and max
  for (var row = 1; row < count; row++) {
    for (var col = int; col < int + 2; col++) {
      var val = table.getString(row, col);
      val = float(val);

      if (minVal > val) {
        minVal = val;
      } else if (maxVal < val) {
        maxVal = val;
      }
      console.log(minVal + " || " + maxVal);
    }
  }
}

function createHeader() {
  image(maleImg, width - 30, 10);
  fill("rgba(255, 255, 255, 0.8)");
  text("Male", width - 70, 25);
  image(femaleImg, width - 30, 40);
  text("Female", width - 79, 55);
}

function CountryInfo(row) {
  this.row = row;
  this.area = areas[this.row];
  this.rank = ranks[this.row];
  this.country = countries[this.row];
  this.hdrF = hdrF[this.row];
  this.hdrM = hdrM[this.row];
  this.lifeF = lifeF[this.row];
  this.lifeM = lifeM[this.row];
  this.meanSchoolF = meanSchoolF[this.row];
  this.meanSchoolM = meanSchoolM[this.row];
  this.expSchoolF = expSchoolF[this.row];
  this.expSchoolM = expSchoolM[this.row];
  this.gniF = gniF[this.row];
  this.gniM = gniM[this.row];
}
CountryInfo.prototype.showCountryNames = function() {
  // var rowWBorder = 1+this.row;
  if (this.hdrF != "..") {
    push();
    translate(this.row * width / 55, height - 170);
    rotate(45);
    strokeWeight(0);
    fill('rgba(255, 255, 255, 0.8)');
    textFont(fontLight);
    text(this.country, 10, 0);
    rotate(0);
    pop();
  }
}
CountryInfo.prototype.showHDRs = function() {
  if (this.hdrF != ".." || this.hdrM != "..") {
    countryInfo[this.row].showCountryNames();
    beginShape()
    stroke('rgba(255, 255, 255, 0.3)');
    strokeWeight(6);
    image(femaleImg, (this.row * width / 55) + 2, map(this.hdrF, minVal, maxVal, height - 200, 0));
    if (this.hdrF < this.hdrM) {
      vertex((this.row * width / 55) + 7, map(this.hdrF, minVal, maxVal, height - 200, 0)); // record one vertex per data point
      vertex((this.row * width / 55) + 7, map(this.hdrM, minVal, maxVal, height - 200, 0) + 20); // record one vertex per data point
    } else {
      vertex((this.row * width / 55) + 7, map(this.hdrM, minVal, maxVal, height - 200, 0)); // record one vertex per data point
      vertex((this.row * width / 55) + 7, map(this.hdrF, minVal, maxVal, height - 200, 0) + 20); // record one vertex per data point
    }
    image(maleImg, (this.row * width / 55) + 2, map(this.hdrM, minVal, maxVal, height - 200, 0));
    endShape();
  }
}

CountryInfo.prototype.showLifes = function() {
  countryInfo[this.row].showCountryNames();
  if (this.lifeF != ".." || this.lifeM != "..") {
    beginShape()
    stroke('rgba(255, 255, 255, 0.3)');
    strokeWeight(6);
    image(femaleImg, (this.row * width / 55) + 2, map(this.lifeF, minVal, maxVal, height - 200, 0));
    if (this.lifeF < this.lifeM) {
      vertex((this.row * width / 55) + 7, map(this.lifeF, minVal, maxVal, height - 200, 0)); // record one vertex per data point
      vertex((this.row * width / 55) + 7, map(this.lifeM, minVal, maxVal, height - 200, 0) + 20); // record one vertex per data point
    } else {
      vertex((this.row * width / 55) + 7, map(this.lifeM, minVal, maxVal, height - 200, 0)); // record one vertex per data point
      vertex((this.row * width / 55) + 7, map(this.lifeF, minVal, maxVal, height - 200, 0) + 20); // record one vertex per data point
    }
    image(maleImg, (this.row * width / 55) + 2, map(this.lifeM, minVal, maxVal, height - 200, 0));
    endShape();
  }
}

CountryInfo.prototype.showMeanSchool = function() {
  countryInfo[this.row].showCountryNames();
  if (this.meanSchoolF != ".." || this.meanSchoolM != "..") {
    beginShape()
    stroke('rgba(255, 255, 255, 0.3)');
    strokeWeight(6);
    image(femaleImg, (this.row * width / 55) + 2, map(this.meanSchoolF, minVal, maxVal, height - 200, 0));
    if (this.meanSchoolF < this.meanSchoolM) {
      vertex((this.row * width / 55) + 7, map(this.meanSchoolF, minVal, maxVal, height - 200, 0)); // record one vertex per data point
      vertex((this.row * width / 55) + 7, map(this.meanSchoolM, minVal, maxVal, height - 200, 0) + 20); // record one vertex per data point
    } else {
      vertex((this.row * width / 55) + 7, map(this.meanSchoolM, minVal, maxVal, height - 200, 0)); // record one vertex per data point
      vertex((this.row * width / 55) + 7, map(this.meanSchoolF, minVal, maxVal, height - 200, 0) + 20); // record one vertex per data point
    }
    image(maleImg, (this.row * width / 55) + 2, map(this.meanSchoolM, minVal, maxVal, height - 200, 0));
    endShape();
  }
}
CountryInfo.prototype.showExpSchool = function() {
  countryInfo[this.row].showCountryNames();
  if (this.expSchoolF != ".." || this.expSchoolM != "..") {
    beginShape()
    stroke('rgba(255, 255, 255, 0.3)');
    strokeWeight(6);
    image(femaleImg, (this.row * width / 55) + 2, map(this.expSchoolF, minVal, maxVal, height - 200, 0));
    if (this.expSchoolF < this.expSchoolM) {
      vertex((this.row * width / 55) + 7, map(this.expSchoolF, minVal, maxVal, height - 200, 0)); // record one vertex per data point
      vertex((this.row * width / 55) + 7, map(this.expSchoolM, minVal, maxVal, height - 200, 0) + 20); // record one vertex per data point
    } else {
      vertex((this.row * width / 55) + 7, map(this.expSchoolM, minVal, maxVal, height - 200, 0)); // record one vertex per data point
      vertex((this.row * width / 55) + 7, map(this.expSchoolF, minVal, maxVal, height - 200, 0) + 20); // record one vertex per data point
    }
    image(maleImg, (this.row * width / 55) + 2, map(this.expSchoolM, minVal, maxVal, height - 200, 0));
    endShape();
  }
}
CountryInfo.prototype.showGNI = function() {
  countryInfo[this.row].showCountryNames();
  if (this.gniF != ".." || this.gniM != "..") {
    beginShape()
    stroke('rgba(255, 255, 255, 0.3)');
    strokeWeight(6);
    image(femaleImg, (this.row * width / 55) + 2, map(this.gniF, minVal, maxVal, height - 200, 0));
    if (this.gniF < this.gniM) {
      vertex((this.row * width / 55) + 7, map(this.gniF, minVal, maxVal, height - 200, 0)); // record one vertex per data point
      vertex((this.row * width / 55) + 7, map(this.gniM, minVal, maxVal, height - 200, 0) + 20); // record one vertex per data point
    } else {
      vertex((this.row * width / 55) + 7, map(this.gniM, minVal, maxVal, height - 200, 0)); // record one vertex per data point
      vertex((this.row * width / 55) + 7, map(this.gniF, minVal, maxVal, height - 200, 0) + 20); // record one vertex per data point
    }
    image(maleImg, (this.row * width / 55) + 2, map(this.gniM, minVal, maxVal, height - 200, 0));
    endShape();
  }
}

function regionFilter() {
  dropdown = createElement('select');
  dropdown.position(width - 180, 50);
  var options = ['HDR Ratings', 'Life Expectancy', 'Avg. Years of Schooling', 'Expected Years of Schooling', 'GNI'];
  for (var i = 0; i < options.length; i++) {
    var option = createElement('option');
    option.attribute('value', options[i]);
    option.html(options[i]);
    option.parent(dropdown);
  }

  var droptest = createDiv('what is selected?')
  droptest.parent('value');

  dropdown.elt.onchange = function() {
    droptest.html(this.value);
    dropValue = this.value;
    console.log(dropValue);
    update();

  }
}

function update() {
  if (dropValue == 'HDR Ratings') {
    background('#3d3d3d');
    fill('#2B2B2B');
    strokeWeight(0);
    rect(0, height - 170, width, height);
    mapHighLow(3);
    for (var i = 0; i < areas.length; i++) {
      countryInfo[i].showHDRs();
    }
    fill("rgba(255, 255, 255, 0.8)");
    stroke("#D3D3D3");
    strokeWeight(0);
    textSize(8);
    text(".5 rating", 5, map(.48, minVal, maxVal, height - 200, 0));
    rect(0, map(.5, minVal, maxVal, height - 200, 0), width, 1);
  } else if (dropValue === 'Life Expectancy') {
    background('#3d3d3d');
    fill('#2B2B2B');
    strokeWeight(0);
    rect(0, height - 170, width, height);
    mapHighLow(5);
    for (var i = 0; i < areas.length; i++) {
      countryInfo[i].showLifes();
    }
    fill("rgba(255, 255, 255, 0.8)");
    stroke("#D3D3D3");
    strokeWeight(0);
    textSize(8);
    text("61.5 years of age", 5, map(60.5, minVal, maxVal, height - 200, 0));
    rect(0, map(61.5, minVal, maxVal, height - 200, 0), width, 1);
  } else if (dropValue === 'Avg. Years of Schooling') {
    background('#3d3d3d');
    fill('#2B2B2B');
    strokeWeight(0);
    rect(0, height - 170, width, height);
    mapHighLow(7);
    for (var i = 0; i < areas.length; i++) {
      countryInfo[i].showMeanSchool();
    }
  } else if (dropValue === 'Expected Years of Schooling') {
    background('#3d3d3d');
    fill('#2B2B2B');
    strokeWeight(0);
    rect(0, height - 170, width, height);
    mapHighLow(9);
    for (var i = 0; i < areas.length; i++) {
      countryInfo[i].showExpSchool();
    }
  } else if (dropValue === 'GNI') {
    background('#3d3d3d');
    fill('#2B2B2B');
    strokeWeight(0);
    rect(0, height - 170, width, height);
    mapHighLow(11);
    for (var i = 0; i < areas.length; i++) {
      countryInfo[i].showGNI();
    }
  }
}





// function mouseMoved(){
//   console.log("mouseX: " + mouseX);
//   console.log("mouseY: " + mouseY);

// }