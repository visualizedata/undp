var table;
var minVal = 1000;
var maxVal = 1000;
var col;
var countryObjectArray;

var FGM = [];
var countries = [];



function preload() {
  table = loadTable("womenData.txt", "tsv");
}


function setup() {
  createCanvas(10000, 1000);
  background(38, 38, 38);
  textFont("Gotham");
  textSize(12);

  // wife beating percents toggle
  rect(100, 80, 500, 4);
  textSize(16);
  fill(255);
  text("Percentage of people who think it is justified for husbands to beat their wifes if she:", 100, 50, 400); 
  
  text("Burns the food", 125, 115);
  text("Argues with her husband ", 125, 145);
  text("Goes out without telling him", 125, 175);
  text("Neglects the children", 125, 205);
 text("Refuses to have sex with him", 125, 235);
  text("At least one of the above", 125, 265);
  
  noFill();
  strokeWeight(2);
  stroke(255);
  ellipse(110, 110, 12, 12);
  ellipse(110, 140, 12, 12);
  fill(255);
  ellipse(110, 170, 12, 12);
  noFill();
  ellipse(110, 200, 12, 12);
  ellipse(110, 230, 12, 12);
  ellipse(110, 260, 12, 12);
  
  
  //bottom bar chart lines
  noStroke();
  fill(255);
  rect(100, 750, 2300, 5);
  rect(100, 350, 2300, 5);

  noStroke;
  // count the rows in table 
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

  // Parsing out the Data
  for (row = 2; row < count; row++) {
    var FGM;

    // show country names
    var countryName = table.getString(row, 0);
    var FGM = table.getString(row, 2);
    var womanBurns = table.getString(row, 9);
    var manBurns = table.getString(row, 15);
    var womanArgues = table.getString(row, 10);
    var manArgues = table.getString(row, 16);
    var womanOut = table.getString(row, 11);
    var manOut = table.getString(row, 17);
    var womanNeg = table.getString(row, 12);
    var manNeg = table.getString(row, 18);
    var womanSex = table.getString(row, 13);
    var manSex = table.getString(row,19);
    var womanAll = table.getString(row, 14);
    var manAll = table.getString(row, 20);

    // Country Name list
    fill(255);
    text(countryName, 100 * row - 100, 800, 20);
    
    // FGM bars
    noStroke();
    fill(89, 89, 89);
    rect(100 * row - 100, 750, 50, -parseFloat(FGM)*4);
    
    //Burns Food Data 
    fill(255, 0, 102);
    rect(100 * row - 80, 750, 4, -parseFloat(womanBurns)*4);
    fill(166, 166, 166);
    rect(100 * row - 90, 750, 4, -parseFloat(manBurns)*4);
    
    // // Argues with Husband Data
    // fill(255, 0, 102);
    // rect(100 * row - 80, 750, 4, -parseFloat(womanArgues)*4);
    
    // fill(166, 166, 166);
    // rect(100 * row - 90, 750, 4, -parseFloat(manArgues)*4);
    
    
    
    
}


}

function draw() {

}