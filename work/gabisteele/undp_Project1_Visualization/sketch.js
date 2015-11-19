var table;
var minVal = 10000;
var maxVal = 10000;
var isOverRectangle;
var tableRows = 0;
var countryPostions = [];
var countryObjectArray = [];
var boy = boy;
var myFont;
var myFontBold;

function preload() {
  table = loadTable("educationdata.txt", "tsv", "header");
  myFont = loadFont('CabinSketch-Regular.otf');
  myFontBold = loadFont('CabinSketch-Bold.otf');
}

function draw() {}


function setup() {
  createCanvas(2000, 5000);
  background(255);
  noFill();
  

  // Years of Schooling Gradient
  // elementary school
  noStroke();
  fill(229, 243, 255, 100);
  rect(492, 193, 150, 3765);
  // middle school
  noStroke();
  fill(229, 243, 255);
  rect(610, 193, 78, 3765);
  // high school
  noStroke();
  fill(229, 243, 255, 100);
  rect(680, 193, 100, 3765);
  // post secondary
  noStroke();
  fill(229, 243, 255);
  rect(780, 193, 130, 3765);
  
  
  // notebook cubes 1
  strokeWeight(1);
  stroke(51, 102, 204, 80);
  for (var i = 0; i < 10000; i++) {
    line(35 * i, 0, 35 * i, 5000);
  }
  // notebook cubes 2
  stroke(51, 102, 204, 80);
  for (var l = 0; l < 50000; l++) {
    line(0, 35 * l, windowWidth, 35 * l);
  }

  // count the rows in our table
  var count = table.getRowCount();
  // parse the data returned by loadStrings()
  var rowHeight = 6;
  // loop through all rows to determine global minumum and maximum
  for (var row = 0; row < count; row++) {
    // loop through all the columns
    for (var col = 0; col < 3; col++) {
      var val = table.getString(row, col);
      // display the text on the canvas
      val = parseFloat(val);
      if (minVal > val)
        minVal = val;
      if (maxVal < val)
        maxVal = val;
    }
  }

  noStroke();
  // KEY AT TOP
  fill("navy");
  rect(12, 18, 15, 15, 15);
  textFont(myFont);
  textSize(25);
  text("= Boys", 35, 33);

  fill("maroon");
  rect(12, 46, 15, 15, 15);
  text("= Girls", 35, 60);

  // Parsing out the Data
  for (row = 0; row < count; row++) {
    var meanyrsBoys;
    var meanyrsGirls;
    // show country names
    var countryName = table.getString(row, 1);
    var Region = table.getString(row, 0);

    if (isNaN(parseInt(table.getString(row, 4)))) {
      meanyrsBoys = " ";
    } else {
      meanyrsBoys = table.getNum(row, 4);
    }

    if (isNaN(parseInt(table.getString(row, 3)))) {
      meanyrsGirls = " ";
    } else {
      meanyrsGirls = table.getNum(row, 3);

    }
    countryObjectArray.push(new country(countryName, meanyrsBoys, meanyrsGirls, Region));

  }
  makeHeader();

  for (var a = 0; a < countryObjectArray.length; a++) {
    countryObjectArray[a].display();
    tableRows++;

 

  }

}

function country(CountryName, meanyrsBoys, meanyrsGirls, Region) {
  this.CountryName = CountryName;
  this.meanyrsBoys = meanyrsBoys;
  this.meanyrsGirls = meanyrsGirls;
  this.Region = Region;

}
country.prototype.display = function() {

  textFont(myFont);
  textSize(28);
  noStroke();
  fill("black");
  text(this.CountryName, 120, 310 + 70 * tableRows);

  // text(Region, 300, 100+30*row);
  fill("navy");
  for (var k = 0; k < this.meanyrsBoys; k++) {
    rect(490 + 25 * k, 280 + 70 * tableRows, 15, 15, 15);
  }
  textSize(22)
  text(this.meanyrsBoys + " " , 515 + 25 * this.meanyrsBoys, 295 + 70 *tableRows);
  
// add text here for meanyrs boys showing final number th
  fill("maroon");
  for (var g = 0; g < this.meanyrsGirls; g++) {
        rect(490 + 25 * g, 300 + 70 * tableRows, 15, 15, 15);
      }
  text(this.meanyrsGirls + " " , 515 + 25 * this.meanyrsGirls, 315 + 70 *tableRows);
  // vertex(map(val, minVal, maxVal, height, 2), map(col, 3, 25, 0, width));

  stroke("black");
  strokeWeight(2);
  line(0,195,2000,195);

  stroke("black");
  strokeWeight(2);
  line(420,0,420,5000);


};

function makeHeader() {
  // ---------------------
  // TITLE - country
  fill("black");
  noStroke();
  textFont(myFontBold);
  textSize(65);
  text("COUNTRY", 110, 190);
  // TITLE - Years of Schooling
  text("YEARS OF SCHOOLING", 475, 190);
  // Years of School Labeling
  
  textFont(myFont);
  textSize(23);
  fill("black");
  text("Elementary", 490, 220);
  text("School", 490, 240);
  text("Middle", 618, 220);
  text("school", 618, 240);
  text("High", 710, 220);
  text("School", 700, 240);
  text("Post", 820, 220);
  text("Secondary", 800, 240);

}
//---------------------------

  function mouseOver() {

  var div = createDiv();
  div.id("rectangle");
  div.position(490,500, 500, 400);
}


function windowResized() {}