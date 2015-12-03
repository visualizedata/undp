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
var countryName, marriedBy15, marriedBy18, marriedDataYear, marriedDataSource, femaleHDI;

// ~~~~~~ INTERACTIVITY & HTML ~~~~~~~~
var canvas;
var eduButton;
var leButton;
var gniButton;
var yAxis = ['Mean years of schooling', 'Life expectancy, 2013', 'GNI, 2013'];
var yAxisMax = ['10', '90', '27,500'];
var yAxisMid = ['5', '30', '13,250'];
var yAxisMin = ['0', '30', '0'];
var next = 0;
var title;

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
  title.position(70, 30);

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

  push();
  stroke('black');
  line(70, 150, 70, 650);
  line(70, 650, width - 70, 650);
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
  text(yAxisMax[next], 65, 145);
  textAlign(RIGHT, CENTER);
  text(yAxisMid[next], 65, 400);
  textAlign(RIGHT, BASELINE);
  text(yAxisMin[next], 65, 650);
  pop();

  for (var j = 0; j < rowNum.length; j++) {
    countryObjectArray[j].display();
  }
}

Country.prototype.display = function() {



  var edu = map(this.femMnYrsSchool, 0, 10, 0, 500);
  var le = map(this.femLifeExp, 30, 90, 0, 500);
  var gni = map(this.femaleGNI, 0, 27500, 0, 500);
  var componentsF = [edu, le, gni];
  var edu2 = map(this.maleMnYrsSchool, 0, 10, 0, 500);
  var le2 = map(this.maleLifeExp, 30, 90, 0, 500);
  var gni2 = map(this.maleGNI, 0, 27500, 0, 500);
  var componentsM = [edu2, le2, gni2];
  // console.log(components[next]);

  push();
  fill(113, 121, 124, 100);
  noStroke();
  ellipse(100 + (this.row * width / 31), 650 - componentsF[next], this.marriedBy18 * 1.5, this.marriedBy18 * 1.5);
  fill(113, 121, 124);
  ellipse(100 + (this.row * width / 31), 650 - componentsF[next], this.marriedBy15 * 1.5, this.marriedBy15 * 1.5);
  pop();

  push();
  stroke('black');
  strokeWeight(1);
  line(100 + (this.row * width / 31), 650 - componentsM[next], 100 + (this.row * width / 31), 650 - componentsF[next]);
  pop();

  push();
  noStroke();
  ellipseMode(CENTER);
  fill('black');
  ellipse(100 + (this.row * width / 31), 650 - componentsF[next], 3, 3);
  ellipse(100 + (this.row * width / 31), 650 - componentsM[next], 3, 3);
  pop();

  push();
  noStroke();
  fill('black');
  textSize(10);
  textAlign(CENTER);
  textFont(myriadCond);
  // rotate(HALF_PI);
  text(this.countryName, 100 + (this.row * width / 31), 675);
  pop();

  buttons();
};

// ATTEMPTS TO SORT OBJECTS BY VALUE
// function order(a, b) {
//   if (a.marriedBy18 < b.marriedBy18)
//     return -1;
//   if (a.marriedBy18 > b.marriedBy18)
//     return 1;
//   return 0;
// }

// countryObjectArray.sort(function (a, b) {
//   if (a.femMnYrsSchool > b.femMnYrsSchool) {
//     return 1;
//   }
//   if (a.femMnYrsSchool < b.femMnYrsSchool) {
//     return -1;
//   }
//   // a must be equal to b
//   return 0;
// });

// function mouseClicked() {
//     next++;
//     if (next > 2) {
//       next = 0;
//   }
//   return false;
// }
// function mousePressed() {}

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