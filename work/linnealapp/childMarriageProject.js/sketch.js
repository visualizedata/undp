// ~~~~~~ FONT ~~~~~~~~
var minionSemi;
var minionBold;
var myriadReg;
var myriadCond;
var myriadBCon;

// ~~~~~~ DATA ~~~~~~~~
var table;
var countryObjectArray = [];
var count;
var rowNum = [];
var countryName = [];
var marriedBy15 = [];
var marriedBy18 = [];
var marriedDataYear = [];
var marriedDataSource = [];
var femaleHDI = [];

// ~~~~~~ INTERACTIVITY & HTML ~~~~~~~~
var canvas;
var eduButton;
var leButton;
var gniButton;
var yAxis = ['Mean years of schooling', 'Life expectancy, 2013', 'GNI, 2013'];
var yAxis5 = ['10.0', '90', '27,500'];
var yAxis4 = ['7.5', '75', '20,625'];
var yAxis3 = ['5.0', '60', '13,750'];
var yAxis2 = ['2.5', '45', '6,875'];
var yAxis0 = ['0', '30', '0'];
var next = 0;
var title;
var w = 0;
var isOverCircle;

// ~~~~~~ COLOURS ~~~~~~~~




function preload() {
  table = loadTable("childMarriageData.csv", "csv", "header");
  minionSemi = loadFont('MinionPro-Semibold.otf');
  minionBold = loadFont('MinionPro-Bold.otf');
  myriadReg = loadFont('MyriadPro-Regular.otf');
  myriadCond = loadFont('MyriadPro-Cond.otf');
  myriadBCon = loadFont('MyriadPro-BoldCond.otf');
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SETUP & HTML STUFF ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function setup() {
  // noLoop(); // no need for input or animation here
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.class('canvas');

  title = createDiv("Child marriage & female development in Africa");
  title.class('title');
  // title.position(70, 30);

  processData();
  if (loaded) {
    for (var i = 0; i < rowNum.length; i++) {
      countryObjectArray.push(new Country(rowNum[i], countryName[i], marriedBy15[i], marriedBy18[i], marriedDataYear[i], marriedDataSource[i], marriedDataSource[i], femaleHDI[i], femLifeExp[i], maleLifeExp[i], femMnYrsSchool[i], maleMnYrsSchool[i], femaleGNI[i], maleGNI[i]));
    }
    // console.log(countryObjectArray);
  }
  buttons();
}

function buttons() {
  eduButton = createButton('EDUCATION');
  eduButton.class('button');
  eduButton.id('edu');
  eduButton.mousePressed(function() {
    next = 0;
  });
  eduButton.mouseOver(function() {
    cursor(HAND);
  });

  leButton = createButton('LIFE EXPECTANCY');
  leButton.class('button');
  leButton.id('le');
  leButton.mousePressed(function() {
    next = 1;
  });
  leButton.mouseOver(function() {
    cursor(HAND);
  });

  gniButton = createButton('GNI');
  gniButton.class('button');
  gniButton.id('gni');
  gniButton.mousePressed(function() {
    next = 2;
  });
  gniButton.mouseOver(function() {
    cursor(HAND);
  });
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DRAW & DISPLAY ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function draw() {
  background(238, 226, 210);
  var whatever = (height - 250) / 4;

  push();
  stroke('black');
  line(70, 150, 70, height - 100);
  stroke(0, 100);
  line(70, 150, width - 70, 150);
  line(70, 150 + whatever, width - 70, 150 + whatever);
  line(70, 150 + 2 * whatever, width - 70, 150 + 2 * whatever);
  line(70, 150 + 3 * whatever, width - 70, 150 + 3 * whatever);
  line(70, height - 100, width - 70, height - 100);
  pop();



  push();
  fill('black');
  noStroke();
  textSize(12);
  textAlign(CENTER);
  textFont(myriadBCon);
  text(yAxis[next], 70, 140);
  textFont(myriadReg);
  textAlign(RIGHT, TOP);
  text(yAxis5[next], 65, 145);
  text(yAxis2[next], 65, (height - 100) - ((height - 100) / 5));
  textAlign(RIGHT, CENTER);
  text(yAxis3[next], 65, (150 + (height - 100)) / 2);
  textAlign(RIGHT, BASELINE);
  text(yAxis4[next], 65, 150 + ((height - 100) / 5));
  text(yAxis0[next], 65, height - 100);
  pop();

  for (var j = 0; j < rowNum.length; j++) {
    countryObjectArray[j].display();
  }


}

Country.prototype.display = function() {
  // sort();

  var edu = map(this.femMnYrsSchool, 0, 10, 0, height - 250);
  var le = map(this.femLifeExp, 30, 90, 0, height - 250);
  var gni = map(this.femaleGNI, 0, 27500, 0, height - 250);
  var componentsF = [edu, le, gni];
  var edu2 = map(this.maleMnYrsSchool, 0, 10, 0, height - 250);
  var le2 = map(this.maleLifeExp, 30, 90, 0, height - 250);
  var gni2 = map(this.maleGNI, 0, 27500, 0, height - 250);
  var componentsM = [edu2, le2, gni2];
  // console.log(components[next]);
  var xvar = 100 + (this.row * width / 32);
  var eduGap = this.maleMnYrsSchool - this.femMnYrsSchool;
  var eduGap = eduGap.toFixed(1);
  if (eduGap < 0) {
    eduGap = '';
  }
  var gniGap = this.maleGNI - this.femaleGNI;
  var gniGap = gniGap.toFixed(2);
  if (gniGap < 0) {
    gniGAp = '';
  }
  var statNums = [eduGap + " years less schooling than men", this.femLifeExp.toFixed(1) + ' average female life expectancy', '$' + gniGap + " less income than men"];

  var distance = dist(mouseX, mouseY, xvar, (height - 100) - componentsF[next]);

  if (distance < ((this.marriedBy18 * 1.5) / 2)) {
    isOverCircle = true;
  } else {
    isOverCircle = false;
  }

  push();
  if (isOverCircle == true) {
    fill(113, 121, 124, 200);
  } else {
    fill(113, 121, 124, 100);
  }
  noStroke();
  ellipse(xvar, (height - 100) - componentsF[next], this.marriedBy18 * 1.5, this.marriedBy18 * 1.5);
  fill(113, 121, 124);
  ellipse(xvar, (height - 100) - componentsF[next], this.marriedBy15 * 1.5, this.marriedBy15 * 1.5);
  pop();

  push();
  if (isOverCircle == true) {
    strokeWeight(2);
  } else {
    strokeWeight(1);
  }
  stroke('black');
  line(99.5 + (this.row * width / 32), (height - 100) - componentsM[next], 99.5 + (this.row * width / 32), (height - 100) - componentsF[next]);
  pop();

  push();
  noStroke();
  ellipseMode(CENTER);
  fill('black');
  if (isOverCircle == true) {
    ellipse(xvar, (height - 100) - componentsF[next], 6, 6);
    ellipse(xvar, (height - 100) - componentsM[next], 6, 6);
  } else {
    ellipse(xvar, (height - 100) - componentsF[next], 3, 3);
    ellipse(xvar, (height - 100) - componentsM[next], 3, 3);
  }
  pop();

  // make pop-up box with country stats
  if (isOverCircle == true) {
    fill(238, 226, 210, 100);
    noStroke();
    rect(70, 150, width - 70, height - 100);
    rectMode(CENTER);
    fill(255, 255, 255, 220);
    noStroke();
    if (componentsM[next] > componentsF[next]) {
      rect(xvar, (height - 150) - componentsM[next], 170, 70, 5);
      triangle(xvar, (height - 105) - componentsM[next], 95 + (this.row * width / 32), (height - 115) - componentsM[next], 105 + (this.row * width / 32), (height - 115) - componentsM[next]);
      push();
      noStroke();
      fill('black');
      textSize(18);
      textAlign(LEFT);
      textFont(myriadCond);
      text(this.countryName.toUpperCase(), xvar - 75, (height - 190) - componentsM[next]);
      textSize(13);
      if (this.maleMnYrsSchool > this.femMnYrsSchool) {
      text(statNums[next], xvar - 75, (height - 129) - componentsM[next]);
      }
      text(this.marriedBy18 + "% of girls are married before age 18", xvar - 75, (height - 165) - componentsM[next]);
      text(this.marriedBy15 + "% of girls are married before age 15", xvar - 75, (height - 147) - componentsM[next]);
      pop();
    } else if (componentsM[next] < componentsF[next]) {
      rect(xvar, (height - 150) - componentsF[next], 170, 50, 5);
      triangle(xvar, (height - 115) - componentsF[next], 95 + (this.row * width / 32), (height - 125) - componentsF[next], 105 + (this.row * width / 32), (height - 125) - componentsF[next]);
      push();
      noStroke();
      fill('black');
      textSize(18);
      textAlign(LEFT);
      textFont(myriadCond);
      text(this.countryName.toUpperCase(), xvar - 75, (height - 180) - componentsF[next]);
      textSize(13);
      // if (this.maleMnYrsSchool > this.femMnYrsSchool) {
      // text(statNums[next], xvar - 75, (height - 139) - componentsF[next]);
      // }
      text(this.marriedBy15 + "% of girls are married before age 15", xvar - 75, (height - 137) - componentsF[next]);
      text(this.marriedBy18 + "% of girls are married before age 18", xvar - 75, (height - 155) - componentsF[next]);
      pop();
    }
  }

  // buttons();
};

// ATTEMPTING TO SORT OBJECTS BY VALUE
// function order(a, b) {
//   if (a.marriedBy18 < b.marriedBy18)
//     return -1;
//   if (a.marriedBy18 > b.marriedBy18)
//     return 1;
//   return 0;
// }

// function sort(a, b) {
//   if (a.marriedBy18 > b.marriedBy18) {
//     return 1;
//   }
//   if (a.marriedBy18 < b.marriedBy18) {
//     return -1;
//   }
//   // a must be equal to b
//   return 0;
// }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PARSING DATA & CREATING COUNTRY OBJECTS ~~~~~~~~~~~~~~
function processData() {

  count = table.getRowCount();
  countryName = table.getColumn("countryName");

  marriedBy15 = table.getColumn("percentMarriedBy15_2005-2013");
  for (var i = 0; i < marriedBy15.length; i++) {
    marriedBy15[i] = parseInt(marriedBy15[i]);
  }
  marriedBy18 = table.getColumn("percentMarriedBy18_2005-2013");
  for (var i = 0; i < marriedBy18.length; i++) {
    marriedBy18[i] = parseInt(marriedBy18[i]);
  }
  marriedDataYear = table.getColumn("childMarriageDataYear");
  marriedDataSource = table.getColumn("childMarriageDataSource");

  femaleHDI = table.getColumn("hdiFemale2013");
  for (var i = 0; i < femaleHDI.length; i++) {
    femaleHDI[i] = parseFloat(femaleHDI[i]);
  }
  femLifeExp = table.getColumn("lifeExpectancyFemale2013");
  for (var i = 0; i < femLifeExp.length; i++) {
    femLifeExp[i] = parseFloat(femLifeExp[i]);
  }
  maleLifeExp = table.getColumn('lifeExpectancyMale2013');
  for (var i = 0; i < maleLifeExp.length; i++) {
    maleLifeExp[i] = parseFloat(maleLifeExp[i]);
  }
  femMnYrsSchool = table.getColumn("meanYearsSchoolFemale02_12");
  for (var i = 0; i < femMnYrsSchool.length; i++) {
    femMnYrsSchool[i] = parseFloat(femMnYrsSchool[i]);
  }
  maleMnYrsSchool = table.getColumn('meanYearsSchoolMale00_12');
  for (var i = 0; i < maleMnYrsSchool.length; i++) {
    maleMnYrsSchool[i] = parseFloat(maleMnYrsSchool[i]);
  }
  femaleGNI = table.getColumn("gniFemale2013");
  for (var i = 0; i < femaleGNI.length; i++) {
    femaleGNI[i] = femaleGNI[i].replace(/\,/g, "");
    femaleGNI[i] = parseFloat(femaleGNI[i]);
  }
  maleGNI = table.getColumn('gniMale2013');
  for (var i = 0; i < maleGNI.length; i++) {
    maleGNI[i] = maleGNI[i].replace(/\,/g, "");
    maleGNI[i] = parseFloat(maleGNI[i]);
  }

  for (var row = 0; row < count; row++) {
    rowNum.push(row);
  }
  loaded = true;
}

function Country(rowNum, countryName, marriedBy15, marriedBy18, marriedDataYear, marriedDataSource, marriedDataSource, femaleHDI, femLifeExp, maleLifeExp, femMnYrsSchool, maleMnYrsSchool, femaleGNI, maleGNI) {
  this.row = rowNum;
  this.countryName = countryName;
  this.marriedBy15 = marriedBy15;
  this.marriedBy18 = marriedBy18;
  this.marriedDataYear = marriedDataYear;
  this.marriedDataSource = marriedDataSource;
  this.femaleHDI = femaleHDI;
  this.femLifeExp = femLifeExp;
  this.maleLifeExp = maleLifeExp;
  this.femMnYrsSchool = femMnYrsSchool;
  this.maleMnYrsSchool = maleMnYrsSchool;
  this.femaleGNI = femaleGNI;
  this.maleGNI = maleGNI;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}