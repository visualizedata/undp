// Major Studio
// 20150915
// Parsing String Data

var table;

function preLoad(){
  // load something and continue on only when finished
}

function setup() {
  
  // create a canvas full screen
  createCanvas(windowWidth, windowHeight);
  
  // hold don't draw at 60 frames a second
  noLoop();
  
  // load data into an string array
  table = loadTable("data/undp.tsv", "tsv", "header", showData);
  
}

function draw() {
  
}

// call back to return a variable of data
function showData(data){
  
  // // count the columns
  // print(table.getRowCount() + " total rows in table");
  // print(table.getColumnCount() + " total columns in table");
  
var count = table.getRowCount();
  var rowHeight = height / count;

  // iterate through the data and display it on screen 
  for (var i = 0; i < count; i++) {
    // display txt - start px , spacing, width , height 
    // text(data[i], 50, 50+i*10, 800, 800);
    // text(data[i], 50, 50+i*20);
    var amount = table.getString(i, 0);
    var unit = table.getString(i, 1);
    var item = table.getString(i, 2);
    var source = table.getString(i, 3);
 //textAlign(CENTER);
    // row height calculated by dividing the amount of rows by the window height
    text(amount + " " + unit + " " + item + " " + source, width / 2, 30 + i * rowHeight);
  }
}