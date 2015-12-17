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
    noLoop();
  });
  console.log(sorted.length);

  for (var a = 0; a < sorted.length; a++) {
    sorted[a].display();
    tableRows++;
  noLoop();
  }


  if (mouseX >= 150 && mouseX <= 150 + 100 && mouseY >= 150 && mouseY <= 150 + 100) {
    isOverCountry = true;
  } else {
    isOverCountry = false;
  }
  print(isOverCountry);

  var isOverRectangle;
  if (mouseX >= 150 && mouseX <= 150 + 100 && mouseY >= 150 && mouseY <= 150 + 100) {
    isOverRectangle = true;
  } else {
    isOverRectangle = false;
  }

  // draw a rectangle
  rectMode(CORNER);
  stroke(0);
  strokeWeight(5);
  if (isOverRectangle == true) {
    fill(100);
    cursor(HAND);
  } else {
    fill(200);
    cursor(ARROW);
  }


}


function setup() {
  createCanvas(2000, 2000);
  background(255);
  noFill();
  
  // button = createButton('East');
  // button.class();
  // button.position(19, 200);
  // button.mousePressed(changeBG);
  // noStroke();
  // fill("Black");
  // rect(985, 420, 720, 4);
  
  // stroke("black");
  // strokeWeight(2);
  // noFill();
  // rect(987, 435, 30, 38)
  // noStroke();
  // fill("black");
  // textFont(myFontBold);
  // textSize(40);
  // text("1     2     3    4    5    6    7    8    9    10    11    12", 995, 470);
  

  
  // // load boy img
  
  // loadImage("boy.png", function(boy_) {
  //   for (var i = 0; i < 30; i++) {
  //     var years = random(12);
  //     boy = boy_;
  //     boyLoaded = true;
  //     image(boy, 1400, 295);
  //   }
  // });

  // loadImage("girl.png", function(boy_) {
  //   for (var i = 0; i < 30; i++) {
  //     var years = random(12);
  //     boy = boy_;
  //     boyLoaded = true;
  //     image(boy, 1150, 295);

  //   }
  // });


  // Years of Schooling Gradient
  // elementary school
  noStroke();
  fill(204, 204, 204);
  rect(487, 153, 150, 2000);
  // middle school
  noStroke();
  fill(230, 230, 230);
  rect(610, 153, 85, 2000);
  // high school
  noStroke();
  fill(204, 204, 204);
  rect(690, 153, 100, 2000);
  // post secondary
  noStroke();
  fill(230, 230, 230);
  rect(780, 153, 135, 2000);


  // notebook cubes 1
  strokeWeight(1);
  stroke(51, 102, 204, 60);
  for (var i = 0; i < 20000; i++) {
    line(30.5* i, 0, 30.5 * i, 5000);
  }
  // notebook cubes 2
  stroke(51, 102, 204, 60);
  for (var l = 0; l < 2000; l++) {
    line(0, 30.5 * l, windowWidth, 30.5 * l);
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
  rect(490, 160, 15, 15, 15);
  textFont(myFont);
  textSize(25);
  text("= Boys years in school", 515, 173);

  fill("maroon");
  rect(490, 183, 15, 15, 15);
  text("= Girls years in school", 515, 197);

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
  fill(255, 102, 0);
  textSize(40);
  text("CENTRAL", x + 950, y + 120, 1);

  fill(255, 204, 0, 90);
  text("EAST", x + 950, y + 520);


  fill(255, 153, 51);
  text("NORTHERN",x + 950, y + 980);

  fill(204, 0, 0);
  text("WEST", x + 950, y + 1420);


  //central
  noFill();
  stroke(255, 102, 0);
  strokeWeight(1.5);
  rect(x, y, 927, 222, 10);
  noStroke();

  noFill();
  stroke(255, 204, 0, 90);
  rect(x, y + 222, 927, 600, 10);
  noStroke();


  noFill();
  stroke(255, 153, 51);
  rect(x, y + 822,927, 300, 10);
  noStroke();

  noFill();
  stroke(204, 0, 0);
  rect(x, y + 1122, 927, 480, 10);
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
  text(this.meanyrsBoys + " ", 920, 295 + 40 * tableRows);
  // if (this.meanyrsBoys == "..") {
  //   text("No Data");
  // }

  // add text here for meanyrs boys showing final number th
  fill("maroon");
  for (var g = 0; g < this.meanyrsGirls; g++) {
    rect(490 + 25 * g, 300 + 40 * tableRows, 15, 15, 15);

  }
  text(this.meanyrsGirls + " ", 920, 315 + 40 * tableRows);
  if (isNaN.meanyrsGirls) {
    text("No Data");
  }

  //vertex(map(val, minVal, maxVal, height, 2), map(col, 3, 25, 0, width));
  //ruler lines
  stroke(166, 166, 166);
  strokeWeight(2);
  line(0, 153, 2000, 153);

  stroke(166, 166, 166);
  strokeWeight(2);
  line(427, 0, 427, 5000);


};

function makeHeader() {
  // ---------------------
  // TITLE - country
  fill("black");
  noStroke();
  textFont(myFontBold);
  textSize(65);
  text("COUNTRY", 110, 120);
  // TITLE - Years of Schooling
  text("YEARS OF SCHOOLING", 475, 120);
  // Years of School Labeling

  textFont(myFont);
  textSize(23);
  fill("black");
  textAlign(CENTER);
  textLeading(18);
  text("Elementary School", 512, 240, 80);
  text("Middle School", 613, 240, 80);
  text("High School", 700, 240, 80);
  text("Post Secondary", 810, 240, 80);
  textAlign(LEFT);

}
//---------------------------

// // function changeBG() {
// //   var val = random(255);
// //   background(val);
// // }

// function mouseOver() {

//   var div = createDiv();
//   div.id("rectangle");
//   div.position(490, 500, 500, 400);
// }


function windowResized() {}