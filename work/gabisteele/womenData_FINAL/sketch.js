var table;
var minVal = 1000;
var maxVal = 1000;
var col;
var countryObjectArray;

var isOverBurn = false;
var isOverArgues = false;
var isOverOut = false;
var isOverNeg = false;
var isOverSex = false;
var isOverAll = false;
var isOverCont = false;
var isOverDis = false;
var isOverNoData = false;
var FMGon = true;

var isOverSource = false;

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
var targetY = [97.9, 96.9, 91.4, 91.1, 88.7, 88.0, 76.3, 75.8, 74.3, 69.4, 49.8, 49.8, 44.2, 38.2, 27.1, 24.8, 24.2, 14.6, 7.3, 3.8, 1.4, 1.4, ];

var easingB = 0.04;
var yback = [97.9, 96.9, 91.4, 91.1, 88.7, 88.0, 76.3, 75.8, 74.3, 69.4, 49.8, 49.8, 44.2, 38.2, 27.1, 24.8, 24.2, 14.6, 7.3, 3.8, 1.4, 1.4, ];
var targetB = [0];

//Key
var y1 = 0;
var y2 = 0;
var y3 = 0;
var easingKey = 0.02;
var targetY1 = 65;
var targetY2 = 45;
var targetY3 = 45;
var tartxt = 100;
var txt = 0;

//Positions
var barY = 850;
var leftX = 1190;
var textX = 1205;
var kx = 110;
var mx = 660;

//easing FGM text
var xpos = 0;
var ypos = 0;


// male data on opinions
var mY = 405;
// female data opinions
var fY = 390;

var midX;
var tmX;



function preload() {
  table = loadTable("womenData.txt", "tsv");
  myFont = loadFont('Gotham-Book.ttf');
}


function setup() {
  createCanvas(10000, 1000);
  textFont(myFont);
  textSize(12);
  count = table.getRowCount();
  for (row = 0; row < count; row++) {
    y[row] = 1;
    
  //   button = createButton('click me');
  // button.position(19, 19);
  // button.html(href="http://unstats.un.org/unsd/gender/chapter6/chapter6.html");


  }

}

function draw() {
  textFont(myFont);
  background(38, 38, 38);


  //------------------------------------------------------------------------------
  //view source
  // get distance between mouse and circle
  var distanceS = dist(mouseX, mouseY, 45, 45);
  // if the distance is less than the circle's radius
  if (distanceS < 50) {
    isOverCircle = true;
  } else {
    isOverCircle = false;
  }
  // draw a circle
  // noFill();
  // stroke(255);
  // strokeWeight(2);
  // ellipse(45, 45, 60, 60);
  // textAlign(CENTER);
  // fill(255);
  // noStroke();
  // text("View Source", 38, 40, 18);
  // if (isOverCircle == true) {
  // fill(255);
  //   ellipse(45, 45, 60, 60);
  //   fill(89, 89, 89);

  //   text("View Source", 38, 40, 18);
  //   cursor(HAND);
  // } else {
  //   fill(200);
  //   cursor(ARROW);
  // }

  textAlign(LEFT);
  fill(255);

  //--------------------------------------------------------------------------

  //Key
  rect(kx, 80, 450, 4);
  var dy1 = targetY1 - y1;
  y1 += dy1 * easingKey;
  fill(89, 89, 89);
  noStroke();
  rect(kx, 80, 40, -y1);
  // fgm KEY
  fill(255);
  textSize(16);
  text("Percentage of Women aged 15 - 49 who have undergone Female Genital Mutilation", kx + 55, 50, 360);
  // womens Opp KEY
  var dy2 = targetY2 - y2;
  y2 += dy2 * easingKey;
  fill(255, 0, 102);
  rect(kx + 20, 140, 4, -y2);
  fill(255);
  text("Women's Opinions", kx + 55, 135);
  rect(kx, 140, 450, 4);
  // mens Opp KEY
  var dy3 = targetY3 - y3;
  y3 += dy3 * easingKey;
  fill(166, 166, 166);
  rect(kx + 20, 200, 4, -y3);
  fill(255);
  rect(kx, 200, 450, 4);
  text("Men's Opinions", kx + 55, 195);
  // ----------------------------------------
  // Opinions Toggle
  rect(leftX - 10, 80, 450, 4);
  textSize(16);
  fill(255);
  text("Percentage of people who think it is justified for husbands to beat their wifes if she:", leftX - 10, 50, 400);
  fill(255);
  text("Burns the food", textX, 115);
  text("Argues with her husband ", textX, 145);
  text("Goes out without telling him", textX, 175);
  text("Neglects the children", textX, 205);
  text("Refuses to have sex with him", textX, 235);
  text("At least one of the above", textX, 265);

  noFill();
  strokeWeight(2);
  stroke(255);
  ellipse(leftX, 110, 12, 12); // burns
  ellipse(leftX, 140, 12, 12); // argues
  ellipse(leftX, 170, 12, 12); // goes out
  ellipse(leftX, 200, 12, 12); // neglects
  ellipse(leftX, 230, 12, 12); // no sex
  ellipse(leftX, 260, 12, 12); // all
  //----------------------------------------
  // FGM toggle
  strokeWeight(0);
  noStroke();
  fill(255);
  rect(mx - 10, 80, 450, 4);
  textSize(16);
  text("Percentage of people who think female genital mutilation should be:", mx - 10, 50, 400);

  text("Continued", mx + 15, 115);
  text("Discontinued ", mx + 15, 145);
  text("Missing data/unsure", mx + 15, 175);

  noFill();
  strokeWeight(2);
  stroke(255);
  ellipse(mx, 110, 12, 12); // cont
  ellipse(mx, 140, 12, 12); // dis
  ellipse(mx, 170, 12, 12); // no data


  //------------------------------------------
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
    if (isNaN(parseInt(table.getString(row, 9)))) {
      womanBurns = "No Data";
    } else {
      womanBurns = table.getString(row, 9);
    }

    if (isNaN(parseInt(table.getString(row, 15)))) {
      manBurns = "No Data";
    } else {
      manBurns = table.getString(row, 15);
    }

    if (isNaN(parseInt(table.getString(row, 10)))) {
      womanArgues = "No Data";
    } else {
      womanArgues = table.getString(row, 10);
    }

    if (isNaN(parseInt(table.getString(row, 16)))) {
      manArgues = "No Data";
    } else {
      manArgues = table.getString(row, 16);
    }

    if (isNaN(parseInt(table.getString(row, 11)))) {
      womanOut = "No Data";
    } else {
      womanOut = table.getString(row, 11);
    }
    if (isNaN(parseInt(table.getString(row, 17)))) {
      manOut = "No Data";
    } else {
      manOut = table.getString(row, 17);
    }

    if (isNaN(parseInt(table.getString(row, 12)))) {
      womanNeg = "No Data";
    } else {
      womanNeg = table.getString(row, 12);
    }
    if (isNaN(parseInt(table.getString(row, 18)))) {
      manNeg = "No Data";
    } else {
      manNeg = table.getString(row, 18);
    }

    if (isNaN(parseInt(table.getString(row, 13)))) {
      womanSex = "No Data";
    } else {
      womanSex = table.getString(row, 13);
    }
    if (isNaN(parseInt(table.getString(row, 19)))) {
      manSex = "No Data";
    } else {
      manSex = table.getString(row, 19);
    }

    if (isNaN(parseInt(table.getString(row, 14)))) {
      womanAll = "No Data";
    } else {
      womanAll = table.getString(row, 14);
    }
    if (isNaN(parseInt(table.getString(row, 20)))) {
      manAll = "No Data";
    } else {
      manAll = table.getString(row, 20);
    }

    if (isNaN(parseInt(table.getString(row, 3)))) {
      womanCont = "No Data";
    } else {
      womanCont = table.getString(row, 3);
    }
    if (isNaN(parseInt(table.getString(row, 6)))) {
      manCont = "No Data";
    } else {
      manCont = table.getString(row, 6);
    }

    if (isNaN(parseInt(table.getString(row, 4)))) {
      womanDis = "No Data";
    } else {
      womanDis = table.getString(row, 4);
    }
    if (isNaN(parseInt(table.getString(row, 7)))) {
      manDis = "No Data";
    } else {
      manDis = table.getString(row, 7);
    }

    if (isNaN(parseInt(table.getString(row, 5)))) {
      womanNoData = "No Data";
    } else {
      womanNoData = table.getString(row, 5);
    }
    if (isNaN(parseInt(table.getString(row, 6)))) {
      manNoData = "No Data";
    } else {
      manNoData = table.getString(row, 6);
    }
    //--------------------------------------------------------------
    //bottom bar chart lines
    noStroke();
    fill(255);
    rect(100, 420, 1730, 5);
    rect(100, 850, 1730, 5);
    text("0%", 60, 859);
    text("100%", 46, 428);
    noStroke();
    //------------------------------------------------------------
    // Country Name list
    fill(255);
    textAlign(CENTER);
    text(countryName, 80 * row + 120, barY + 50, 8);
    // ----------------------------------------------------------
    //-------------------------------------------------------------

    //years
    fill("grey");
    text(dataYrs, 80 * row + 120, barY + 25);
    textAlign(LEFT);
    // noStroke();
    // textSize(12)
    // text("Data Collected in:", 5, 855, 100);
    //------------------------------------------------
    // var targetPx = 80*row + 100;
    // var dpx = targetPx - xpos;
    // xpos += dpx * easing;

    // var targetPy = barY - 400;
    // var dpy = targetPy - ypos;
    // ypos += dpy * easing;


    if (isOverBurn == false && isOverArgues == false && isOverOut == false && isOverSex == false && isOverNeg == false && isOverAll == false) {
      // FGM bars
      noStroke();
      fill(89, 89, 89);
      var dy = targetY[row] - y[row]; // Eritrea
      y[row] += dy * easingB;
      rect(80 * row + 100, barY, 50, -y[row] * 4);

      //percentages
      textSize(16);
      fill("grey");
      text(FGM + "%", 80 * row + 100, barY - 405);

    } else {
      noStroke();
      fill(89, 89, 89);
      var dy = targetB - yback[row];
      yback[row] += dy * easing;
      rect(80 * row + 100, barY, 50, -yback[row] * 4);
    }

    //Burns Food Data
    if (isOverBurn) {
      // FGMon == false;
      fill(255, 0, 102);
      rect(80 * row + 123, barY, 4, -parseFloat(womanBurns) * 4);
      if (womanBurns == "No Data") {
        text(womanBurns, 80 * row + 100, barY - fY);
      } else {
        text(womanBurns + "%", 80 * row + 100, barY - fY);
      }
      fill(166, 166, 166);
      rect(80 * row + 133, barY, 4, -parseFloat(manBurns) * 4);
      if (manBurns == "No Data") {
        text(manBurns, 80 * row + 100, barY - mY);
      } else {
        text(manBurns + "%", 80 * row + 100, barY - mY);
      }
      fill(255);
      ellipse(leftX, 110, 12, 12);

    }

    // Argues with Husband Data
    if (isOverArgues) {
      fill(255, 0, 102);
      rect(80 * row + 123, barY, 4, -parseFloat(womanArgues) * 4);
      if (womanArgues == "No Data") {
        text(womanArgues, 80 * row + 100, barY - fY);
      } else {
        text(womanArgues + "%", 80 * row + 100, barY - fY);
      }
      fill(166, 166, 166);
      rect(80 * row + 133, barY, 4, -parseFloat(manArgues) * 4);
      if (manArgues == "No Data") {
        text(manArgues, 80 * row + 100, barY - mY);
      } else {
        text(manArgues + "%", 80 * row + 100, barY - mY);
      }

      fill(255);
      ellipse(leftX, 140, 12, 12);
    }

    // Woman Goes out w/out telling
    if (isOverOut) {
      fill(255, 0, 102);
      rect(80 * row + 123, barY, 4, -parseFloat(womanOut) * 4);
      if (womanOut == "No Data") {
        text(womanOut, 80 * row + 100, barY - fY);
      } else {
        text(womanOut + "%", 80 * row + 100, barY - fY);
      }

      fill(166, 166, 166);
      rect(80 * row + 133, barY, 4, -parseFloat(manOut) * 4);
      if (manOut == "No Data") {
        text(manOut, 80 * row + 100, barY - mY);
      } else {
        text(manOut + "%", 80 * row + 100, barY - mY);
      }

      fill(255);
      ellipse(leftX, 170, 12, 12);
    }

    // Woman Neglects the Children
    if (isOverNeg) {
      fill(255, 0, 102);
      rect(80 * row + 123, barY, 4, -parseFloat(womanNeg) * 4);
      if (womanNeg == "No Data") {
        text(womanNeg, 80 * row + 100, barY - fY);
      } else {
        text(womanNeg + "%", 80 * row + 100, barY - fY);
      }

      fill(166, 166, 166);
      rect(80 * row + 133, barY, 4, -parseFloat(manNeg) * 4);
      if (manNeg == "No Data") {
        text(manNeg, 80 * row + 100, barY - mY);
      } else {
        text(manNeg + "%", 80 * row + 100, barY - mY);
      }

      fill(255);
      ellipse(leftX, 200, 12, 12);
    }

    // Woman Refuses to Have Sex
    if (isOverSex) {
      fill(255, 0, 102);
      rect(80 * row + 123, barY, 4, -parseFloat(womanSex) * 4);
      if (womanSex == "No Data") {
        text(womanSex, 80 * row + 100, barY - fY);
      } else {
        text(womanSex + "%", 80 * row + 100, barY - fY);
      }

      fill(166, 166, 166);
      rect(80 * row + 133, barY, 4, -parseFloat(manSex) * 4);
      if (manSex == "No Data") {
        text(manSex, 80 * row + 100, barY - mY);
      } else {
        text(manSex + "%", 80 * row + 100, barY - mY);
      }

      fill(255);
      ellipse(leftX, 230, 12, 12);
    }

    //All or one of the above
    if (isOverAll) {
      fill(255, 0, 102);
      rect(80 * row + 123, barY, 4, -parseFloat(womanAll) * 4);
      if (womanAll == "No Data") {
        text(womanAll, 80 * row + 100, barY - fY);
      } else {
        text(womanAll + "%", 80 * row + 100, barY - fY);
      }

      fill(166, 166, 166);
      rect(80 * row + 133, barY, 4, -parseFloat(manAll) * 4);
      if (manAll == "No Data") {
        text(manAll, 80 * row + 100, barY - mY);
      } else {
        text(manAll + "%", 80 * row + 100, barY - mY);
      }

      fill(255);
      ellipse(leftX, 260, 12, 12);
    }

    //FGM Continued
    if (isOverCont) {
      fill(255, 0, 102);
      rect(80 * row + 123, barY, 4, -parseFloat(womanCont) * 4);
      if (womanCont == "No Data") {
        text(womanCont, 80 * row + 100, barY - 440);
      } else {
        text(womanCont + "%", 80 * row + 100, barY - 440);
      }

      fill(166, 166, 166);
      rect(80 * row + 133, barY, 4, -parseFloat(manCont) * 4);
      if (manCont == "No Data") {
        text(manCont, 80 * row + 100, barY - 460);
      } else {
  text(manCont + "%", 80 * row + 100, barY - 460);
      }
      fill(255);
      ellipse(mx, 110, 12, 12); // cont
    }

    // FGM Discontinued
    if (isOverDis) {
      fill(255, 0, 102);
      rect(80 * row + 123, barY, 4, -parseFloat(womanDis) * 4);
      
      if(womanDis == "No Data"){
      text(womanDis, 80 * row + 100, barY - 440);
      } else {
        text(womanDis + "%", 80 * row + 100, barY - 440);
      }
      fill(166, 166, 166);
      rect(80 * row + 133, barY, 4, -parseFloat(manDis) * 4);
      if (manDis == "No Data"){
      text(manDis, 80 * row + 100, barY - 460);
      } else {
           text(manDis + "%", 80 * row + 100, barY - 460);
      }

      fill(255);
      ellipse(mx, 140, 12, 12); // cont
    }

    if (isOverNoData) {
      fill(255, 0, 102);
      rect(80 * row + 123, barY, 4, -parseFloat(womanNoData) * 4);
      
      if (womanNoData == "No Data"){
      text(womanNoData, 80 * row + 100, barY - 440);
      } else {
         text(womanNoData + "%", 80 * row + 100, barY - 440);  
      }
      fill(166, 166, 166);
      rect(80 * row + 133, barY, 4, -parseFloat(manNoData) * 4);
      if (manNoData == "No Data"){
      text(manNoData, 80 * row + 100, barY - 460);
      } else {
       text(manNoData + "%", 80 * row + 100, barY - 460); 
      }
      fill(255);
      ellipse(mx, 170, 12, 12); // cont
    }
  }


}

function isOver() {


  var distance = dist(mouseX, mouseY, leftX, 110);
  if (distance < 150 && abs(mouseY - 110) < 10) {
    isOverBurn = true;
  } else {
    isOverBurn = false;
  }

  var distance = dist(mouseX, mouseY, leftX, 140);
  if (distance < 210 && abs(mouseY - 140) < 10) {
    isOverArgues = true;
  } else {
    isOverArgues = false;
  }

  var distance = dist(mouseX, mouseY, leftX, 170);
  if (distance < 250 && abs(mouseY - 170) < 10) {
    isOverOut = true;
  } else {
    isOverOut = false;
  }

  var distance = dist(mouseX, mouseY, leftX, 200);
  if (distance < 150 && abs(mouseY - 200) < 10) {
    isOverNeg = true;
  } else {
    isOverNeg = false;
  }

  var distance = dist(mouseX, mouseY, leftX, 230);
  if (distance < 250 && abs(mouseY - 230) < 10) {
    isOverSex = true;
  } else {
    isOverSex = false;
  }

  var distance = dist(mouseX, mouseY, leftX, 260);
  if (distance < 250 && abs(mouseY - 260) < 10) {
    isOverAll = true;
  } else {
    isOverAll = false;
  }

  var distance = dist(mouseX, mouseY, mx, 110);
  if (distance < 150 && abs(mouseY - 110) < 10) {
    isOverCont = true;
  } else {
    isOverCont = false;
  }

  var distance = dist(mouseX, mouseY, mx, 140);
  if (distance < 150 && abs(mouseY - 140) < 10) {
    isOverDis = true;
  } else {
    isOverDis = false;
  }

  var distance = dist(mouseX, mouseY, mx, 170);
  if (distance < 150 && abs(mouseY - 170) < 10) {
    isOverNoData = true;
  } else {
    isOverNoData = false;
  }
}

function mousePressed() {
  isOver();

  if (isOverCircle == true) {
    fill(255);
    ellipse(40, 40, 60, 60);
    textAlign(CENTER);
    fill(89, 89, 89);
    text("View Source", 33, 35, 18);
    textAlign(LEFT);
  }

  if (isOverBurn == true) {
    reset();
    isOverBurn = true;
  }

  if (isOverArgues == true) {
    reset();
    isOverArgues = true;
    fill(255);
    ellipse(leftX, 140, 12, 12)
  }

  if (isOverOut == true) {
    reset();
    isOverOut = true;
    fill(255);
    ellipse(leftX, 170, 12, 12);
  }

  if (isOverNeg == true) {
    reset();
    isOverNeg = true;
    fill(255);
    ellipse(leftX, 200, 12, 12);
  }

  if (isOverSex == true) {
    reset();
    isOverSex = true;
    fill(255);
    ellipse(leftX, 230, 12, 12);
  }

  if (isOverAll == true) {
    reset();
    isOverAll = true;
    fill(255);
    ellipse(leftX, 260, 12, 12);
  }

  if (isOverCont == true) {
    reset();
    isOverCont = true;
    fill(255);
    ellipse(mx, 110, 12, 12); // cont
  }

  if (isOverDis == true) {
    reset();
    isOverDis = true;
    fill(255);
    ellipse(mx, 140, 12, 12);
  }

  if (isOverNoData == true) {
    reset();
    isOverNoData = true;
    fill(255);
    ellipse(mx, 170, 12, 12);
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
  // isOverSource = false;

}