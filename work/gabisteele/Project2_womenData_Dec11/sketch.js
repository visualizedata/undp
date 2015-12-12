var table;
var minVal = 1000;
var maxVal = 1000;
var col;
var countryObjectArray;

//Positions
var barY = 850;
var fobX = 80 * row + 123;

var isOverBurn = false;
var isOverArgues = false;
var isOverOut = false;
var isOverNeg = false;
var isOverSex = false;
var isOverAll = false;
var isOverCont = false;
var isOverDis = false;
var isOverNoData = false;

var countryName = [];
var FGM = [];
var dataYr = [];
var womanBurns = [];
var manBurns = [];
var womanArgues = [];
var manArgues = [];
var womanOut = [];
var manOut = [];
var womanNeg = [];
var manNeg = [];
var womanSex = [];
var manSex = [];
var womanAll = [];
var manAll = [];
var womanCont = [];
var manCont = [];
var womanDis = [];
var manDis = [];


var row;
var count = 0;

//FGM Rectangles
var y = [];
var easing = 0.02;
var targetY = [88.7, 74.3, 27.1, 97.0, 1.4, 14.6, 1.4, 24.2, 44.2, 91.1, 88.0, 7.3, 75.8, 38.2, 76.3, 3.8, 96.9, 49.8, 49.8, 91.4, 69.4, 24.8];

var rectH = [88.7, 74.3, 27.1, 97.0, 1.4, 14.6, 1.4, 24.2, 44.2, 91.1, 88.0, 7.3, 75.8, 38.2, 76.3, 3.8, 96.9, 49.8, 49.8, 91.4, 69.4, 24.8];

//Key
var y1 = 0;
var y2 = 0;
var y3 = 0;
var easingKey = 0.02;
var targetY1 = 95;
var targetY2 = 50;
var targetY3 = 50;


function preload() {
  table = loadTable("womenData.txt", "tsv");
}


function setup() {
  createCanvas(10000, 1000);
  textFont("Gotham");
  textSize(12);
  count = table.getRowCount();
  for (row = 0; row < count; row++) {
    y[row] = 1;


  }

}

function draw() {
  // wife beating percents toggle
  background(38, 38, 38);
  rect(100, 80, 500, 4);
  textSize(16);
  fill(255);
  text("Percentage of people who think it is justified for husbands to beat their wifes if she:", 100, 50, 400);


  //Key
  var dy = targetY1 - y1;
  y1 += dy * easingKey;
  fill(89, 89, 89);
  noStroke();
  rect(1270, 170, 35, -y1);
  
  fill(255);
  text("Percentage of Women aged 15 - 49 who have undergone Female Genital Mutilation", 1320, 150, 360);

  var dy = targetY2 - y2;
  y2 += dy * easingKey;
  fill(255, 0, 102);
  rect(1305, 240, 4, -y2);
  fill(255);
  text("Women's Opinions", 1320, 240);
  
  var dy = targetY3 - y3;
  y3 += dy * easingKey;
  fill(166, 166, 166);
  rect(1305, 310, 4, -y3);
  fill(255);
  text("Men's Opinions", 1320, 310);
  
  fill(255);
  text("Burns the food", 125, 115);
  text("Argues with her husband ", 125, 145);
  text("Goes out without telling him", 125, 175);
  text("Neglects the children", 125, 205);
  text("Refuses to have sex with him", 125, 235);
  text("At least one of the above", 125, 265);


  noFill();
  strokeWeight(2);
  stroke(255);
  ellipse(110, 110, 12, 12); // burns
  ellipse(110, 140, 12, 12); // argues
  ellipse(110, 170, 12, 12); // goes out
  ellipse(110, 200, 12, 12); // neglects
  ellipse(110, 230, 12, 12); // no sex
  ellipse(110, 260, 12, 12); // all

  // FGM toggle
  strokeWeight(0);
  noStroke();
  fill(255);
  rect(700, 80, 500, 4);
  textSize(16);
  text("Percentage of people who think it female genital mutilation should be:", 700, 50, 400);

  text("Continued", 725, 115);
  text("Discontinued ", 725, 145);
  text("No data/Unsure", 725, 175);

  noFill();
  strokeWeight(2);
  stroke(255);
  ellipse(710, 110, 12, 12); // cont
  ellipse(710, 140, 12, 12); // dis
  ellipse(710, 170, 12, 12); // no data




  //bottom bar chart lines
  noStroke();
  fill(255);
  rect(100, 850, 1730, 5);
  rect(100, 420, 1730, 5);
  text("0%", 60, 859);
  text("100%", 46, 428);

  noStroke;
  // count the rows in table 

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
  for (row = 0; row < count; row++) {
    // show country names
    countryName = table.getString(row, 0);
    FGM = table.getString(row, 2);
    dataYrs = table.getString(row, 1);
    womanBurns = table.getString(row, 9);
    manBurns = table.getString(row, 15);
    womanArgues = table.getString(row, 10);
    manArgues = table.getString(row, 16);
    womanOut = table.getString(row, 11);
    manOut = table.getString(row, 17);
    womanNeg = table.getString(row, 12);
    manNeg = table.getString(row, 18);
    womanSex = table.getString(row, 13);
    manSex = table.getString(row, 19);
    womanAll = table.getString(row, 14);
    manAll = table.getString(row, 20);
    womanCont = table.getString(row, 3);
    manCont = table.getString(row, 6);
    womanDis = table.getString(row, 4);
    manDis = table.getString(row, 7);
    womanNoData = table.getString(row, 5);
    manNoData = table.getString(row, 6);

    // targetY = FGM #;

    // Country Name list
    fill(255);
    textAlign(CENTER);
    text(countryName, 80 * row + 120, barY + 50, 10);

    // FGM bars
    noStroke();
    fill(89, 89, 89);
    var dy = targetY[row] - y[row]; // Eritrea
    y[row] += dy * easing;
    // print(y[row]);
    rect(80 * row + 100, barY, 50, -y[row] * 4);
    //years
    fill("grey");
    text( dataYrs, 80 * row + 120, barY + 25);
    textAlign(LEFT);
    
    // percentages
    fill("grey");
    text(FGM + "%", 80 * row + 100, barY - 400);
    
    


    //Burns Food Data
    if (isOverBurn) {
      fill(255, 0, 102);
      rect(80 * row + 123, barY, 4, -parseFloat(womanBurns) * 4);
      fill(166, 166, 166);
      rect(80 * row + 133, barY, 4, -parseFloat(manBurns) * 4);
      fill(255);
      ellipse(110, 110, 12, 12);
    }

    // Argues with Husband Data
    if (isOverArgues) {
      fill(255, 0, 102);
      rect(80 * row + 123, barY, 4, -parseFloat(womanArgues) * 4);
      fill(166, 166, 166);
      rect(80 * row + 133, barY, 4, -parseFloat(manArgues) * 4);
      fill(255);
      ellipse(110, 140, 12, 12);
    }

    // Woman Goes out w/out telling
    if (isOverOut) {
      fill(255, 0, 102);
      rect(80 * row + 123, barY, 4, -parseFloat(womanOut) * 4);
      fill(166, 166, 166);
      rect(80 * row + 133, barY, 4, -parseFloat(manOut) * 4);
      fill(255);
      ellipse(110, 170, 12, 12);
    }

    // Woman Neglects the Children
    if (isOverNeg) {
      fill(255, 0, 102);
      rect(80 * row + 123, barY, 4, -parseFloat(womanNeg) * 4);
      fill(166, 166, 166);
      rect(80 * row + 133, barY, 4, -parseFloat(manNeg) * 4);
      fill(255);
      ellipse(110, 200, 12, 12);
    }

    // Woman Refuses to Have Sex
    if (isOverSex) {
      fill(255, 0, 102);
      rect(80 * row + 123, barY, 4, -parseFloat(womanSex) * 4);
      fill(166, 166, 166);
      rect(80 * row + 133, barY, 4, -parseFloat(manSex) * 4);
      fill(255);
      ellipse(110, 230, 12, 12);
    }

    //All or one of the above
    if (isOverAll) {
      fill(255, 0, 102);
      rect(80 * row + 123, barY, 4, -parseFloat(womanAll) * 4);
      fill(166, 166, 166);
      rect(80 * row + 133, barY, 4, -parseFloat(manAll) * 4);
      fill(255);
      ellipse(110, 260, 12, 12);
    }

    //FGM Continued
    if (isOverCont) {
      fill(255, 0, 102);
      rect(80 * row + 123, barY, 4, -parseFloat(womanCont) * 4);
      fill(166, 166, 166);
      rect(80 * row + 133, barY, 4, -parseFloat(manCont) * 4);
      fill(255);
      ellipse(710, 110, 12, 12); // cont
    }

    // FGM Discontinued
    if (isOverDis) {
      fill(255, 0, 102);
      rect(80 * row + 123, barY, 4, -parseFloat(womanDis) * 4);
      fill(166, 166, 166);
      rect(80 * row + 133, barY, 4, -parseFloat(manDis) * 4);
      fill(255);
      ellipse(710, 140, 12, 12); // cont
    }

    if (isOverNoData) {
      fill(255, 0, 102);
      rect(80 * row + 123, barY, 4, -parseFloat(womanNoData) * 4);
      fill(166, 166, 166);
      rect(80 * row + 133, barY, 4, -parseFloat(manNoData) * 4);
      fill(255);
      ellipse(710, 170, 12, 12); // cont
    }
  }


}

function isOver() {

  var distance = dist(mouseX, mouseY, 110, 110);
  if (distance < 150 && abs(mouseY - 110) < 10) {
    isOverBurn = true;
  } else {
    isOverBurn = false;
  }

  var distance = dist(mouseX, mouseY, 110, 140);
  if (distance < 210 && abs(mouseY - 140) < 10) {
    isOverArgues = true;
  } else {
    isOverArgues = false;
  }

  var distance = dist(mouseX, mouseY, 110, 170);
  if (distance < 250 && abs(mouseY - 170) < 10) {
    isOverOut = true;
  } else {
    isOverOut = false;
  }

  var distance = dist(mouseX, mouseY, 110, 200);
  if (distance < 150 && abs(mouseY - 200) < 10) {
    isOverNeg = true;
  } else {
    isOverNeg = false;
  }

  var distance = dist(mouseX, mouseY, 110, 230);
  if (distance < 250 && abs(mouseY - 230) < 10) {
    isOverSex = true;
  } else {
    isOverSex = false;
  }

  var distance = dist(mouseX, mouseY, 110, 260);
  if (distance < 250 && abs(mouseY - 260) < 10) {
    isOverAll = true;
  } else {
    isOverAll = false;
  }

  var distance = dist(mouseX, mouseY, 710, 110);
  if (distance < 150 && abs(mouseY - 110) < 10) {
    isOverCont = true;
  } else {
    isOverCont = false;
  }

  var distance = dist(mouseX, mouseY, 710, 140);
  if (distance < 150 && abs(mouseY - 140) < 10) {
    isOverDis = true;
  } else {
    isOverDis = false;
  }

  var distance = dist(mouseX, mouseY, 710, 170);
  if (distance < 150 && abs(mouseY - 170) < 10) {
    isOverNoData = true;
  } else {
    isOverNoData = false;
  }

}

function mousePressed() {
  isOver();
  if (isOverBurn == true) {
    reset();
    isOverBurn = true;
  }

  if (isOverArgues == true) {
    reset();
    isOverArgues = true;
    fill(255);
    ellipse(110, 140, 12, 12)
  }

  if (isOverOut == true) {
    reset();
    isOverOut = true;
    fill(255);
    ellipse(110, 170, 12, 12);
  }

  if (isOverNeg == true) {
    reset();
    isOverNeg = true;
    fill(255);
    ellipse(110, 200, 12, 12);
  }

  if (isOverSex == true) {
    reset();
    isOverSex = true;
    fill(255);
    ellipse(110, 230, 12, 12);
  }

  if (isOverAll == true) {
    reset();
    isOverAll = true;
    fill(255);
    ellipse(110, 260, 12, 12);
  }

  if (isOverCont == true) {
    reset();
    isOverCont = true;
    fill(255);
    ellipse(710, 110, 12, 12); // cont
  }

  if (isOverDis == true) {
    reset();
    isOverDis = true;
    fill(255);
    ellipse(710, 140, 12, 12);
  }

  if (isOverNoData == true) {
    reset();
    isOverNoData = true;
    fill(255);
    ellipse(710, 170, 12, 12);
  }
}


function reset() {
  background(38, 38, 38);
  isOverBurn = false;
  isOverArgues = false;
  isOverOut = false;
  isOverNeg = false;
  isOverSex = false;
  isOverAll = false;
  isOverCont = false;
  isOverDis = false;
  isOverNoData = false;

}