var data = {};
var country = [],
  checker = true;
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
  gapNum = [],
  countryBools = [],
  gaps = [];


/*-----------load fonts-----------*/
function preload() {
  latoHair = loadFont('Lato-Hairline.ttf');
  latoLight = loadFont('Lato-Light.ttf');
  latoReg = loadFont('Lato-Regular.ttf');
}

function setup() {
  /*-----------title bar-----------*/
  createCanvas(windowWidth, windowHeight);
  var black = color(0);
  var beige = color(238, 226, 210);
  var greens = color(77, 102, 25);
  noStroke();
  fill(beige);
  rect(0, height * 0.1, width, height * 0.9);
  fill(238, 226, 210, 10);
  rect(0, 0, width, height * 0.1);
  textFont(latoLight);
  textSize(27);
  stroke(black);
  fill(black);
  text("Productivity Differences between Male and Female African Farmers", width * 0.02, height * 0.06);

  /*-----------right bar title-----------*/
  textFont(latoReg);
  textSize(18);
  text("Primary Factors Contributing to Gender Gap in Agricultural Productivity", width * 0.70, height * 0.14, width * 0.3);
  table = loadTable("data.txt", "tsv", showData);

}

/*-----------parse tsv-----------*/
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
  count = table.getRowCount();
  for (var r = 1; r < 8; r++) {
    var gap = table.getString(r, 1);
    names.push(table.getString(r, 0));
    gaps.push(map(gap, 0, 100, width * 0.12, width * 0.3));
    gapNum.push(gap);
  }

  /*-----------bar graphs-----------*/
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

  /*-----------bezier end points-----------*/
  for (var i = 2; i < labels.length; i++) {
    endY.push(height * 0.14 + i * (height * 0.04));
  }
  stroke(0, 0, 0, 100);
  /*-----------initial bezier & list-----------*/
  for (var j = 0; j < 7; j++) {
    for (var i = 0; i < endY.length; i++) {
      var white = color(243, 235, 223);
      stroke(white);
      fill(white);
      rect(width * 0.75, height * 0.115 + ((2) * (height * 0.040)), width * 0.24, height * 0.07);
      rect(width * 0.75, height * 0.115 + ((4) * (height * 0.040)), width * 0.24, height * 0.23);
      rect(width * 0.75, height * 0.115 + ((10) * (height * 0.040)), width * 0.24, height * 0.15);
      rect(width * 0.75, height * 0.115 + ((14) * (height * 0.040)), width * 0.24, height * 0.03);
      rect(width * 0.75, height * 0.115 + ((15) * (height * 0.040)), width * 0.24, height * 0.11);
      rect(width * 0.75, height * 0.115 + ((18) * (height * 0.040)), width * 0.24, height * 0.07);
      rect(width * 0.75, height * 0.115 + ((20) * (height * 0.040)), width * 0.24, height * 0.03);

    }
  }

  for (var j = 0; j < 7; j++) {
    for (var i = 0; i < endY.length; i++) {
      if (countryBools[j][2 + i] == "1") {
        connect(j, i);
      }
    }
  }
}

function mouseMoved() {
  /*-----------clear curves -----------*/
  var beige = color(238, 226, 210);
  fill(beige);
  stroke(beige);
  rect(width * 0.42, height * 0.14 + 2 * (height * 0.03), width * 0.33, height * 0.9);


  /*-----------check mouse location-----------*/
  for (var j = 0; j < 7; j++) {
    for (var i = 0; i < endY.length; i++) {
      if (countryBools[j][2 + i] == "1") {
        var white = color(243, 235, 223);
        stroke(white);
        fill(white);
        rect(width * 0.75, height * 0.115 + ((2 + i) * (height * 0.04)), width * 0.22, height * 0.03);
        // var white = color(255, 249, 239);
        // stroke(white);
        // fill(white);
        // rect(width * 0.75, height * 0.115 + ((2 + i) * (height * 0.04)), width * 0.22, height * 0.03);
        connect(j, i);
      }
    }
  }

  for (var j = 0; j < 7; j++) {
    for (var i = 0; i < endY.length; i++) {
      if (mouseX >= width * 0.12 && mouseX <= width * 0.12 + (width * 0.3) && mouseY >= height * 0.1 * j + (height * 0.28) && mouseY <= (height * 0.1 * j + (height * 0.28)) + height * 0.08 && countryBools[j][2 + i] == "1") {
        var white = color(243, 235, 223);
        stroke(white);
        fill(white);
        rect(width * 0.75, height * 0.115 + ((2 + i) * (height * 0.04)), width * 0.23, height * 0.03);

        checker = false;
        stroke(beige);
        fill(beige);
        rect(width * 0.01, height * 0.1, width * 0.6, height * 0.1);
        selectedConnect(j, i);
      }
    }
  }
}


/*-----------background lines-----------*/
function connect(n, i) {
  var black = color(0);
  textFont(latoHair);
  textSize(16);

  strokeWeight(0.2);
  noFill();
  stroke(0, 0, 0, 100);
  bezier(width * 0.42, originY[n], width * 0.6, originY[n], width * 0.42, endY[i], width * 0.75, endY[i]);

  // var beige = color(238, 226, 210);
  // stroke(beige);
  // fill(beige);
  // rect(width * 0.75, height * 0.115 + ((2 + i) * (height * 0.04)), width * 0.22, height * 0.03);

  strokeWeight(0.4);
  stroke(170);
  fill(170);
  text(labels[2 + i], width * 0.75, height * 0.14 + ((2 + i) * (height * 0.04)));
  // endY.push(height * 0.14 + i * (height * 0.04));

  // console.log(" n : " + n + "....i =" + i);
}

/*-----------selected curves-----------*/
function selectedConnect(n, i) {
  textFont(latoHair);
  textSize(16);

  strokeWeight(2.5);
  noFill();
  stroke(100);
  bezier(width * 0.42, originY[n], width * 0.6, originY[n], width * 0.42, endY[i], width * 0.75, endY[i]);

  // var beige = color(238, 226, 210);
  // stroke(beige);
  // fill(beige);
  // rect(width * 0.75, height * 0.115 + ((2 + i) * (height * 0.040)), width * 0.22, height * 0.03);

  // var white = color(255, 255, 255);
  // stroke(white);
  // fill(white);
  // rect(width * 0.75, height * 0.115 + ((2) * (height * 0.040)), width * 0.22, height * 0.07);


  strokeWeight(1);
  fill(0);
  stroke(0);
  text(labels[2 + i], width * 0.75, height * 0.14 + ((2 + i) * (height * 0.04)));

  endY.push(height * 0.14 + i * (height * 0.04));
  stroke(200, 50, 50);
  textSize(20);
  text("Female-managed agricultural plots produce an average of " + gapNum[n] + "% less than those that are male managed", width * 0.02, height * 0.19);
}