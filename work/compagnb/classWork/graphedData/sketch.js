// store the data in a global variable
var table;
var minVal = 100; // make higher for worse case seneerio
var maxVal = 0; // make lower for worse case and gets bumped up higher

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  textSize(10);
  noFill();
  // load the "tsv" formatted data from the undp source. 
  // the data structure is "tsv" and we have a "header" in the file
  table = loadTable("LaborInNonAgricultSector.txt", "tsv", "header", showData);
}

// call back function when table is loaded
function showData() {
  // count the rows in our table
  var count = table.getRowCount();
  // parse the data returned by loadStrings()
  var rowHeight = 30;
  
  //get min and max
  for (var row = 0; row < count; row++) {
    for (var col = 3; col < 26; col++) {
      var val = table.getString(row, col);
      val = parseFloat(val);
      
      if(minVal > val){
        minVal = val;
      } else if(maxVal < val){
        maxVal = val;
      }
    }
  }
  
  beginShape();
  // loop through all rows
  for (row = 0; row < count; row++) {
    // loop through all the columns
    // for (var col = 0; col < 26; col++) {
    for (col = 3; col < 26; col++) {
      val = table.getString(row, col);
      //make a number out of the string val
      val = parseFloat(val);
      

      // display the text on the canvas
      // text(val, col*60, 18 + row * rowHeight)
      vertex(col*60, map(val, minVal, maxVal, height-5, 5));
    }
  }
  endShape();
}