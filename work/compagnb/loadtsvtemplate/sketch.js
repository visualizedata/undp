// Major Studio
// 20150903
// Parsing String Data

var table;

function preLoad() {
  // load something and continue on only when finished
}

function setup() {

  // create a canvas full screen
  createCanvas(windowWidth, windowHeight);

  // hold don't draw at 60 frames a second
  noLoop();
  
  textSize(10);

  // load data into an string array
  table = loadTable("data/undp.txt", "tsv", showData);

}

function draw() {

}


// call back function when table is loaded
function showData() {
  // count the rows in our table
  var count = table.getRowCount();
  // parse the data returned by loadStrings()
  var rowHeight = 30;
  // loop through all rows
  for (var row = 0; row < count; row++) {
    // loop through all the columns
    for (var col = 0; col < 26; col++) {
      var val = table.getString(row, col);
      // display the text on the canvas
      text(val, col*60, 18 + row * rowHeight);
    }
  }
}