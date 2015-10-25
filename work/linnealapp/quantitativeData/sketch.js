var table; // store the data in a global variable
var minVal = 100;
var maxVal = 0;

function setup() {
  noLoop(); // no need for input or animation here
  table = loadTable("Institutions.txt", "tsv", "header", showData);
  createCanvas(windowWidth, 1360);
  background('#1E2126');
}

// call back function when table is loaded
function showData() {
  textSize(14);
  textStyle(BOLD);
  textFont('DinPro');
  fill(255);
  text('Frequency of legislations that promote equality of economic participation in African countries', 20, 33);
  stroke(255);
  line(20, 45, windowWidth - 30, 45);
  
  // count the rows in our table
  var count = table.getRowCount();

  for (var row = 0; row < count; row++) {
    
    // loop through the yes/no columns 
    var freqRow = [];
    for (col = 2; col < 28; col++) {
      var val = table.getString(row, col);
      if (val === 'Yes') {
        freqRow.push('Yes');
      }
      // console.log(freqRow.length);
      noStroke();
      if (freqRow.length <= 15) {
        fill('#D6B905');
      } else if (freqRow.length <= 18) {
        fill('#9FD91C');
      } else if (freqRow.length <= 21) {
        fill('#41DBC4');
      } else if (freqRow.length <= 24) {
        fill('#2892AD');
      } else {
        fill('#252F36');
      }
      rect(20, 63 + 30 * row, windowWidth - 50, 25);
    }
  
    for (col = 0; col < 1; col++) {
      var countryName = table.getString(row, col);
      // display the text on the canvas
      textAlign(LEFT);
      textSize(14);
      textStyle(NORMAL);
      fill(255);
      text(countryName, (windowWidth/8) + 100 * col, 80 + 30 * row);

    }
    for (col = 1; col < 2; col++) {
      var regions = table.getString(row, col);
      // display the text on the canvas
      textSize(9);
      fill(255);
      text(regions, (windowWidth/6) + 100 * col, 80 + 30 * row);

    }
    textAlign(RIGHT);
    textSize(10);
    text(freqRow.length + '/26', windowWidth/2 + 100 * col, 80 + 30 * row);
  }
  stroke(255);
  line(20, 1270, windowWidth - 30, 1270);
  textSize(9);
  fill(255);
  noStroke();
  textStyle(NORMAL);
  textAlign(LEFT);
  text('lower equality within legislation', 20, 1310);
  textAlign(RIGHT);
  text('higher equality within legislation', windowWidth-30, 1310);
  
  fill('#D6B905');
  rect(20, 1320, windowWidth/5 - 5, 15);
  fill('#9FD91C');
  rect(windowWidth/5 + 20, 1320, windowWidth/5 - 5, 15);
  fill('#41DBC4');
  rect((windowWidth/5)*2 + 20, 1320, windowWidth/5 - 5, 15);
  fill('#2892AD');
  rect((windowWidth/5)*3 + 20, 1320, windowWidth/5 - 5, 15);
  fill('#252F36');
  rect((windowWidth/5)*4 + 20, 1320, windowWidth/5 - 5, 15);
  
}