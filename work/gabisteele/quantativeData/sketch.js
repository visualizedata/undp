// store the data in a global variable
var table;
var minVal = 10000;
var maxVal = 10000;
var imgmale;
var imgfemale;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  noFill();
  textSize(10);
  // imgmale = loadImage("imgmale.png");
  // imgfemale = loadImage("imgfemale.png");

  // load the "tsv" formatted data from the undp source. 
  // the data structure is "tsv" and we have a "header" in the file
  table = loadTable("educationdata.txt", "tsv", "header", showData);
  colorMode(HSB, 360, 1.0, 1.0);
}

// call back function when table is loaded
function showData() {
  // var width = 400;
  // var height = 600;
  

  
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
  console.log("minimum: " + minVal + " | maximum: " + maxVal);
  // display
  for (row = 0; row < count; row++) {
    // show country names
    var countryName = table.getString(row, 2);
    beginShape();
    // loop through all the columns
    for (var col = 2; col < 5; col++) {
      val = table.getString(row, col);
      // display the text on the canvas
      val = parseFloat(val);
    // image(imgmale.png, map(val, minVal, maxVal, windowHeight, 0), map(col, 3, 25, 0, windowWidth));
    // image(imgfemale, 0, 0);
    textSize(20)
    text(countryName, 20, 20*row);
    stroke(200);
    strokeWeight(1);
    vertex(map(val, minVal, maxVal, height, 2), map(col, 3, 25, 0, width));
    }
    endShape();
  }
}