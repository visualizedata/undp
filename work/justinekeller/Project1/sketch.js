var table;
var country = [];
var code = [];
var HDIrank = [];
var HDIF = [];
var HDIM = [];
var k = 0; // counter
var l = 0; // counter x value
var c = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 3, 4, 5, 6, 7]; //counter y value
var q = 0;
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
    // console.log(HDIrank + " " + country + " " + code + " " + HDIF + " " + HDIM);
  }
  //title
  noStroke();
  fill(235);
  textFont(sans2);
  textSize(24);
  textAlign(CENTER);
  text("Human Development Index Gender Gap", windowWidth / 2, windowHeight / 28);
  //list of names
  for (var i in code) {
    if (i > 7 && i < 16) {
      l = 1;
    }
    if (i > 15 && i < 24) {
      l = 2;
    }
    if (i > 23 && i < 32) {
      l = 3;
    }
    if (i > 31 && i < 40) {
      l = 4;
    }
    if (i > 39 && i < 48) {
      l = 5;
    }
    if (i > 47 && i < 54) {
      l = 6;
    }
    textAlign(LEFT);
    noStroke();
    textSize(50);
    textFont(sans);
    fill(45);
    text(code[i].toUpperCase(), 50 + (l * 200), 170 + (c[i] * 65));
    fill(255);
    rect(50 + (l * 200), 170 + (c[i] * 65) - (50 * HDIF[i]), 100, (50 * (HDIM[i] - HDIF[i])));
  }
}

function mouseMoved() {
  var count = 0;
  for (var k in code) {
    l = 0;
    if (k > 7 && k < 16) {
      l = 1;
    }
    if (k > 15 && k < 24) {
      l = 2;
    }
    if (k > 23 && k < 32) {
      l = 3;
    }
    if (k > 31 && k < 40) {
      l = 4;
    }
    if (k > 39 && k < 48) {
      l = 5;
    }
    if (k > 47 && k < 54) {
      l = 6;
    }
    var xvalue = 50 + (l * 200);
    var yvalue = 170 + (c[k] * 65);

    if (mouseX < xvalue + 50 && mouseX > xvalue - 50) {
      if (mouseY < yvalue + 25 && mouseY > yvalue - 25) {
        q = count;
      }
    }
    count++;

    l = 0;
    if (q > 7 && q < 16) {
      l = 1;
    }
    if (q > 15 && q < 24) {
      l = 2;
    }
    if (q > 23 && q < 32) {
      l = 3;
    }
    if (q > 31 && q < 40) {
      l = 4;
    }
    if (q > 39 && q < 48) {
      l = 5;
    }
    if (q > 47 && q < 54) {
      l = 6;
    }
    fill(255);
    rect(50, 172, windowWidth, 18);
    rect(50, 237, windowWidth, 18);
    rect(50, 302, windowWidth, 18);
    rect(50, 367, windowWidth, 18);
    rect(50, 432, windowWidth, 18);
    rect(50, 497, windowWidth, 18);
    rect(50, 562, windowWidth, 18);
    rect(50, 627, windowWidth, 18);
    fill(200);
    textSize(12);
    textFont(sans2);
    text(country[q], 50 + (l * 200), 185 + (c[q] * 65));

  }
}

function mousePressed() {
  if (q) {
    noStroke();
    fill(255);
    rect(0, 0, windowWidth, 120);
    textSize(100); //graphic text size
    textFont(sans); //graphic text font
    fill(50); // graphic text color
    text(country[q].toUpperCase(), 150, 105); //make graphic uppercase of countries and postion
    fill(255); //rectangle fill
    rect(0, 105 - (100 * HDIF[q]), windowWidth, (100 * (HDIM[q] - HDIF[q]))); //rectangle of gap
    fill(100);
    textFont(sans2);
    textSize(20);
    textAlign(CENTER);
    text("HDI Rank:", windowWidth - 100, 55);
    text(HDIrank[q], windowWidth - 100, 80);
    textAlign(LEFT);
    if (HDIF[q] !== 0) {
      textSize(14);
      text("HDI Male: " + HDIM[q] + " HDI Female: " + HDIF[q], 15, 90 - (100 * HDIF[q]), 130, 105);
    stroke(25);
    line(windowWidth - 250, 105, windowWidth - 255, 105);
    line(windowWidth - 250, 17, windowWidth - 255, 17);
    line(windowWidth - 250, 17, windowWidth - 250, 105);
    noStroke();
    fill(150);
    textSize(11);
    text("0", windowWidth - 245, 105 + 8);
    text("0.25", windowWidth - 245, 105 - 14);
    text("0.5", windowWidth - 245, 105 - 36);
    text("0.75", windowWidth - 245, 105 - 58);
    text("1", windowWidth - 245, 105 - 80);
    }
  }
}

function draw() {

}