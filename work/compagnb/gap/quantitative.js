var quanTable;
var hdrTable;
var lifeTable;
var meanSchoolTable;
var expSchoolTable;
var gniTable;

var countryInfo = [];
var hdrSorted = [];
var lifeSorted = [];
var meanSchoolSorted = [];
var expSchoolSorted = [];
var gniSorted = [];

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

var dropValue = 'HDR Ratings';

var femaleImg, maleImg, headerImg;

// min and max values for the size
var minVal = 100; // make higher for worse case senerio
var maxVal = 0; // make lower for worse case and gets bumped up higher

var fontLight;
var c = [];

function preload() {
  // load data info from undpGoals.txt
  quanTable = loadTable("data/hdrQuant.txt", "tsv", "header");
  hdrTable = loadTable("data/hdrSorted.txt", "tsv", "header");
  lifeTable = loadTable("data/lifeSorted.txt", "tsv", "header");
  expSchoolTable = loadTable("data/expSchoolSorted.txt", "tsv", "header");
  meanSchoolTable = loadTable("data/meanSchoolSorted.txt", "tsv", "header");
  gniTable = loadTable("data/gniSorted.txt", "tsv", "header");

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

  createObjects(quanTable, countryInfo);
  createObjects(hdrTable, hdrSorted);
  createObjects(lifeTable, lifeSorted);
  createObjects(expSchoolTable, meanSchoolSorted);
  createObjects(meanSchoolTable, expSchoolSorted);
  createObjects(gniTable, gniSorted);

}

function draw() {

  //createHeader(); // need to fix stroke and placement
  regionFilter();
  drawBkgrd();
  drawRefGuides();
  for (var i = 0; i < hdrSorted.length; i++) {
    countryInfo[i].showCountryNames();
    countryInfo[i].display();
  }
  //console.log(countryInfo[i].hdrGap);
  //update();

}

function processData(test) {
  //  count the rows
  print(test.getRowCount() + " total rows in table");
  //  count the columns
  print(test.getColumnCount() + " total columns in table");
  //  print contents of column named Country Name
  areas = test.getColumn("Area");
  ranks = test.getColumn("HDI ranks");
  countries = test.getColumn("Country");
  hdrF = test.getColumn("hdrF2013");
  hdrM = test.getColumn("hdrM2013");
  lifeF = test.getColumn("lifeF2013");
  lifeM = test.getColumn("lifeM2013");
  meanSchoolF = test.getColumn("meanSchoolF2002-2012");
  meanSchoolM = test.getColumn("meanSchoolM2000-2012");
  expSchoolF = test.getColumn("expSchoolF2000-2012");
  expSchoolM = test.getColumn("expSchoolM2000-2012");
  gniF = test.getColumn("gniF2013");
  gniM = test.getColumn("gniM2013");

  // mapHighLow(3);
  // while parsing, give me the max and min values

  loaded = true;
}

function createObjects(table, array) {
  // process all the data into arrays
  processData(table);
  //console.log("min val: " + minVal + " ||  max val: " + maxVal);
  if (loaded) {
    for (row = 0; row < areas.length; row++) {
      array.push(new CountryInfo(row));
    }
  }
  emtyArrays();
}

function emtyArrays() {
  areas = [];
  ranks = [];
  countries = [];
  hdrF = [];
  hdrM = [];
  lifeF = [];
  lifeM = [];
  meanSchoolF = [];
  meanSchoolM = [];
  expSchoolF = [];
  expSchoolM = [];
  gniF = [];
  gniM = [];
  loaded = false;
}

// function to give max and min values
function mapHighLow(int) {
  minVal = 1000000000;
  maxVal = 0;
  var count = quanTable.getRowCount();
  //get min and max
  for (var row = 1; row < count; row++) {
    for (var col = int; col < int + 1; col++) {
      var val = quanTable.getString(row, col);
      val = float(val);

      if (minVal > val) {
        minVal = val;
      } else if (maxVal < val) {
        maxVal = val;
      }
      //console.log(minVal + " || " + maxVal);
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
  this.hdrGap = this.hdrF - this.hdrM;
  this.lifeF = lifeF[this.row];
  this.lifeM = lifeM[this.row];
  this.lifeGap = this.lifeF - this.lifeM;
  this.meanSchoolF = meanSchoolF[this.row];
  this.meanSchoolM = meanSchoolM[this.row];
  this.meanSchoolGap = this.meanSchoolF - this.meanSchoolM;
  this.expSchoolF = expSchoolF[this.row];
  this.expSchoolM = expSchoolM[this.row];
  this.expSchoolGap = this.expSchoolF - this.expSchoolM;
  this.gniF = gniF[this.row];
  this.gniM = gniM[this.row];
  this.gniGap = this.gniF - this.gniM;
}
CountryInfo.prototype.showCountryNames = function() {
  push();
  translate((this.row + 1) * width / 55, height - 170);
  rotate(45);
  strokeWeight(0);
  fill('rgba(255, 255, 255, 0.8)');
  textFont(fontLight);
  text(this.country, 10, 0);
  rotate(0);
  pop();
  fill('rgba(255, 255, 255, 0.1)');
  for (var i = 0; i < height - 170; i = i + 20) {
    rect((this.row * width / 55) + 7, i, 1, 0);
  }
}
CountryInfo.prototype.display = function() {
  var femaleRank;
  var maleRank;

  if (dropValue == 'HDR Ratings') {
    femaleRank = this.hdrF;
    maleRank = this.hdrM;
    minVal = .20;
    maxVal = .85;
  } else if (dropValue === 'Life Expectancy') {
    femaleRank = this.lifeF;
    maleRank = this.lifeM;
    minVal = 20;
    maxVal = 100;
  } else if (dropValue === 'Avg. Years of Schooling') {
    femaleRank = this.meanSchoolF;
    maleRank = this.meanSchoolM;
    minVal = 0;
    maxVal = 10;
  } else if (dropValue === 'Expected Years of Schooling') {
    femaleRank = this.expSchoolF;
    maleRank = this.expSchoolM;
    minVal = 0;
    maxVal = 15;
  } else if (dropValue === 'GNI') {
    femaleRank = this.gniF;
    maleRank = this.gniM;
    minVal = 100;
    maxVal = 30000;
  }

  console.log(minVal + " || " + maxVal);
  console.log(this.country + " || " + femaleRank + " || " + maleRank);

  if (femaleRank != ".." || maleRank != "..") {
    // images
    image(femaleImg, ((this.row + 1) * width / 55) + 2, map(femaleRank, minVal, maxVal, height - 170, 0));
    image(maleImg, ((this.row + 1) * width / 55) + 2, map(maleRank, minVal, maxVal, height - 170, 0));

    beginShape()
    stroke('rgba(255, 255, 255, 0.1)');
    strokeWeight(6);

    //lines
    if (femaleRank < maleRank) {
      vertex(((this.row + 1) * width / 55) + 7, map(femaleRank, minVal, maxVal, height - 170, 0)); // record one vertex per data point
      vertex(((this.row + 1) * width / 55) + 7, map(maleRank, minVal, maxVal, height - 170, 0) + 20); // record one vertex per data point
    } else {
      vertex(((this.row + 1) * width / 55) + 7, map(maleRank, minVal, maxVal, height - 170, 0)); // record one vertex per data point
      vertex(((this.row + 1) * width / 55) + 7, map(femaleRank, minVal, maxVal, height - 170, 0) + 20); // record one vertex per data point
    }
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

  var droptest = createDiv('HDR Ratings')
  droptest.parent('value');

  dropdown.elt.onchange = function() {
    droptest.html(this.value);
    dropValue = this.value;
    console.log(dropValue);
    update();

  }
}

function drawBkgrd() {
  background('#3d3d3d');
  fill('#2B2B2B');
  strokeWeight(0);
  rect(0, height - 170, width, height);
}

function drawRefGuides() {
  if (dropValue == 'HDR Ratings') {
    fill("rgba(255, 255, 255, 0.8)");
    stroke("#D3D3D3");
    strokeWeight(0);
    textSize(8);
    text(".20 HDR", 5, map(0.21, 0.20, 0.85, height - 170, 0));
    text(".35 HDR", 5, map(0.35, 0.20, 0.85, height - 170, 0));
    text(".50 HDR", 5, map(0.5, 0.20, 0.85, height - 170, 0));
    text(".65 HDR", 5, map(0.65, 0.20, 0.85, height - 170, 0));
    text(".85 HDR", 5, map(0.83, 0.20, 0.85, height - 170, 0));
    rect(0, map(0.20, 0.20, 0.85, height - 170, 0), width, 1);

    fill("rgba(255, 255, 255, 0.1)");
    stroke("rgba(255, 255, 255, 0.1)");
    rect(0, map(0.35, 0.20, 0.85, height - 170, 0), width, 1);
    rect(0, map(0.5, 0.20, 0.85, height - 170, 0), width, 1);
    rect(0, map(0.65, 0.20, 0.85, height - 170, 0), width, 1);

  } else if (dropValue === 'Life Expectancy') {
    fill("rgba(255, 255, 255, 0.8)");
    stroke("#D3D3D3");
    strokeWeight(0);
    textSize(8);
    text("20 yrs", 5, map(21.25, 20, 100, height - 170, 0));
    text("40 yrs", 5, map(40, 20, 100, height - 170, 0));
    text("60 yrs", 5, map(60, 20, 100, height - 170, 0));
    text("80 yrs", 5, map(80, 20, 100, height - 170, 0));
    text("100 yrs", 5, map(97.5, 20, 100, height - 170, 0));
    rect(0, map(20, 20, 100, height - 170, 0), width, 1);

    fill("rgba(255, 255, 255, 0.1)");
    stroke("rgba(255, 255, 255, 0.1)");

    rect(0, map(40, 20, 100, height - 170, 0), width, 1);
    rect(0, map(60, 20, 100, height - 170, 0), width, 1);
    rect(0, map(80, 20, 100, height - 170, 0), width, 1);

  } else if (dropValue === 'Avg. Years of Schooling') {
    fill("rgba(255, 255, 255, 0.8)");
    stroke("#D3D3D3");
    strokeWeight(0);
    textSize(8);
    text("0 yrs", 5, map(.17, 0, 10, height - 170, 0));
    text("2 yrs", 5, map(2, 0, 10, height - 170, 0));
    text("4 yrs", 5, map(4, 0, 10, height - 170, 0));
    text("6 yrs", 5, map(6, 0, 10, height - 170, 0));
    text("8 yrs", 5, map(8, 0, 10, height - 170, 0));
    text("10 yrs", 5, map(9.67, 0, 10, height - 170, 0));
    rect(0, map(0, 0, 10, height - 170, 0), width, 1);

    fill("rgba(255, 255, 255, 0.1)");
    stroke("rgba(255, 255, 255, 0.1)");
    rect(0, map(2, 0, 10, height - 170, 0), width, 1);
    rect(0, map(4, 0, 10, height - 170, 0), width, 1);
    rect(0, map(6, 0, 10, height - 170, 0), width, 1);
    rect(0, map(8, 0, 10, height - 170, 0), width, 1);
  } else if (dropValue === 'Expected Years of Schooling') {
    fill("rgba(255, 255, 255, 0.8)");
    stroke("#D3D3D3");
    strokeWeight(0);
    textSize(8);
    text("0 yrs", 5, map(.22, 0, 14, height - 170, 0));
    text("2 yrs", 5, map(2, 0, 14, height - 170, 0));
    text("4 yrs", 5, map(4, 0, 14, height - 170, 0));
    text("6 yrs", 5, map(6, 0, 14, height - 170, 0));
    text("8 yrs", 5, map(8, 0, 14, height - 170, 0));
    text("10 yrs", 5, map(10, 0, 14, height - 170, 0));
    text("12 yrs", 5, map(12, 0, 14, height - 170, 0));
    text("14 yrs", 5, map(13.55, 0, 14, height - 170, 0));
    rect(0, map(0, 0, 15, height - 170, 0), width, 1);

    fill("rgba(255, 255, 255, 0.1)");
    stroke("rgba(255, 255, 255, 0.1)");
    rect(0, map(2, 0, 14, height - 170, 0), width, 1);
    rect(0, map(4, 0, 14, height - 170, 0), width, 1);
    rect(0, map(6, 0, 14, height - 170, 0), width, 1);
    rect(0, map(8, 0, 14, height - 170, 0), width, 1);
    rect(0, map(10, 0, 14, height - 170, 0), width, 1);
    rect(0, map(12, 0, 14, height - 170, 0), width, 1);
  } else if (dropValue === 'GNI') {
    fill("rgba(255, 255, 255, 0.8)");
    stroke("#D3D3D3");
    strokeWeight(0);
    textSize(8);
    text("100 GNI", 5, map(600, 100, 30000, height - 170, 0));
    text("5000 GNI", 5, map(5000, 100, 30000, height - 170, 0));
    text("10000 GNI", 5, map(10000, 100, 30000, height - 170, 0));
    text("15000 GNI", 5, map(15000, 100, 30000, height - 170, 0));
    text("20000 GNI", 5, map(20000, 100, 30000, height - 170, 0));
    text("25000 GNI", 5, map(25000, 100, 30000, height - 170, 0));
    text("30000 GNI2", 5, map(29000, 100, 30000, height - 170, 0));

    rect(0, map(100, 100, 30000, height - 170, 0), width, 1);

    fill("rgba(255, 255, 255, 0.1)");
    stroke("rgba(255, 255, 255, 0.1)");
    rect(0, map(5000, 100, 30000, height - 170, 0), width, 1);
    rect(0, map(10000, 100, 30000, height - 170, 0), width, 1);
    rect(0, map(15000, 100, 30000, height - 170, 0), width, 1);
    rect(0, map(20000, 100, 30000, height - 170, 0), width, 1);
    rect(0, map(25000, 100, 30000, height - 170, 0), width, 1);

  }
}


function update() {
  if (dropValue == 'HDR Ratings') {
    drawBkgrd();
    drawRefGuides();
    for (var i = 0; i < countryInfo.length; i++) {
      countryInfo[i].showCountryNames();
      countryInfo[i].display();
    }
  } else if (dropValue === 'Life Expectancy') {
    drawBkgrd();
    mapHighLow(5);
    drawRefGuides();
    for (var i = 0; i < countryInfo.length; i++) {
      countryInfo[i].showCountryNames();
      countryInfo[i].display();
    }
  } else if (dropValue === 'Avg. Years of Schooling') {
    drawBkgrd();
    mapHighLow(7);
    drawRefGuides();
    for (var i = 0; i < countryInfo.length; i++) {
      countryInfo[i].showCountryNames();
      countryInfo[i].display();
    }
  } else if (dropValue === 'Expected Years of Schooling') {
    drawBkgrd();
    mapHighLow(9);
    drawRefGuides();
    for (var i = 0; i < countryInfo.length; i++) {
      countryInfo[i].showCountryNames();
      countryInfo[i].display();
    }
  } else if (dropValue === 'GNI') {
    drawBkgrd();
    mapHighLow(11);
    drawRefGuides();
    for (var i = 0; i < countryInfo.length; i++) {
      countryInfo[i].showCountryNames();
      countryInfo[i].display();
    }

  }
}





// function mouseMoved(){
//   console.log("mouseX: " + mouseX);
//   console.log("mouseY: " + mouseY);

// }