var data = {};
var desc;
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
  summary = [],
  gaps = [];
lines = [];

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
  var beige = color(250);
  var greens = color(77, 102, 25);
  noStroke();
  fill(beige);
  background(beige);
  fill(253, 241, 225);
  textFont(latoLight);
  textSize(24);
  stroke(0);
  fill(0);
  var titleLength = width * 0.13 + textWidth("Productivity Differences Between Male and");

  text("Productivity Differences Between", width * 0.13, height * 0.92, textWidth("Productivity Differences Between Male and Female"));
  fill(170, 165, 127);
  stroke(170, 165, 127);
  strokeWeight(2);
  text("Male ", width * 0.13 + textWidth("Productivity Differences Between "), height * 0.92);
  fill(0);
  stroke(0);
  strokeWeight(1);
  text(" and", width * 0.13 + textWidth("Productivity Differences Between Male "), height * 0.92);
  fill(125, 116, 99);
  stroke(125, 116, 99);
  strokeWeight(2);
  text("Female", width * 0.13, height * 0.92, textWidth("Productivity Differences Between Male and"), height * 0.2);
  fill(0);
  stroke(0);
  strokeWeight(1.2);
  text("Farmers in Six African Countries", width * 0.13 + textWidth("Female "), height * 0.92, textWidth("Productivity Differences Between Male and"), height * 0.2);


  textSize(13);
  strokeWeight(0.7);
  textFont(latoHair);

  stroke(black);
  fill(black);
  stroke(1);
  line(titleLength + width * 0.01, height * 0.89, titleLength + width * 0.01, height * 0.97);

  text("This visualization explores the gender gap in agricultural productivity across six countries that account for more than 40% of sub-Saharan Africa's population. Data presented was provided in the report \" Levelling the Field: Improving Opportunities for Women Farmer's in Africa \", a joint production of World Bank and the ONE campaign.", titleLength + width * 0.02, height * 0.9, width * 0.3)

  // line(width * 0.01, height * 0.13, width * 0.012 + textWidth("Productivity Differences Between Male"), height * 0.13);
  for (i = 0; i < width * 0.145; i++) {
    ellipse(width * 0.13 + (i * 5), height * 0.11, 1, 1);
  }
  for (i = 0; i < width * 0.145; i++) {
    ellipse(width * 0.13 + (i * 5), height * 0.87, 1, 1);
  }
  /*-----------right bar title-----------*/
  textFont(latoLight);
  textSize(16);
  stroke(200, 50, 50, 100);
  strokeWeight(1.25);
  text("What barriers contribute to this gender gap? ", width * 0.655, height * 0.135);
  text("After accounting for plot size, how much less do female farmers produce, relative to men? ", width * 0.285, height * 0.135, width * 0.25);

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
  lineStates = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  count = table.getRowCount();
  for (var r = 1; r < 8; r++) {
    var gap = table.getString(r, 1);
    names.push(table.getString(r, 0));
    gaps.push(map(gap, 0, 100, width * 0.50, width * 0.28));
    gapNum.push(gap);
  }
  stroke(30, 30, 30, 100);
  strokeWeight(0.5);
  for (var r = 0; r < 11; r++) {
    lines.push(map(lineStates[r], 0, 100, width * 0.50, width * 0.28));
    // print(lines[r]);
    line(lines[r], height * 0.09 * z + (height * 0.25), lines[r], height * 0.09 * z + (height * 0.2))
  }
  /*-----------bar graphs-----------*/
  for (var z = 0; z < 7; z++) {
    stroke(30, 30, 30, 100);
    strokeWeight(0.5);
    line(width * 0.28, height * 0.09 * z + (height * 0.25), width * 0.5, height * 0.09 * z + (height * 0.25));
    for (var i = 0; i < 11; i++) {
      stroke(30, 30, 30, 100);
      strokeWeight(1);
      line(lines[i], height * 0.09 * z + (height * 0.25), lines[i], height * 0.09 * z + (height * 0.2))
      textFont(latoHair);
      stroke(80);
      fill(80);
      textSize(9);
      strokeWeight(0.7);
      text(lineStates[i] + "%", lines[i], height * 0.09 * z + (height * 0.265));
    }
    // line(width * 0.305, height * 0.09 * z + (height * 0.25), width * 0.33, height * 0.09 * z + (height * 0.2))
    // line(lines[z], height * 0.09 * z + (height * 0.24), lines[z], height * 0.09 * z + (height * 0.22));
    noStroke();
    fill(170, 165, 127);
    rect(width * 0.28, height * 0.09 * z + (height * 0.2), width * 0.3, height * 0.02);
    fill(125, 116, 99);
    rect(gaps[z], height * 0.09 * z + (height * 0.22), width * 0.25, height * 0.02);

    /*----------country names-----------*/
    stroke(black);
    strokeWeight(1);
    textSize(18);
    textAlign(RIGHT);
    text(names[z], width * 0.23, height * 0.09 * z + (height * 0.23));
    originY.push(height * 0.09 * z + (height * 0.22));
    textAlign(LEFT);

    // for (var i = 0; i < 7; i++) {
    //   strokeWeight(0.8);
    //   textSize(13);
    //   text(, width * 0.26, height * 0.09 * i + (height * 0.20));
    // }
  }

  /*-----------bezier end points-----------*/
  for (var i = 2; i < labels.length; i++) {
    endY.push(height * 0.09 + i * (height * 0.0369));
  }
  /*-----------contributer descriptions-----------*/
  for (var i = 0; i < 19; i++) {
    summary.push(table.getString(8, i));
  }
  stroke(0, 0, 0, 100);
  /*-----------initial bezier & list-----------*/
  for (var j = 0; j < 7; j++) {
    for (var i = 0; i < endY.length; i++) {
      stroke(black);
      fill(black);
      stroke(1);
      line(width * 0.86, height * 0.14, width * 0.86, height * 0.21);
      line(width * 0.86, height * 0.22, width * 0.86, height * 0.43);
      line(width * 0.86, height * 0.44, width * 0.86, height * 0.58);
      line(width * 0.86, height * 0.59, width * 0.86, height * 0.61);
      line(width * 0.86, height * 0.62, width * 0.86, height * 0.73);
      line(width * 0.86, height * 0.74, width * 0.86, height * 0.8);
      line(width * 0.86, height * 0.81, width * 0.86, height * 0.84);
    }
  }


  var beige = color(250);
  fill(beige);
  stroke(beige);
  rect(width * 0.5, height * 0.09 + 2 * (height * 0.03), width * 0.15, height * 0.7);

  for (var j = 0; j < 7; j++) {
    for (var i = 0; i < endY.length; i++) {
      if (countryBools[j][2 + i] == "1") {
        connect(j, i);
      }
    }
  }
  stroke(0);
  fill(0);
  textSize(7);
  var categories = [];
  var places = [];
  categories.push("LAND", "LABOUR", "NON-LABOUR INPUTS", "INFO", "ACCCESS TO MARKETS", "HUMAN CAPITOL", "WEALTH");
  places.push(0.19, 0.35, 0.55, 0.61, 0.72, 0.8, 0.845);
  for (var i = 0; i < places.length; i++) {
    push();
    translate(width * 0.87, height * places[i]);
    rotate(-HALF_PI);
    text(categories[i], 0, 0);
    pop();
  }

}

function mouseMoved() {
  /*-----------clear curves -----------*/
  var beige = color(250);
  fill(beige);
  stroke(beige);
  rect(width * 0.5, height * 0.09 + 2 * (height * 0.03), width * 0.15, height * 0.7);


  /*-----------check mouse location-----------*/
  for (var j = 0; j < 7; j++) {
    for (var i = 0; i < endY.length; i++) {
      if (countryBools[j][2 + i] == "1") {

        stroke(beige);
        fill(beige);
        rect(width * 0.653, height * 0.07 + ((2 + i) * (height * 0.0369)), width * 0.2, height * 0.03);
        connect(j, i);
      }
    }
  }

  for (var j = 0; j < 7; j++) {
    for (var i = 0; i < endY.length; i++) {
      if (mouseX >= width * 0.1 && mouseX <= width * 0.1 + width * 0.5 && mouseY >= height * 0.09 * j + (height * 0.2) && mouseY <= (height * 0.09 * j + (height * 0.2)) + height * 0.04 && countryBools[j][2 + i] == "1") {
        stroke(beige);
        fill(beige);
        rect(width * 0.653, height * 0.07 + ((2 + i) * (height * 0.0369)), width * 0.2, height * 0.03);

        stroke(beige);
        fill(beige);
        rect(width * 0.1, 0, width * 0.9, height * 0.1);

        selectedConnect(j, i);
      }
    }
  }


  for (var i = 0; i < labels.length; i++) {
    for (var j = 0; j < 7; j++) {
      if (mouseX >= width * 0.655 && mouseX <= width * 0.655 + width * 0.2 && mouseY >= height * 0.07 + ((2 + i) * (height * 0.0369)) && mouseY <= (height * 0.07 + ((2 + i) * (height * 0.0369))) + height * 0.03 && countryBools[j][2 + i] == "1") {
        stroke(beige);
        fill(beige);
        rect(width * 0.653, height * 0.07 + ((2 + i) * (height * 0.0369)), width * 0.2, height * 0.03);

        stroke(beige);
        fill(beige);
        rect(width * 0.1, 0, width * 0.9, height * 0.1);
        selectedLabels(j, i);
      }
    }
  }

}


/*-----------background lines-----------*/
function connect(n, i) {
  var black = color(0);
  textFont(latoHair);
  textSize(14);

  strokeWeight(0.2);
  noFill();
  stroke(0, 0, 0, 150);
  bezier(width * 0.5, originY[n], width * 0.6, originY[n], width * 0.5, endY[i], width * 0.65, endY[i]);

  strokeWeight(0.5);
  stroke(120);
  fill(120);
  text(labels[2 + i], width * 0.655, height * 0.09 + ((2 + i) * (height * 0.0369)));
}

/*-----------selected curves-----------*/
function selectedConnect(n, i) {
  textFont(latoHair);
  textSize(14);

  strokeWeight(1.5);
  noFill();
  stroke(40);
  bezier(width * 0.5, originY[n], width * 0.6, originY[n], width * 0.5, endY[i], width * 0.65, endY[i]);

  strokeWeight(1);
  fill(0);
  stroke(0);
  text(labels[2 + i], width * 0.655, height * 0.09 + ((2 + i) * (height * 0.0369)));

  var number = parseInt(100 - gapNum[n]);
  textFont(latoLight);
  endY.push(height * 0.14 + i * (height * 0.04));
  textSize(21);
  stroke(0);
  strokeWeight(0.9);

  text("Female-managed agricultural plots in" + " ", width * 0.18, height * 0.07);
  strokeWeight(1.6);
  text(names[n], width * 0.18 + (textWidth("Female-managed agricultural plots in" + " ")), height * 0.07);
  strokeWeight(0.8);
  text(" " + "produce an average of ", width * 0.18 + (textWidth("Female-managed agricultural plots in" + " " + names[n])), height * 0.07);
  strokeWeight(1.6);
  text(number + "%", width * 0.18 + (textWidth("Female-managed agricultural plots in" + " " + names[n] + " " + "produce an average of ")), height * 0.07);
  strokeWeight(0.8);
  text(" " + "less than those that are male managed ", width * 0.18 + (textWidth("Female-managed agricultural plots in" + " " + names[n] + " " + "produce an average of " + number + "%")), height * 0.07);

}

function selectedLabels(n, i) {
  textFont(latoHair);
  textSize(14);

  strokeWeight(1.5);
  noFill();
  stroke(100);
  bezier(width * 0.5, originY[n], width * 0.6, originY[n], width * 0.5, endY[i], width * 0.65, endY[i]);

  strokeWeight(1);
  fill(0);
  stroke(0);
  text(labels[2 + i], width * 0.655, height * 0.09 + ((2 + i) * (height * 0.0369)));

  endY.push(height * 0.14 + i * (height * 0.04));
  textFont(latoLight);
  textAlign(CENTER, CENTER);
  textSize(16);
  stroke(0.9);
  strokeWeight(0.8);
  // fill(0);
  text("\"" + summary[i] + "\"", width * 0.13, height * 0.02, width * 0.74, height * 0.08);
  textAlign(LEFT);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}