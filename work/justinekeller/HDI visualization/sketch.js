// store the data in a global variable called table
var table;
// var minVal = 10000;
// var maxVal = 0;

var x1 = 10;
var x2 = 500;

var y1 = 10;
var y2 = 500;

var variableRangeLowerBound = 0;
var variableRangeUpperBound = 1;
var data = []


  
function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  noFill();
  textSize(14);
  // load the "tsv" formatted data from the undp source. 
  // the data structure is "tsv" and we have a "header" in the file
  table = loadTable("HDI.txt", "tsv", "header", showData);
  colorMode(HSB, 360, 1.0, 1.0);
}
function draw() {
  background(255,255,255);
  strokeWeight(2);
  fill(20);
  // x axis line
  line(x1,y2,x2,y2);
  // y axis line
  line(x1,y2,x1,y1);
}

// call back function when table is loaded
function showData(tableData) {
  fill('rgba(20,0,0, 0.25)');

 for(var i = 0; i < data.length; i++) {
    var pointX = x1 + map(data[i].x, variableRangeLowerBound, variableRangeUpperBound, x1, x2);
    var pointY = y2 - map(data[i].y, variableRangeLowerBound, variableRangeUpperBound, y1, y2);
    ellipse(pointX, pointY, 10, 10);
  }
  for(var r = 0; r < tableData.getRowCount(); r++) {
    var pointX2 = x1 + map(parseFloat(tableData.getString(r, 1)), variableRangeLowerBound, variableRangeUpperBound, x1, x2);
    var pointY2 = y2 - map(parseFloat(tableData.getString(r, 2)), variableRangeLowerBound, variableRangeUpperBound, y1, y2);
    ellipse(pointX2, pointY2, 10, 10)
  }

  // // count the rows in our table
  // var count = table.getRowCount();
  // // parse the data returned by loadStrings()
  // var rowHeight = 30;
  // // loop through all rows to determine global minumum and maximum
  // for (var row = 0; row < count; row++) {
  //   // loop through all the columns
  //   for (var col = 3; col < 5; col++) {
  //     var val = table.getString(row, col);
  //     val = parseFloat(val);
  //     if (minVal > val)
  //       minVal = val;
  //     if (maxVal < val)
  //       maxVal = val;
  //   }
  // }
// console.log("minimum: " + minVal + " | maximum: " + maxVal);
// // display
// for (row = 0; row < count; row++) {
//   beginShape();
//   // loop through all the columns
//   for ( col = 3; col < 5; col++) {
//     val = table.getString(row, col);
//     // display the text on the canvas
//     val = parseFloat(val);
// }

//   }
//   endShape();
 }


