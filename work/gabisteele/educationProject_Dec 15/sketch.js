var table;
var minVal = 10000;
var maxVal = 10000;
var isOverRectangle;
var tableRows = 0;
var countryPostions = [];
var countryObjectArray = [];
var boy;
var myFont;
var myFontBold;
var boyLoaded = false;
var isOverCountry;

// positions
var startX = 300;

var eButton;

var isOverCountry;


var sorted = [];

function preload() {
  table = loadTable("educationdata.txt", "tsv", "header");
  myFont = loadFont('CabinSketch-Regular.otf');
  myFontBold = loadFont('CabinSketch-Bold.otf');
  boy = loadImage("boy.png");
}

function draw() {

  sorted = countryObjectArray.sort(function(a, b) {
    if (a.Region > b.Region) {
      return 1;
    }
    if (a.Region < b.Region) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  console.log(sorted.length);

  for (var a = 0; a < sorted.length; a++) {
    sorted[a].display();
    tableRows++;
  }
  noLoop();


  // if (mouseX >= 150 && mouseX <= 150 + 100 && mouseY >= 150 && mouseY <= 150 + 100) {
  //   isOverCountry = true;
  // } else {
  //   isOverCountry = false;
  // }


}


function setup() {
  createCanvas(2000, 2000);
  background(255);
  noFill();



  // noFill();
  // stroke(255, 102, 0);
  // stroke(0, 0, 0);
  // bezier(85, 20, 10, 10, 90, 90, 15, 85);

  // button = createButton('East');
  // button.class();
  // button.position(19, 200);
  // button.mousePressed(changeBG);

  // load boy img
  // loadImage("boy.png", function(boy_) {
  //   for (var i = 0; i < 30; i++) {
  //     var years = random(12);
  //     boy = boy_;
  //     boyLoaded = true;
  //     image(boy, i*50,  0, 100, years * 20);
  //   }
  // });


  // Years of Schooling Gradient
  // elementary school
  noStroke();
  fill(204, 204, 204);
  rect(480, 194, 150, 2000);
  // middle school
  noStroke();
  fill(230, 230, 230);
  rect(610, 194, 85, 2000);
  // high school
  noStroke();
  fill(204, 204, 204);
  rect(690, 194, 100, 2000);
  // post secondary
  noStroke();
  fill(230, 230, 230);
  rect(780, 194, 130, 2000);


  // notebook cubes 1
  strokeWeight(1);
  stroke(51, 102, 204, 60);
  for (var i = 0; i < 10000; i++) {
    line(30 * i, 0, 30 * i, 5000);
  }
  // notebook cubes 2
  stroke(51, 102, 204, 60);
  for (var l = 0; l < 50000; l++) {
    line(0, 30 * l, windowWidth, 30 * l);
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
  rect(490, 18, 15, 15, 15);
  textFont(myFont);
  textSize(25);
  text("= Boys", 515, 33);

  fill("maroon");
  rect(490, 46, 15, 15, 15);
  text("= Girls", 515, 60);

  // Parsing out the Data
  for (row = 0; row < count; row++) {
    var meanyrsBoys;
    var meanyrsGirls;
    // show country names
    var countryName = table.getString(row, 1);
    var Region = table.getString(row, 0);
    console.log(parseInt(table.getString(row, 4)));
    if (isNaN(parseInt(table.getString(row, 4)))) {
      meanyrsBoys = "No Data";
    } else {
      meanyrsBoys = table.getNum(row, 4);
    }

    if (isNaN(parseInt(table.getString(row, 3)))) {
      meanyrsGirls = "No Data";
    } else {
      meanyrsGirls = table.getNum(row, 3);

    }
    countryObjectArray.push(new country(countryName, meanyrsBoys, meanyrsGirls, Region));

  }
  makeHeader();



}

function country(CountryName, meanyrsBoys, meanyrsGirls, Region) {
  this.CountryName = CountryName;
  this.meanyrsBoys = meanyrsBoys;
  this.meanyrsGirls = meanyrsGirls;
  this.Region = Region;

}
country.prototype.display = function() {

  var x = 110;
  var y = 275;
  
  noStroke();
  fill(255, 255, 0);
  textSize(28);
  text("CENTRAL", x - 105, y + 120, 1);

  fill(255, 204, 0, 90);
  textSize(40);
  text("EAST", x - 100, y + 520);
  
  
  fill(255, 153, 51);
  textSize(20);
  text("NORTHERN", x - 104, y + 980);
  
   fill(204, 0, 0);
  textSize(38);
  text("WEST", x - 100, y + 1420);
  


  noFill();
  stroke(255, 255, 0, 90);
  strokeWeight(3);
  rect(x, y, 800, 222, 10);
  noStroke();

  noFill();
  stroke(255, 204, 0, 90);
  strokeWeight(3);
  rect(x, y + 222, 800, 600, 10);
  noStroke();

  noFill();
  stroke(255, 153, 51);
  strokeWeight(3);
  rect(x, y + 822, 800, 300, 10);
  noStroke();

  noFill();
  stroke(204, 0, 0);
  strokeWeight(3);
  rect(x, y + 1122, 800, 480, 10);
  noStroke();


  // this.distance = dist(mouseX, mouseY, 120, 310 + 30 * tableRows);
  // //print(distance);
  // if (this.distance < 100) {
  //   noFill();
  //   stroke("yellow");
  //   strokeWeight(3);
  //   rect(110, mouseY, 700, 40);
  //   noStroke();
  //   //isOverCountry = true;
  // }
  //   else {
  // // isOverCountry = false;
  //   }



  textFont(myFont);
  textSize(28);
  noStroke();
  fill("black");
  text(this.CountryName, 120, 310 + 30 * tableRows);

  // if (isOverCountry == true) {
  //   print("isOverCountry");
  //   // fill(0);
  //   // rect(120, 310 + 30 * tableRow, 100, 10);
  // }
  // text(Region, 300, 100+30*row);
  fill("navy");
  for (var k = 0; k < this.meanyrsBoys; k++) {
    rect(490 + 25 * k, 280 + 40 * tableRows, 15, 15, 15);
    // if (boyLoaded === true) {
    // image(boy, 490 + 25 * k, 70 * tableRows, 100, 100);
    // }
  }

  textSize(22)
  textFont(myFontBold);
  text(this.meanyrsBoys + " ", 430, 295 + 40 * tableRows);
  if (this.meanyrsBoys == "..") {
    text("No Data");
  }

  // add text here for meanyrs boys showing final number th
  fill("maroon");
  for (var g = 0; g < this.meanyrsGirls; g++) {
    rect(490 + 25 * g, 300 + 40 * tableRows, 15, 15, 15);
    noLoop();

  }
  text(this.meanyrsGirls + " ", 430, 315 + 40 * tableRows);
  if (isNaN.meanyrsGirls) {
    text("No Data");
  }


  //vertex(map(val, minVal, maxVal, height, 2), map(col, 3, 25, 0, width));
  //ruler lines
  stroke(166, 166, 166);
  strokeWeight(2);
  line(0, 195, 2000, 195);

  stroke(166, 166, 166);
  strokeWeight(2);
  line(420, 0, 420, 5000);


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
  textAlign(CENTER);
  textLeading(18);
  text("Elementary School", 505, 220, 80);
  text("Middle School", 613, 220, 80);
  text("High School", 700, 220, 80);
  text("Post Secondary", 810, 220, 80);
  textAlign(LEFT);

}
//---------------------------

// function changeBG() {
//   var val = random(255);
//   background(val);
// }

function mouseOver() {

  var div = createDiv();
  div.id("rectangle");
  div.position(490, 500, 500, 400);
}


function windowResized() {}