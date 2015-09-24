//store the data
var table;
var rangeLow = 0;
var rangeHigh = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  noFill();
  strokeWeight(2);
  textSize(5);
  //load data into string array
  table = loadTable("GDI.txt", "tsv", "header", showData);
}

//call back function when table is loaded
function showData() {
  //count the rows in our table
  background(85);
  strokeWeight(0.1);
  stroke(255);

//scale circles 
  for (var d = 0; d <= 1; d = d + 0.1) {
    ellipse(windowWidth / 2, windowHeight / 2, windowHeight * d, windowHeight * d);
  }

  stroke(85);

  var count = table.getRowCount();
  var rowHeight = 20;
  var j = 2 * PI / count;
  for (var r = 0; r < count; r++) {

    // loop through all the columns
    // var country = table.getString(r, 2);
    var valf = table.getString(r, 3);
    var valm = table.getString(r, 4);
    // display the text on the canvas

    valf = parseFloat(valf);
    valm = parseFloat(valm);



    var femaleRadius = map(valf, rangeLow, rangeHigh, 0, windowHeight);
    var maleRadius = map(valm, rangeLow, rangeHigh, 0, windowHeight);
    // var top = map(1, rangeLow, rangeHigh, 0, windowHeight);
    
    fill(85, 85, 85, 100);
    strokeWeight(3);
    arc(windowWidth / 2, windowHeight / 2,  windowHeight + 20,  windowHeight + 20, r * j, r * j + j, PIE);
    noFill();
    // noStroke();
    strokeWeight(0.1);


    //male bars
    fill(159, 33, 49);
    arc(windowWidth / 2, windowHeight / 2, maleRadius, maleRadius, r * j, r * j + j, PIE);
    noFill();

    
    //female bars
    fill(200);
    arc(windowWidth / 2, windowHeight / 2, femaleRadius, femaleRadius, r * j, r * j + j, PIE);
    noFill();
    // noStroke();
    // strokeWeight(0.1);

    //inner circle 
    fill(85);
    ellipse(windowWidth / 2, windowHeight / 2, windowHeight * 0.15, windowHeight * 0.15);
    noFill();
    fill(255);
    // text("hi", windowWidth / 2 - 9, windowHeight / 2);
    
    // text(country, windowWidth, windowHeight);
  }

    
}