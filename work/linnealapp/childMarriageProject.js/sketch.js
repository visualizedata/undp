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
var region = [];

// ~~~~~~ INTERACTIVITY & HTML ~~~~~~~~
var canvas;
var eduButton;
var leButton;
var gniButton;
var allButton;
var yLabel, yLabel2, yLabel3;
var yAxis = ['Mean years of schooling, 2002-2012', 'Life expectancy at birth, 2013', 'Estimated GNI per capita, 2013'];
var yAxis5 = ['10.0', '90', '27,500'];
var yAxis4 = ['7.5', '75', '20,625'];
var yAxis3 = ['5.0', '60', '13,750'];
var yAxis2 = ['2.5', '45', '6,875'];
var yAxis0 = ['0', '30', '0'];
var next = 0;
var title, desc, desc2;
var img;
var w = 0;
var isOverCircle;

// ~~~~~~ COLOURS ~~~~~~~~
var mb, sg, dsg, sb, or, lines, gap;



function preload() {
  table = loadTable("childMarriageData.csv", "csv", "header");
  minionSemi = loadFont('MinionPro-Semibold.otf');
  minionBold = loadFont('MinionPro-Bold.otf');
  myriadReg = loadFont('MyriadPro-Regular.otf');
  myriadCond = loadFont('MyriadPro-Cond.otf');
  myriadBCon = loadFont('MyriadPro-BoldCond.otf');
  // img = loadImage("legend.svg");
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SETUP & HTML STUFF ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.class('canvas');

  title = createDiv("Child marriage & female development in Africa");
  title.class('title');
  desc = createDiv("The formal or informal union of a girl under the age of 18 can compromise a girl's development; limiting educational and career opportunities.");
  desc.parent(title);
  desc.class('desc');
  desc2 = createDiv('The main indicator for this data examines African women aged 20-24 and reports the percentage of that group who were first married or in union before the age of 15 and 18.');
  desc2.class('desc');
  desc2.parent(title);
  img = createImg('legend.svg');
  img.parent(title);
  img.class('desc');

  var central = createElement("div");
  central.class('region');
  central.position(width * 0.25, height * 0.94);
  central.id('c');
  var C = createElement("span", "Central");
  C.class('regionText');
  C.parent(central);

  var eastern = createElement("div");
  eastern.class('region');
  eastern.position(width * 0.385, height * 0.94);
  eastern.id('e');
  var E = createElement("span", "Eastern");
  E.class('regionText');
  E.parent(eastern);

  var southern = createElement("div");
  southern.class('region');
  southern.position(width * 0.6525, height * 0.94);
  southern.id('s');
  var S = createElement("span", "Southern");
  S.class('regionText');
  S.parent(southern);

  var western = createElement("div");
  western.class('region');
  western.position(width * 0.702, height * 0.94);
  western.id('w');
  var W = createElement("span", "Western");
  W.class('regionText');
  W.parent(western);

  processData();

  // LABEL X AXIS
  for (var i = 0; i < countryName.length; i++) {
    var xAxis = createElement("div", countryName[i]);
    xAxis.class('xLabels');
    xAxis.position(width * 0.235 + (i * (width * 0.75) / 31), height * 0.88);
  }

  if (loaded) {
    for (var i = 0; i < rowNum.length; i++) {
      countryObjectArray.push(new Country(rowNum[i], countryName[i], marriedBy15[i], marriedBy18[i], marriedDataYear[i], marriedDataSource[i], marriedDataSource[i], femaleHDI[i], femLifeExp[i], maleLifeExp[i], femMnYrsSchool[i], maleMnYrsSchool[i], femaleGNI[i], maleGNI[i], region[i]));
    }
    // console.log(countryObjectArray);
  }
  console.log(region.length);
  buttons();
}

function buttons() {

  yLabel = createElement("div", yAxis[0]);
  yLabel.position(width * 0.14, height * 0.47);
  yLabel.class('yLabel');
  yLabel.style('color', 'dimgrey');

  yLabel2 = createElement("div", yAxis[1]);
  yLabel2.position(width * 0.155, height * 0.47);
  yLabel2.class('yLabel');
  yLabel2.style('color', 'transparent');

  yLabel3 = createElement("div", yAxis[2]);
  yLabel3.position(width * 0.135, height * 0.47);
  yLabel3.class('yLabel');
  yLabel3.style('color', 'transparent');

  eduButton = createButton('Education');
  eduButton.class('button');
  eduButton.id('edu');
  eduButton.style('color', 'rgb(102, 0, 101)');
  eduButton.mousePressed(function() {
    next = 0;
    eduButton.style('color', 'rgb(102, 0, 101)');
    leButton.style('color', 'dimgrey');
    gniButton.style('color', 'dimgrey');
    yLabel.style('color', 'dimgrey');
    yLabel2.style('color', 'transparent');
    yLabel3.style('color', 'transparent');
  });
  eduButton.mouseOver(function() {
    cursor(HAND);
  });

  leButton = createButton('Life expectancy');
  leButton.class('button');
  leButton.id('le');
  leButton.style('color', 'dimgrey');
  leButton.mousePressed(function() {
    next = 1;
    leButton.style('color', 'rgb(102, 0, 101)');
    eduButton.style('color', 'dimgrey');
    gniButton.style('color', 'dimgrey');
    yLabel.style('color', 'transparent');
    yLabel2.style('color', 'dimgrey');
    yLabel3.style('color', 'transparent');
  });
  leButton.mouseOver(function() {
    cursor(HAND);
  });

  gniButton = createButton('GNI');
  gniButton.class('button');
  gniButton.id('gni');
  gniButton.style('color', 'dimgrey');
  gniButton.mousePressed(function() {
    next = 2;
    gniButton.style('color', 'rgb(102, 0, 101)');
    eduButton.style('color', 'dimgrey');
    leButton.style('color', 'dimgrey');
    yLabel.style('color', 'transparent');
    yLabel2.style('color', 'transparent');
    yLabel3.style('color', 'dimgrey');
  });
  gniButton.mouseOver(function() {
    cursor(HAND);
  });

  // allButton = createButton('ALL REGIONS');
  // allButton.class('button');
  // allButton.id('all');
  // allButton.style('background-color', 'gray');
  // allButton.mousePressed(function() {
  //   next = 0;
  // });
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DRAW & DISPLAY ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function draw() {
  colorMode(RGB, 255, 255, 255, 255);
  mb = color(25, 25, 112, 255);
  sg = color(139, 0, 139, 255);
  dsg = color(102, 0, 101, 255);
  or = color(255, 69, 0, 255);
  sb = color(70, 130, 180, 255);
  lines = color(50, 50, 50, 255);
  gap = color(0, 0, 0, 255);

  background(225);

  var top = height * 0.15;
  var bottom = height * 0.8;
  var whatever = (height * 0.65) / 4;
  var start = width * 0.25;
  var end = width * 0.95;

  // stroke(200);
  // line(width * 0.3825, top, width * 0.3825, height * 0.97);
  // line(width * 0.6525, top, width * 0.6525, height * 0.97);
  // line(width * 0.702, top, width * 0.702, height * 0.97);
  // line(width * 0.95, top, width * 0.95, height * 0.97);

  // SET UP GRID FOR GRAPH
  push();
  stroke(120);
  line(start, top, end, top);
  line(start, top + whatever, end, top + whatever);
  line(start, top + 2 * whatever, end, top + 2 * whatever);
  line(start, top + 3 * whatever, end, top + 3 * whatever);
  line(start, bottom, end, bottom);
  pop();

  // LABEL Y AXIS
  push();
  fill(lines);
  noStroke();
  textSize(12);
  // textAlign(CENTER);
  // textFont(myriadBCon);
  // text(yAxis[next], start, top - 10);
  textFont(myriadReg);
  textAlign(RIGHT, TOP);
  text(yAxis5[next], start - 5, top - 5);
  textAlign(RIGHT, CENTER);
  text(yAxis2[next], start - 5, top + 3 * whatever);
  text(yAxis3[next], start - 5, top + 2 * whatever);
  text(yAxis4[next], start - 5, top + whatever);
  textAlign(RIGHT, BASELINE);
  text(yAxis0[next], start - 5, bottom);
  pop();

  for (var j = 0; j < rowNum.length; j++) {
    countryObjectArray[j].display();
  }
}

Country.prototype.display = function() {
  // sort();
  var top = height * 0.15;
  var bottom = height * 0.8;
  var whatever = (height * 0.65) / 4;
  var start = width * 0.25;
  var end = width * 0.95;

  // MAP GNI COMPONENT VALUES TO SCALE TO GRAPH
  var edu = map(this.femMnYrsSchool, 0, 10, 0, height * 0.65);
  var le = map(this.femLifeExp, 30, 90, 0, height * 0.65);
  var gni = map(this.femaleGNI, 0, 27500, 0, height * 0.65);
  var componentsF = [edu, le, gni];
  var edu2 = map(this.maleMnYrsSchool, 0, 10, 0, height * 0.65);
  var le2 = map(this.maleLifeExp, 30, 90, 0, height * 0.65);
  var gni2 = map(this.maleGNI, 0, 27500, 0, height * 0.65);
  var componentsM = [edu2, le2, gni2];
  // console.log(components[next]);
  var xvar = width * 0.275 + (this.row * (width * 0.75) / 31);

  var eduGap = this.maleMnYrsSchool - this.femMnYrsSchool; // Get gap value for schooling
  var eduGap = eduGap.toFixed(1); // Round to one decimal place
  if (eduGap < 0) { // If female value is higher don't display the gap
    eduGap = '';
  }
  var gniGap = (this.femaleGNI / this.maleGNI) * 100; // Get gap value for GNI
  var gniGap = gniGap.toFixed(1); // Round to 1 decimal place
  if (gniGap < 0) { // If female value is higher don't display the gap
    gniGAp = '';
  }
  var statNums = ["women receive " + this.femMnYrsSchool.toFixed(1) + " years of schooling, " + eduGap + " years less than men", this.femLifeExp.toFixed(1) + ' is the average female life expectancy', 'women earn $' + this.femaleGNI.toFixed(2) + ' , ' + gniGap + "% less than men"];

  // SET UP DETECTION FOR HOVERING OVER CIRCLES
  var distance = dist(mouseX, mouseY, xvar, bottom - componentsF[next]);
  if (distance < ((this.marriedBy18 * 1.5) / 2)) {
    isOverCircle = true;
  } else {
    isOverCircle = false;
  }

  // DRAWING DATA POINTS ON GRAPH
  push();
  if (isOverCircle == false) {
    fill(139, 0, 139, 150);
  } else {
    fill(255, 255, 255, 150);
    noStroke();
    ellipse(xvar, bottom - componentsF[next], 150, 150);
    fill(dsg);
  }
  noStroke();
  ellipse(xvar, bottom - componentsF[next], this.marriedBy18 * 1.5, this.marriedBy18 * 1.5);
  fill(or);
  ellipse(xvar, bottom - componentsF[next], this.marriedBy15 * 1.5, this.marriedBy15 * 1.5);
  pop();

  push();
  if (isOverCircle == false) {
    strokeWeight(1);
  } else {
    strokeWeight(2);
  }
  stroke(gap);
  line(xvar - 0.5, bottom - componentsM[next], xvar, bottom - componentsF[next]);
  pop();

  push();
  noStroke();
  ellipseMode(CENTER);
  fill(gap);
  if (isOverCircle == false) {
    ellipse(xvar + 0.5, bottom - componentsF[next], 3, 3);
    ellipse(xvar, bottom - componentsM[next], 3, 3);
  } else {
    ellipse(xvar, bottom - componentsF[next], 4, 4);
    ellipse(xvar - 0.5, bottom - componentsM[next], 4, 4);
  }
  pop();

  textSize(18);
  var tw = textWidth("In " + this.countryName + " ");
  // make pop-up box with country stats
  if (isOverCircle == true) {
    fill(255, 255, 255, 220);
    noStroke();
    if (componentsM[next] > componentsF[next]) {
      push();
      noStroke();
      textSize(18);
      fill(dsg);
      textAlign(LEFT);
      textFont(minionSemi);
      text("In " + this.countryName, start, height * 0.06);
      fill(sg);
      textSize(14);
      textFont(myriadReg);
      text(statNums[next], start + tw, height * 0.12);
      text(this.marriedBy18 + "% of girls are married before age 18 (" + this.marriedDataYear + ")", width * 0.25 + tw, height * 0.06);
      text(this.marriedBy15 + "% of girls are married before age 15 (" + this.marriedDataYear + ")", width * 0.25 + tw, height * 0.09);
      pop();
    } else if (componentsM[next] < componentsF[next]) {
      push();
      noStroke();
      textSize(18);
      fill(dsg);
      textAlign(LEFT);
      textFont(minionSemi);
      text("In " + this.countryName, start, height * 0.06);
      fill(sg);
      textSize(14);
      textFont(myriadReg);
      if (next === 1) {
        text(statNums[1], start + tw, height * 0.12);
      }
      if (next === 0) {
        text("women receive " + this.femMnYrsSchool.toFixed(1) + " years of schooling", start + tw, height * 0.12);
      }
      text(this.marriedBy18 + "% of girls are married before age 18 (" + this.marriedDataYear + ")", width * 0.25 + tw, height * 0.06);
      text(this.marriedBy15 + "% of girls are married before age 15 (" + this.marriedDataYear + ")", width * 0.25 + tw, height * 0.09);
      pop();
    }
  }
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
  region = table.getColumn('region');

  for (var row = 0; row < count; row++) {
    rowNum.push(row);
  }
  loaded = true;
}

function Country(rowNum, countryName, marriedBy15, marriedBy18, marriedDataYear, marriedDataSource, marriedDataSource, femaleHDI, femLifeExp, maleLifeExp, femMnYrsSchool, maleMnYrsSchool, femaleGNI, maleGNI, region) {
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
  this.region = region;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}