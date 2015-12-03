var table;
var minionSemi;
var minionBold;
var myriadReg;
var myriadCond;
var myriadBCon;
var countryObjectArray = [];
var count;
var rowNum = [];
var countryName;
var marriedBy15;
var marriedBy18;
var marriedDataYear;
var marriedDataSource;
var femaleHDI;
var attitudeMen;
var attitudeWomen;
var attitudeDataYear;
var attitudeDataSource;
var attitudeToggle = false;
var attitudeShow;
var title;


function preload() {
  table = loadTable("quant_takeTwoData.csv", "csv", "header");
  minionSemi = loadFont('MinionPro-Semibold.otf');
  minionBold = loadFont('MinionPro-Bold.otf');
  myriadReg = loadFont('MyriadPro-Regular.otf');
  myriadCond = loadFont('MyriadPro-Cond.otf');
  myriadBCon = loadFont('MyriadPro-BoldCond.otf');
}

function setup() {
  noLoop(); // no need for input or animation here
  createCanvas(windowWidth, 2000);
  // noCanvas();
  background(14, 14, 14);
  fill(36, 62, 144);
  // rect(15, 15, width - 30, 50);
  fill(255);
  textFont(minionSemi);
  textSize(36);
  text("Gender imbalance & marital social norms in Africa", 40, 50);

  processData();
  if (loaded) {
    for (var i = 0; i < rowNum.length; i++) {
      countryObjectArray.push(new Country(rowNum[i], countryName[i], marriedBy15[i], marriedBy18[i], marriedDataYear[i], marriedDataSource[i], marriedDataSource[i], femaleHDI[i], attitudeMen[i], attitudeWomen[i], attitudeDataYear[i], attitudeDataSource[i]));
    }
    console.log(countryObjectArray);

  }
}

function draw() {
  for (var j = 0; j < rowNum.length; j++) {
    countryObjectArray[j].display();
  }
}

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
  attitudeMen = table.getColumn("attitudeMen");
  for (var i = 0; i < attitudeMen.length; i++) {
    attitudeMen[i] = parseInt(attitudeMen[i]);
  }
  attitudeWomen = table.getColumn("attitudeWomen");
  for (var i = 0; i < attitudeWomen.length; i++) {
    attitudeWomen[i] = parseInt(attitudeWomen[i]);
  }
  attitudeDataYear = table.getColumn("attitudeReferenceYear");
  attitudeDataSource = table.getColumn("attitudeDataSource");

  for (var row = 0; row < count; row++) {

    rowNum.push(row);
  }

  // femaleGNI = table.getColumn('femaleEstGNIperCapita_2013');
  // for (var i = 0; i < femaleGNI.length; i++) {
  //   femaleGNI[i] = parseInt(femaleGNI[i].replace(/,/g, ""));
  // }

  // gapGNI = table.getColumn('gapGNI');
  // for (var i = 0; i < gapGNI.length; i++) {
  //   gapGNI[i] = parseInt(gapGNI[i].replace(/,/g, ""));
  // }
  loaded = true;
}

function Country(rowNum, countryName, marriedBy15, marriedBy18, marriedDataYear, marriedDataSource, marriedDataSource, femaleHDI, attitudeMen, attitudeWomen, attitudeDataYear, attitudeDataSource) {
  this.row = rowNum;
  this.countryName = countryName;
  this.marriedBy15 = marriedBy15;
  this.marriedBy18 = marriedBy18;
  this.marriedDataYear = marriedDataYear;
  this.marriedDataSource = marriedDataSource;
  this.femaleHDI = femaleHDI;
  this.attitudeMen = attitudeMen;
  this.attitudeWomen = attitudeWomen;
  this.attitudeDataYear = attitudeDataYear;
  this.attitudeDataSource = attitudeDataSource;
}

Country.prototype.display = function() {
  // legBars = createElement("div")
  noStroke();
  push();
  fill(97, 107, 165);
  var m = map(this.marriedBy18, 0, 100, 0, 500);
  console.log(m);
  // console.log(this.marriedBy18);
  // rotate(HALF_PI);
  rect(60 + (this.row * width / 30), 200, 10, m);
  pop();

  push();
  var n = map(this.marriedBy15, 0, 100, 0, 500);
  fill(242, 241, 238);
  rect(60 + (this.row * width / 30), 200, 10, n);
  pop();

  push();
  if (attitudeToggle = false) {
    attitudeShow = this.attitudeWomen;
  } else {
    attitudeShow = this.attitudeMen;
  }
  var a = map(attitudeShow, 0, 100, 0, 500);
  fill(129, 169, 171);
  rect(70 + (this.row * width / 30), 200, 10, a);
  pop();

  push();
  stroke(200, 98, 76);
  // noStroke();
  fill(200, 98, 76, 200);
  ellipse(70 + (this.row * width / 30), 150, this.femaleHDI * 200, this.femaleHDI * 200);
  pop();

  // textFont(myriadCond);
  // textSize(18);
  // fill(242, 241, 238);
  // text(this.countryName, width / 2 - 150, 115 + (this.row * 50));
  push();
  stroke(242, 241, 238);
  strokeWeight(0.5);
  line(70 + (this.row * width / 30), 150, 70 + (this.row * width / 30), 700);
  pop();
  // Country[this.row].showCountryNames();
};

function keyPressed() {
  if (key === ENTER) {
    attitudeToggle = !attitudeToggle; // toggle by setting to the opposite boolean value
  }
}