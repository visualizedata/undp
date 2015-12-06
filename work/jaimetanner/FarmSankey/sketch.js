var data = {};
var country = [];
var labels = [],
  ethiopia = [],
  malawi = [],
  niger = [],
  nNigeria = [],
  sNigeria = [],
  tanzania = [],
  uganda = [],
  originY = [],
  endY = [],
  names = [],
  countryBools = [],
  gaps = [];

function preload() {
  latoHair = loadFont('Lato-Hairline.ttf');
  latoLight = loadFont('Lato-Light.ttf');
  latoReg = loadFont('Lato-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  var black = color(0);
  var beige = color(238, 226, 210);
  var greens = color(77, 102, 25);
  noStroke();
  fill(beige);
  rect(0, height * 0.1, width, height * 0.9);
  fill(238, 226, 210, 100);
  rect(0, 0, width, height * 0.1);
  textFont(latoLight);
  textSize(27);
  stroke(black);
  fill(black);
  text("Productivity Differences between Male and Female African Farmers", width * 0.02, height * 0.06);

  textFont(latoReg);
  textSize(20);
  text("Primary Factors Contributing to Gender Gap in Agricultural Productivity", width * 0.70, height * 0.14, width * 0.3);
  table = loadTable("data.txt", "tsv", showData);

  // noStroke();
  // fill(greens);
  // for (var i = 0.1; i < 0.8; i = i + 0.1) {
  //   rect(width * 0.12, height * i, width * 0.3, height * 0.08);
  // }
}


function showData() {
  var deadgrass = color(212, 184, 145);
  var greens = color(77, 102, 25);
  var black = color(0);
  textFont(latoHair);
  textSize(12);
  for (var j = 0; j < 21; j++) {
    labels.push(table.getString(0, j));
    ethiopia.push(table.getString(1, j));
    malawi.push(table.getString(2, j));
    niger.push(table.getString(3, j));
    nNigeria.push(table.getString(4, j));
    sNigeria.push(table.getString(5, j));
    tanzania.push(table.getString(6, j));
    uganda.push(table.getString(7, j));
  }
  countryBools.push(ethiopia, malawi, niger, nNigeria, sNigeria, tanzania, uganda);
  console.log(countryBools);
  count = table.getRowCount();
  for (var r = 1; r < 8; r++) {
    var gap = table.getString(r, 1);
    names.push(table.getString(r, 0));
    gaps.push(map(gap, 0, 100, width * 0.12, width * 0.3));
  }

  for (var z = 0; z < 7; z++) {
    noStroke();
    fill(greens);
    rect(width * 0.12, height * 0.1 * z + (height * 0.28), width * 0.3, height * 0.08);
    fill(black);
    rect();
    rect(width * 0.12, height * 0.1 * z + (height * 0.28), gaps[z], height * 0.08);

    stroke(black);
    text(names[z], width * 0.03, height * 0.1 * z + (height * 0.33));
    originY.push(height * 0.1 * z + (height * 0.33));
  }

  for (var i = 2; i < labels.length; i++) {
    text(labels[i], width * 0.75, height * 0.14 + i * (height * 0.04));
    endY.push(height * 0.14 + i * (height * 0.04));
  }
  stroke(0, 0, 0, 100);
  for (var j = 0; j < 7; j++) {
    for (var i = 0; i < endY.length; i++) {
      if (countryBools[j][2 + i] == "1") {
        connect(j, i);
      }
      if (mouseX >= width * 0.12 && mouseX <= width * 0.12 + (width * 0.3) && mouseY >= height * 0.1 * j + (height * 0.28) && mouseY <= (height * 0.1 * j + (height * 0.28)) + height * 0.08 && countryBools[j][2 + i] == "1") {
        selectedConnect(j, i);
      }
      if (countryBools[j][2 + i] == "1" && j == 2) {
        selectedConnect(j, i);
      }
    }
  }
}

function connect(n, i) {
  strokeWeight(0.2);
  noFill();
  bezier(width * 0.42, originY[n], width * 0.6, originY[n], width * 0.42, endY[i], width * 0.75, endY[i]);
}

function selectedConnect(n, i) {
  strokeWeight(3);
  noFill();
  bezier(width * 0.42, originY[n], width * 0.6, originY[n], width * 0.42, endY[i], width * 0.75, endY[i]);
}