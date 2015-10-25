var table; // store the data in a global variable
var minVal = 10000; // set minimum value high
var maxVal = 0; // set maximum value low
var c = [];



function setup() {
  noLoop(); // no need for input or animation here
  noFill();
  textSize(10);
  // load the "tsv" formatted data from the undp source. 
  // the data structure is "tsv" and we have a "header" in the file
  table = loadTable("data/HDR.txt", "tsv", "header", showData);

  // colorMode(HSB, 360, 1.0, 1.0);
}


// call back function when table is loaded
function showData() {

  // count the rows in our table
  var count = table.getRowCount();
  // parse the data returned by loadStrings()
  var rowHeight = 30;
  // loop through all rows to determine global minumum and maximum
  for (row = 0; row < count; row++) {
    // loop through all the columns
    // for (var col = 0; col < 26; col++) {
    for (col = 3; col < 5; col++) {
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

    // create as many canvases as there are rows in the table 
    // p returns the canvas for one cuntry and stores in in the c array
    c[row] = function(p) {

      // call canvas-specific setup
      p.setup = function() {
        width = windowWidth - 10; // set the individual canvas width
        height = 50; // set the individual canvas height
        var r = 7; // set the radius of the markers

        var countryName = table.getString(row, 2); // get the country name from the first colum
        p.createCanvas(width, height); // create the canvas
        p.noStroke();
        if (row == 0 || row == 2 || row == 4 || row == 6 || row == 8 || row == 10 || row == 12 || row == 14 || row == 16 || row == 18 || row == 20 || row == 22 || row == 24 || row == 26 || row == 28 || row == 30 || row == 32 || row == 34 || row == 36 || row == 38 || row == 40 || row == 42 || row == 44 || row == 46 || row == 48 || row == 50 || row == 52 || row == 54 || row == 56 || row == 58 || row == 60 || row == 62) {
          p.fill(220);
        } else {
          p.fill(245);
        }
        p.rect(10, 0, width - 1, height - 1); // mark an outline so we see where the canvas borders are
        p.textStyle(BOLD);
        p.fill(0);
        p.textSize(15);
        p.text(countryName, 50, 20); // label the canvas

        p.beginShape(); // record graph begin
        // loop through all the columns

        // GDI
        for (var col = 2; col < 5; col++) {
          val = table.getString(row, col); // get the data point
          // display the text on the canvas
          val = parseFloat(val); // create a number from the string to draw with
          if (col === 4) {
            p.noStroke();
            p.fill("blue");
          } else if (col === 3) {
            p.noStroke();
            p.fill("red");
          }
          // p.strokeWeight(0);
          p.ellipse(map(val, minVal, maxVal, 50, width), height / 2, r, r); // mark values vs. no values

          p.stroke(0);
          p.strokeWeight(2);
          p.vertex(map(val, minVal, maxVal, 50, width), height / 2); // record one vertex per data point

        }
        p.endShape(); // record graph end
      // }
      
      // p.beginShape(); // record graph begin
      //   // loop through all the columns

      // for (var colb = 5; colb < 26; colb++) {
      //     valb = table.getString(row, 9); // get the data point
      //     // display the text on the canvas
      //     valb = parseFloat(valb); // create a number from the string to draw with
      //     p.fill(200);
      //     p.ellipse(map(valb, minVal, maxVal, 50, width), height/3, 2, 2); // mark values vs. no values

      //     p.stroke(0);
      //     p.strokeWeight(2);
      //     p.vertex(map(valb, minVal, maxVal,50, width), height/3); // record one vertex per data point

      //   }
      //   p.endShape(); // record graph end
      }
    };
  }
  for (row = 0; row < count; row++) {
    var myCanvas = new p5(c[row]); // launch all the individual p5 canvases for each row
  }
}