var table;
// var table2;
var countryObjectArray = [];
var count;
var rowNum = [];
var yesCount = [];
var yesNum = [];
var countryName;
var regionName;
var femaleGNI;
var gapGNI;
var loaded = false;
var legBars;

function preload() {
  table = loadTable("institutions_gni.csv", "csv", "header");
}

function setup() {
  noLoop(); // no need for input or animation here
  createCanvas(windowWidth, 2000);
  // noCanvas();
  background(242, 241, 238);

  processData();
  if (loaded) {
    for (var i = 0; i < rowNum.length; i++) {
      countryObjectArray.push(new Country(rowNum[i], countryName[i], regionName[i], yesCount[i], femaleGNI[i], gapGNI[i]));
    }
    console.log(countryObjectArray);

  }
}


function draw() {

  for (var j = 0; j < rowNum.length; j++) {
    countryObjectArray[j].display();
  }
  fill(36, 62, 144);
  rect(15, 15, width - 30, 50);
  fill(255);
  text("Project 1", 40, 35);
  // text(countryName + "", 50, 50);
}

function processData() {

  count = table.getRowCount();
  countryName = table.getColumn("country");
  regionName = table.getColumn("regionName");

  femaleGNI = table.getColumn('femaleEstGNIperCapita_2013');
  for (var i = 0; i < femaleGNI.length; i++) {
    femaleGNI[i] = parseInt(femaleGNI[i].replace(/,/g, ""));
  }

  gapGNI = table.getColumn('gapGNI');
  for (var i = 0; i < gapGNI.length; i++) {
    gapGNI[i] = parseInt(gapGNI[i].replace(/,/g, ""));
  }

  for (var row = 0; row < count; row++) {

    rowNum.push(row);
    yesCount[row] = 0;
    // loop through the yes/no columns 
    for (col = 2; col < 27; col++) {
      var val = table.getString(row, col);
      if (val === 'Yes') {
        yesCount[row]++;
      }
    }
    loaded = true;
  }

  // for (var i = 0; i < count; i++) {
  //   countryObjectArray.push(new Country(rowNum[i], countryName[i], regionName[i], yesCount[i], femaleGNI[i], gapGNI[i]));
  // }
  // console.log(countryObjectArray);
}

function Country(rowNum, countryName, regionName, yesCount, femaleGNI, gapGNI) {
  this.row = rowNum;
  this.countryName = countryName;
  this.regionName = regionName;
  this.yesCount = yesCount;
  this.femaleGNI = femaleGNI;
  this.gapGNI = gapGNI;
}

Country.prototype.display = function() {
  // legBars = createElement("div")
  rect(width/2- width/4, 100 + (this.row * 30), this.yesCount * width/100, 20);
  rect(width/2 + 20, 100 + (this.row * 30), this.femaleGNI/20, 20);
  text(this.countryName, 50, 115 + (this.row * 30));
  push();
  strokeWeight(0.5);
  line(50, 125 + (this.row * 30), width - 50, 125 + (this.row * 30));
  pop();
  // Country[this.row].showCountryNames();
};

// Country.prototype.showCountryNames = function() {
//   push();
//   translate(this.row * 10, 100);
//   fill(100);
//   text(this.countryName, 10, 0);
//   pop();
// };
