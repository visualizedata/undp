var table;
var table2;
var table3;
var canvas;
var legColumn;
var countryObjectArray = [];
var count;
var rowNum = [];
var countryName = [];
var regionName = [];
var headers = [];
// var c1 = [];
// var s1 = [];
// var c2 = [];
// var c3 = [];
// var c4 = [];
// var c5 = [];
// var c6 = [];
// var c7 = [];
// var c8 = [];
// var c9 = [];
// var c10 = [];
// var c11 = [];
// var c12 = [];
// var c13 = [];
// var c14 = [];
// var c15 = [];
// var c16 = [];
// var c17 = [];
// var c18 = [];
// var c19 = [];
// var c20 = [];
// var c21 = [];
// var c22 = [];
// var c23 = [];
// var c24 = [];
// var c25 = [];
// var c26 = [];
// var c27 = [];
// var c28 = [];
// var c29 = [];
// var c30 = [];
// var c31 = [];
// var c32 = [];
// var c33 = [];
// var c34 = [];
// var c35 = [];
// var c36 = [];
// var c37 = [];
// var c38 = [];
// var c39 = [];
// var c40 = [];
var show = 0;
var show2 = 0;
var status = [];
var test = [];
var source = [];
var loaded = false;

function preload() {
  table = loadTable("legislationBreakdown.csv", "csv", "header");
  table2 = loadTable("legislationSources.csv", "csv", "header");
  table3 = loadTable("legislationHeader.tsv", "tsv");
}

function setup() {

  canvas = createCanvas(windowWidth, 2000);
  canvas.position(0, 0);
  canvas.class('canvas');
  
  var label1 = createElement('div', "COUNTRY");
  label1.class('label');
  label1.id('label1');
  label1.position(67, 55);
  
  var label2 = createElement('div', 'LEGISLATION');
  label2.class('label');
  label2.id('label2');
  label2.position(width * 0.2, 55);
  
  var label3 = createElement('div', 'STATUS');
  label3.class('label');
  label3.id('label3');
  label3.position(width * 0.73, 55);
  
  var label4 = createElement('div', "SOURCE");
  label4.class('label');
  label4.id('label4');
  label4.position(width * 0.8, 55);

  processData();
  if (loaded) {
    for (var i = 0; i < rowNum.length; i++) {
      countryObjectArray.push(new Country(rowNum[i], countryName[i], regionName[i]));
    }
  }
  // console.log(test[0]);
}

function draw() {
  background(20);

  // MAKE BUTTONS WITH COUNTRY NAMES  ~~~~~~~~~~~~~~~~~~~~ 
  for (var i = 0; i < countryName.length; i++) {
    var nameButton = createButton(countryName[i]);
    nameButton.class("button");
    nameButton.id("c" + i);
    nameButton.position(width * 0.05, 80 + i * 40);
    nameButton.style("background-color", "SlateGrey");
    nameButton.mousePressed(function() {
      show = test[0];
      show2 = source[0];
      nameButton.style("background-color", "red");
    })
  }


  // MAKE DIVS WITH LEGISLATION TEXT  ~~~~~~~~~~~~~~~~~~~~ 
  // legColumn = createElement("div");
  // legColumn.class("legislations");
  // legColumn.position(200, 100);
  for (var k = 0; k < headers.length; k++) {
    var indLeg = createElement("div", headers[k]);
    indLeg.class("legislations");
    indLeg.id(k);
    indLeg.position(width * 0.20, 80 + k * 40);
    // indLeg.parent(legColumn);
  }

  // MAKE DIVS WITH COUNTRY STATUS FOR EACH LEGISLATION  ~~~~~~~~~~~~~~~~~~~~ 
  for (var j = 0; j < headers.length; j++) {
    var indStat = createElement("div", show[j]);
    indStat.class("status");
    indStat.position(width * 0.73, 80 + j * 40);
  }
  
  // MAKE DIVS WITH SOURCE FOR EACH LEGISLATION  ~~~~~~~~~~~~~~~~~~~~ 
  for (var q = 0; q < headers.length; q++) {
    var indSrc = createElement("div", show2[q]);
    indSrc.class("src");
    indSrc.position(width * 0.80, 80 + q * 40);
  }


  for (var r = 0; r < rowNum.length; r++) {
    countryObjectArray[r].display();
  }
}

Country.prototype.display = function() {
  fill(100);
  // text(this.countryName, 70, 100 + this.row * 50);
};

function processData() {

  count = table.getRowCount();
  countryName = table.getColumn("countryName");
  regionName = table.getColumn("regionName");

  for (var row = 0; row < count; row++) {
    var c1 = [];
    for (col = 2; col < 37; col++) {
      c1.push(table.getString(row, col));
    }
    test.push(c1);
  }
  for (var row = 0; row < count; row++) {
    var s1 = [];
    for (col = 2; col < 37; col++) {
      s1.push(table2.getString(row, col));
    }
    source.push(s1);
  }
      // c2.push(table.getString(1, col));
      // c3.push(table.getString(2, col));
      // c4.push(table.getString(3, col));
      // c5.push(table.getString(4, col));
      // c6.push(table.getString(5, col));
      // c7.push(table.getString(6, col));
      // c8.push(table.getString(7, col));
      // c9.push(table.getString(8, col));
      // c10.push(table.getString(9, col));
      // c11.push(table.getString(10, col));
      // c12.push(table.getString(11, col));
      // c13.push(table.getString(12, col));
      // c14.push(table.getString(13, col));
      // c15.push(table.getString(14, col));
      // c16.push(table.getString(15, col));
      // c17.push(table.getString(16, col));
      // c18.push(table.getString(17, col));
      // c19.push(table.getString(18, col));
      // c20.push(table.getString(19, col));
      // c21.push(table.getString(20, col));
      // c22.push(table.getString(21, col));
      // c23.push(table.getString(22, col));
      // c24.push(table.getString(23, col));
      // c25.push(table.getString(24, col));
      // c26.push(table.getString(25, col));
      // c27.push(table.getString(26, col));
      // c28.push(table.getString(27, col));
      // c29.push(table.getString(28, col));
      // c30.push(table.getString(29, col));
      // c31.push(table.getString(30, col));
      // c32.push(table.getString(31, col));
      // c33.push(table.getString(32, col));
      // c34.push(table.getString(33, col));
      // c35.push(table.getString(34, col));
      // c36.push(table.getString(35, col));
      // c37.push(table.getString(36, col));
      // c38.push(table.getString(37, col));
      // c39.push(table.getString(38, col));
      // c40.push(table.getString(39, col));
      
  //     s2.push(table2.getString(1, col));
  //     s3.push(table2.getString(2, col));
  //     s4.push(table2.getString(3, col));
  //     s5.push(table2.getString(4, col));
  //     s6.push(table2.getString(5, col));
  //     s7.push(table2.getString(6, col));
  //     s8.push(table2.getString(7, col));
  //     s9.push(table2.getString(8, col));
  //     s10.push(table2.getString(9, col));
  //     s11.push(table2.getString(10, col));
  //     s12.push(table2.getString(11, col));
  //     s13.push(table2.getString(12, col));
  //     s14.push(table2.getString(13, col));
  //     s15.push(table2.getString(14, col));
  //     s16.push(table2.getString(15, col));
  //     s17.push(table2.getString(16, col));
  //     s18.push(table2.getString(17, col));
  //     s19.push(table2.getString(18, col));
  //     s20.push(table2.getString(19, col));
  //     s21.push(table2.getString(20, col));
  //     s22.push(table2.getString(21, col));
  //     s23.push(table2.getString(22, col));
  //     s24.push(table2.getString(23, col));
  //     s25.push(table2.getString(24, col));
  //     s26.push(table2.getString(25, col));
  //     s27.push(table2.getString(26, col));
  //     s28.push(table2.getString(27, col));
  //     s29.push(table2.getString(28, col));
  //     s30.push(table2.getString(29, col));
  //     s31.push(table2.getString(30, col));
  //     s32.push(table2.getString(31, col));
  //     s33.push(table2.getString(32, col));
  //     s34.push(table2.getString(33, col));
  //     s35.push(table2.getString(34, col));
  //     s36.push(table2.getString(35, col));
  //     s37.push(table2.getString(36, col));
  //     s38.push(table2.getString(37, col));
  //     s39.push(table2.getString(38, col));
  //     s40.push(table2.getString(39, col));

  for (var row = 0; row < count; row++) {
    rowNum.push(row);
  }

  for (var i = 0; i < 35; i++) {
    headers.push(table3.getString(0, i));
    // console.log(headers);
  }
  loaded = true;

}

function Country(rowNum, countryName, regionName) {
  this.row = rowNum;
  this.countryName = countryName;
  this.regionName = regionName;
}