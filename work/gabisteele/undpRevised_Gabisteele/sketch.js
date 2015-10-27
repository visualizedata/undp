// store the data in a global variable
var table;
var minVal = 10000;
var maxVal = 10000;
var isOverRectangle;
var countryPostions = [];

// var greenapple;
// var redapple;

// function preload() {
//   greenapple = loadImage("greenapple.jpg");
// }
function preload() {
  table = loadTable("educationdata.txt", "tsv", "header");
}

function setup() {
  createCanvas(2000, 5000);

}

// call back function when table is loaded
function showData() {


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255, 255, 204);
  noFill();
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
  
 // Years of Schooling Gradient
  // elementary school
  fill(255, 255, 153);
  rect(498, 193, 150, 2970);
  // middle school
  noStroke();
  fill(255, 255, 0);
  rect(643, 193, 80, 2970);
  // high school
  noStroke();
  fill(255, 255, 153);
  rect(720, 193, 130, 2970);
  // post secondary
  noStroke();
  fill(255, 255, 0);
  rect(820, 193, 130, 2970);
  
  fill("blue");
  rect(500, 40, 15, 15, 15);
  textFont("gochi hand");
  textSize("20");
  text("= Boys", 525, 53);
  
  fill("red");
  rect(500, 60, 15, 15, 15);
  text("= Girls", 525, 75)

  // Parsing out the Data
  for (row = 0; row < count; row++) {
    var meanyrsBoys;
    var meanyrsGirls;
    // show country names
    var countryName = table.getString(row, 1);
    var Region = table.getString(row, 0);

    if (isNaN(parseInt(table.getString(row, 4)))) {
      meanyrsBoys = 0;
    } else {
      meanyrsBoys = table.getNum(row, 4);
    }

    if (isNaN(parseInt(table.getString(row, 3)))) {
      meanyrsGirls = 0;
    } else {
      meanyrsGirls = table.getNum(row, 3);
    }

    beginShape();
    // loop through all the columns
    for (var col = 0; col < 5; col++) {
      val = table.getString(row, col);
      // display the text on the canvas
      val = parseFloat(val);
      // image(imgmale.png, map(val, minVal, maxVal, windowHeight, 0), map(col, 3, 25, 0, windowWidth));
      // image(imgfemale, 0, 0);
      textSize(28);
      textFont("Fjalla One");
      noStroke();
      fill("black");
      text(countryName, 123, 300 + 55 * row);


      // text(Region, 300, 100+30*row);
      fill("blue");
      for (var k = 0; k < meanyrsBoys; k++) {
        rect(500 + 25 * k, 283 + 55 * row, 15, 15, 15);
      }

      fill("red");
      for (var g = 0; g < meanyrsGirls; g++) {
        rect(500 + 25 * g, 210 + 55 * row, 15, 15, 15);
      }

      // vertex(map(val, minVal, maxVal, height, 2), map(col, 3, 25, 0, width));
    }
    endShape();
  }
  // Region Title -- CENTRAL
  fill("lime");
  noStroke();
  push();
  translate(100, 590);
  rotate(PI * 1.5);
  textSize(70);
  textFont("Fjalla One");
  text("CENTRAL", 0, 0);
  pop();
  // CENTRAL underline
  stroke("lime");
  strokeWeight(9);
  line(110, 260, 110, 680);
    // Region Title -- EAST
  fill(255, 153, 0);
  noStroke();
  push();
  translate(100, 1358);
  rotate(PI * 1.5);
  textSize(70);
  text("EAST", 0, 0);
  pop();
  // EAST underline
  stroke(255, 153, 0);
  strokeWeight(9);
  line(110, 700, 110, 1720);
    // Region Title -- NORTHERN
  fill("lime");
  noStroke();
  push();
  translate(100, 2020);
  rotate(PI * 1.5);
  textSize(70);
  text("NORTHERN", 0, 0);
  pop();
  // EAST underline
  stroke("lime");
  strokeWeight(9);
  line(110, 1740, 110, 2010);
      // Region Title -- SOUTHERN
  fill(255, 153, 0);
  noStroke();
  push();
  translate(100, 2310);
  rotate(PI * 1.5);
  textSize(70);
  text("SOUTHERN", 0, 0);
  pop();
  // SOUTH underline
  stroke(255, 153, 0);
  strokeWeight(9);
  line(110, 2020, 110, 2330);
       // Region Title -- WEST
  fill("lime");
  noStroke();
  push();
  translate(100, 2900);
  rotate(PI * 1.5);
  textSize(70);
  text("WEST", 0, 0);
  pop();
  // west underline
  stroke("lime");
  strokeWeight(9);
  line(110, 2345, 110, 3170);



  // TITLE - Regions
  fill("red");
  noStroke();
  textSize(25);
  push();
  translate(30, 210);
  rotate(PI * 1.9);
  textFont("Gochi Hand");
  text("Regions", 0, 0);
  pop();
  
// ---------------------
  // TITLE - country
  fill("black");
  noStroke();
  textSize(45);
  textFont("Gochi Hand");
  text("COUNTRY", 121, 190);
  // TITLE - Years of Schooling
  text("YEARS OF SCHOOLING", 495, 190);
  // Years of School Labeling
  
  textSize(25);
  fill("black");
  text("Elementary", 507, 220);
  text("School", 507, 240);
  text("Middle", 645, 220);
  text("school", 645, 240);
  text("High", 740, 220);
  text("School", 735, 240);
  text("Post", 830, 220);
  text("Secondary", 830, 240);  
  

  // stroke("yellow");
  // strokeWeight(5);
  // line(480, 185, 550, 185);

//---------------------
  //lined page -- red lines
  strokeWeight(1)
  stroke("red");
  line(120, 10000, 120, 0);
  // lined page --- blue lines
  stroke("blue");
  for (var i = 3.5; i < 10000; i++) {
    line(0, 55 * i, windowWidth, 55 * i);
  }
//---------------------------

}