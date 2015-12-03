// store the data in a global variable
var table;
var minVal = 10000; // make higher for worse case senerio
var maxVal = 0; // make lower for worse case and gets bumped up higher
var c = [];

function setup() {
  noLoop();
  noFill();
  textSize(10);
  
  
  // my table is tab separated value "tsv" and has a header specifying the columns labels
  // table = loadTable("data/poverty.txt", "tsv", "header");
  // table = loadTable("data/poverty.txt", "tsv", "header", showData);
  table = loadTable("data/HDR2014.txt", "tsv", "header", showData);
  
  createCanvas(windowWidth, windowHeight);
  
}

// call back function when table is loaded
function showData() {
  
  // // for testing --> making sure table is being read correctly
  // //  count the rows
  // print(table.getRowCount() + " total rows in table");
  // //  count the columns
  // print(table.getColumnCount() + " total columns in table");
  // //  print contents of column named Country Name
  // print(table.getColumn("Country Name"));
  
  // // for testing --> cycle through the table
  // for (var r = 0; r < table.getRowCount(); r++)
  //   for (var c = 0; c < table.getColumnCount(); c++) {
  //     print(table.getString(r, c));
  //   }
  
  // count the rows in our table
  var count = table.getRowCount();
  
  // parse the data returned by loadStrings()
  var rowHeight = 30;
  
  //get min and max
  for (var row = 7; row < count; row++) {
    for (var col = 3; col < 5; col++) {
      var val = table.getString(row, col);
      val = float(val);
      
      if(minVal > val){
        minVal = val;
      } else if(maxVal < val){
        maxVal = val;
      }
    }
  }
  
  console.log("minimum: " + minVal + " | maximum: " + maxVal);
  console.log("parse float: " + parseFloat(val));
  
  beginShape(LINES);
  // loop through all rows
  for (row = 7; row < count; row++) {
    // loop through all the columns
    // for (var col = 0; col < 26; col++) {
    for (col = 3; col < 5; col++) {
      val = table.getString(row, col);
      //make a number out of the string val
      val = parseFloat(val);
      noStroke();
      textSize(20);
      fill(200, 20, 100);
      // display the text on the canvas
      text(val, col*60, 8 + row * rowHeight)
      
      fill(100, 20, 200);
      noStroke();
      // ellipse(col*60, map(val, minVal, maxVal, width, 0), 15, 15);  // mark values vs. no values
      
      noFill();
      stroke(200, 20, 100);
      strokeWeight(4);
      // vertex(col*60, map(val, minVal, maxVal, height-10, 10));
      vertex(col*100, map(val, minVal, maxVal, height-10, 0)); // record one vertex per data point
      
      
      
    }
  }
  endShape();
}