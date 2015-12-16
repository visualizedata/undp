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
  
  var note = createDiv('** PLEASE NOTE: This project is a rough prototype displaying concept and functionality at an early stage. The final version would include a larger spectrum of countries and their corresponding data.');
  note.position(20, 20);
  note.style('color', 'orangeRed');
  // note.style('background-color', 'white');
  note.style('font-size', '10pt');
  note.style('z-index', '20');

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
  buttons();
}

function draw() {
  background(20);

  // MAKE BUTTONS WITH COUNTRY NAMES  ~~~~~~~~~~~~~~~~~~~~ 
  // for (var i = 0; i < countryName.length; i++) {
  //   var nameButton = createButton(countryName[i]);
  //   nameButton.class("button");
  //   nameButton.id("c" + i);
  //   nameButton.position(width * 0.05, 80 + i * 40);
  //   nameButton.style("background-color", "SlateGrey");
  //   nameButton.mousePressed(function() {
  //     show = test[0];
  //     show2 = source[0];
  //     nameButton.style("background-color", "red");
  //   })
  // }


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

function buttons() {
    var ALG = createButton('Algeria');
  ALG.class('button');
  ALG.position(width * 0.05, 80 + 0 * 40);
  ALG.style('background-color', 'SlateGrey');
  ALG.mousePressed(function() {
    show = test[0];
    show2 = source[0];
  });
  
  var EGY = createButton('Egypt, Arab Rep.');
  EGY.class('button');
  EGY.position(width * 0.05, 80 + 1 * 40);
  EGY.style('background-color', 'SlateGrey');
  EGY.mousePressed(function() {
    show = test[1];
    show2 = source[1];
  });
  
  var MRC = createButton('Morocco');
  MRC.class('button');
  MRC.position(width * 0.05, 80 + 2 * 40);
  MRC.style('background-color', 'SlateGrey');
  MRC.mousePressed(function() {
    show = test[2];
    show2 = source[2];
  });
  var TUN = createButton('Tunisia');
  TUN.class('button');
  TUN.id('mean');
  TUN.position(width * 0.05, 80 + 3 * 40);
  TUN.style('background-color', 'SlateGrey');
  TUN.mousePressed(function() {
    show = test[3];
    show2 = source[3];
  });
  // var ANG = createButton('Angola');
  // ANG.class('button');
  // ANG.id('ssa');
  // ANG.position(width * 0.05, 80 + 4 * 40);
  // ANG.style('background-color', 'SlateGrey');
  // ANG.mousePressed(function() {
  //   show = test[4];
  //   show2 = source[4];
  // });
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