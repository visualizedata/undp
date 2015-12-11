var table;
var country = [];
var code = [];
var HDIrank = [];
var HDIF = [];
var HDIM = [];
var k = 0; // counter
var sans;
var sans2;
var sans3;

function preload() {
  sans = loadFont("Oswald-Regular.otf");
  sans2 = loadFont("Lato-Regular.ttf");
  sans3 = loadFont("Lato-Bold.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  table = loadTable("HDI3let.tsv", "tsv", "header", showData);
  background(255);
}

function showData() {
  for (var j = 0; j < table.getRowCount(); j++) {
    var HDIranka = table.getString(j, 0);
    var countrya = table.getString(j, 1);
    var codea = table.getString(j, 2);
    var HDIFa = table.getNum(j, 3);
    var HDIMa = table.getNum(j, 4);
    HDIrank.push(HDIranka);
    country.push(countrya);
    code.push(codea);
    HDIF.push(HDIFa);
    HDIM.push(HDIMa);
    console.log(HDIrank + " " + country + " " + code + " " + HDIF + " " + HDIM);
  }
  //title
  textFont(sans2);
  textSize(24);
  textAlign(CENTER);
  text("Human Development Index Gender Gap", windowWidth / 2, windowHeight / 25);
  //list of names'
  var l = 0;
  var c = [0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,1,2,3];
  for (var i in code) {
    if (i > 9 && i < 20) {
      l = 1;
    }
    if (i > 19 && i < 30) {
      l = 2;
    }
    if (i > 29 && i < 40) {
      l = 3;
    }
    if (i > 39 && i < 50) {
      l = 4;
    }
    if (i > 49 && i <54) {
      l = 5;
    }
  
    textAlign(LEFT);
    noStroke();
    textSize(50);
    textFont(sans);
    fill(45);
    text(code[i].toUpperCase(), 50 + (l * 200), 100 + (c[i] * 55));
    fill(255);
    rect(45 + (l * 200), 100 + (c[i] * 50) - (50 * HDIF[i]), 100, (50 * (HDIM[i]-HDIF[i])));
  }
}

function draw() {

}