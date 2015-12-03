var table;
var data = new Object;
var back = 85;
var tri = false;
var opt1 = false, opt2 = false, opt3 = false, opt4 = false, opt5 = false;
var clicked1 = false, clicked2, clicked3, clicked4, clicked5 = false;
// var opt2 = false;
// var opt3 = false;
var count;
// r = [0];
var tri = new Object;
var mapped = new Object;
// var triWidth = ();
var country = [];
var marriage15 = [];
var marriage18 = [];
var hdi = [];
var hdiF = [];
var hdiM = [];
var fVio = [];
var mVio = [];
var region = [];
var hdiDiff = [];
var z = 0;
var latoReg, latoLight;

function preload() {
  latoLight = loadFont('Lato-Hairline.ttf');
  latoReg = loadFont('Lato-Light.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  var black = color(255);
  var backgroundColor = color(119,136,153);
  var groundColor = color(0, 0, 0, 150);

  textFont(latoReg);
  background(backgroundColor);
  fill(groundColor);
  stroke(groundColor);
  strokeWeight(1);
  textSize(9);

  //load data into string array
  table = loadTable("data.txt", "tsv", "header", showData);
  rect(0, height * 0.9, width, height * 0.9);

  // stroke(205, 219, 227);
  // fill(205, 219, 227);
  // rect(0, 0, width, height * 0.2);
  //title 
  textSize(33);
  stroke(black);
  fill(black);
  text("Child Marriages and the Gender Gap", width * 0.05, height * 0.05);
  line(width * 0.05, height * 0.07, width * 0.06 + textWidth("Child Marriages and the Gender Gap"), height * 0.07);
  textSize(18);
  text("In Sub-Saharan Africa", width * 0.05, height * 0.1);
  textFont(latoLight);
  textSize(8);

  //top scale line
  fill(black);
  // stroke(85);
  line(width - 25, height * 0.9, width - 25, height * 0.15);
  text("0%", width - 22, height * 0.89);
  text("100%", width - 22, height * 0.15);

  // middle scale bar 
  fill(230);
  stroke(230);
  text("0.25", width * 0.03, height * 0.93);
  text("0.65", width * 0.97, height * 0.93);
  line(width * 0.03, height * 0.91, width * 0.03, height * 0.88);
  line(width * 0.97, height * 0.91, width * 0.97, height * 0.88);
  textSize(14);
  text("Human Development Index", width / 2 - (textWidth("Human Development Index") / 2), height * 0.98);

  stroke(black);
  // fill(backgroundColor);
  strokeWeight(3);
  rect(width * 0.6, height * 0.05, width * 0.06, width * 0.03, 10, 10, 10, 10);
  rect(width * 0.675, height * 0.05, width * 0.06, width * 0.03, 10, 10, 10, 10);
  rect(width * 0.75, height * 0.05, width * 0.06, width * 0.03, 10, 10, 10, 10);
  rect(width * 0.825, height * 0.05, width * 0.06, width * 0.03, 10, 10, 10, 10);
  strokeWeight(1);

  //BAR TEXT

  fill(black);
  stroke(black);
  text("CENTRAL", width * 0.63 - (textWidth("CENTRAL") / 2), height * 0.06 + (width * 0.015));
  text("EAST", width * 0.705 - (textWidth("EAST") / 2), height * 0.06 + (width * 0.015));
  text("SOUTH", width * 0.78 - (textWidth("SOUTH") / 2), height * 0.06 + (width * 0.015));
  text("WEST", width * 0.855 - (textWidth("WEST") / 2), height * 0.06 + (width * 0.015));
}

function draw() {
  //selector 
  var black = color(255);
  var backgroundColor = color(119,136,153);
  var groundColor = color(37, 41, 59);
  // stroke(black);
  // noFill();
  // // fill(backgroundColor);
  // strokeWeight(3);
  // rect(width * 0.6, height * 0.05, width * 0.06, width * 0.03, 10, 10, 10, 10);
  // rect(width * 0.675, height * 0.05, width * 0.06, width * 0.03, 10, 10, 10, 10);
  // rect(width * 0.75, height * 0.05, width * 0.06, width * 0.03, 10, 10, 10, 10);
  // rect(width * 0.825, height * 0.05, width * 0.06, width * 0.03, 10, 10, 10, 10);
  strokeWeight(1);


  if (mouseX >= (width * 0.6) && mouseX <= (width * 0.6) + (width * 0.06) && mouseY >= height * 0.05 && mouseY <= (height * 0.05) + (width * 0.03) && opt1 == false) {
    opt1 = true;

  } else if (mouseX >= (width * 0.6) && mouseX <= (width * 0.6) + (width * 0.06) && mouseY >= height * 0.05 && mouseY <= (height * 0.05) + (width * 0.03) && opt1 == true){
    opt1 = false;
  }

  if (mouseX >= (width * 0.675) && mouseX <= (width * 0.675) + (width * 0.06) && mouseY >= height * 0.05 && mouseY <= (height * 0.05) + (width * 0.03) && opt2 == false) {
    opt2 = true;
  } else if (mouseX >= (width * 0.675) && mouseX <= (width * 0.675) + (width * 0.06) && mouseY >= height * 0.05 && mouseY <= (height * 0.05) + (width * 0.03) && opt2 == true){
    opt2 = false;
  }

  if (mouseX >= (width * 0.75) && mouseX <= (width * 0.75) + (width * 0.06) && mouseY >= height * 0.05 && mouseY <= (height * 0.05) + (width * 0.03) && opt3 == false) {
    opt3 = true;
  } else if (mouseX >= (width * 0.75) && mouseX <= (width * 0.75) + (width * 0.06) && mouseY >= height * 0.05 && mouseY <= (height * 0.05) + (width * 0.03) && opt3 == true){
    opt3 = false;
  }

  if (mouseX >= (width * 0.825) && mouseX <= (width * 0.825) + (width * 0.06) && mouseY >= height * 0.05 && mouseY <= (height * 0.05) + (width * 0.03) && opt4 == false) {
    opt4 = true;
  } else if (mouseX >= (width * 0.825) && mouseX <= (width * 0.825) + (width * 0.06) && mouseY >= height * 0.05 && mouseY <= (height * 0.05) + (width * 0.03) && opt4 == true){
    opt4 = false;
  }
  // if (opt1 == true) {
  //   for (var r = 0; r < count; r++) {
  //     drawTriangle(r);
  //     counter = false;
  //   }
  // }


}

function showData() {
  var black = color(240, 250, 255);
  stroke(black);
  fill(black);
  count = table.getRowCount();
  for (var r = 0; r < count; r++) {

    country.push(table.getString(r, 0));
    var ge15 = table.getString(r, 1);
    var ge18 = table.getString(r, 2);
    hdi.push(table.getString(r, 3));
    var hF = table.getString(r, 4);
    var hM = table.getString(r, 5);
    var vM = table.getString(r, 6);
    var vF = table.getString(r, 7);
    region.push(table.getString(r, 8));
    hdiDiff.push(hM - hF);

    // dataAll.push(data);
    // marriage15.push(map(ge15, 0, 100, width / 2, width - 30));
    marriage18.push(map(ge18, 0, 100, height * 0.9, height * 0.15));
    hdiF.push(map(hF, 0.25, 0.65, width * 0.03, width * 0.97));
    hdiM.push(map(hM, 0.25, 0.65, width * 0.03, width * 0.97));
    fVio.push(map(vF, 0, 100, height * 0.5, height - 30));
    mVio.push(map(vM, 0, 100, height * 0.5, height - 30));

    stroke(black);
    // drawTriangle(r);
    // stroke(0, 0, 0, 50);
    // fill(0, 0, 0, 50);
    // triangle((hdiM[r] - hdiF[r]) * 0.5 + hdiF[r], marriage18[r], hdiM[r], height * 0.8, hdiF[r], height * 0.8);
    // fill(250);
    // stroke(250);
  }
}


function drawTriangle(r) {
  var mountainColor = color(0, 0, 0, 80);
  var backgroundColor = color(119,136,153);
  var black = color(255);
  stroke(83, 102, 115, 150);
  fill(mountainColor);
  if (region[r] == "c" && opt1 == true) {
    triangle((hdiM[r] - hdiF[r]) * 0.5 + hdiF[r], marriage18[r], hdiM[r], height * 0.9, hdiF[r], height * 0.9);
  } else if (region[r] == "e" && opt2 == true) {
    triangle((hdiM[r] - hdiF[r]) * 0.5 + hdiF[r], marriage18[r], hdiM[r], height * 0.9, hdiF[r], height * 0.9);
  } else if (region[r] == "s" && opt3 == true) {
    triangle((hdiM[r] - hdiF[r]) * 0.5 + hdiF[r], marriage18[r], hdiM[r], height * 0.9, hdiF[r], height * 0.9);
  } else if (region[r] == "w" && opt4 == true) {
    triangle((hdiM[r] - hdiF[r]) * 0.5 + hdiF[r], marriage18[r], hdiM[r], height * 0.9, hdiF[r], height * 0.9);
  } //else if (region[r] == "c" && opt5 == true) {
  //   triangle((hdiM[r] - hdiF[r]) * 0.5 + hdiF[r], marriage18[r], hdiM[r], height * 0.9, hdiF[r], height * 0.9);
  // }

}

function mousePressed() {
  var mountainColor = color(0, 0, 0, 80);
  var backgroundColor = color(119,136,153);
  var black = color(240, 250, 255);
  fill(backgroundColor);
  stroke(backgroundColor);
  rect(0, height * 0.2, width * 0.969, height * 0.7);
  if (opt1 == true) {
    stroke(black);
    fill(black);
    strokeWeight(3);
    rect(width * 0.6, height * 0.05, width * 0.06, width * 0.03, 10, 10, 10, 10);
    strokeWeight(1);
    fill(backgroundColor);
    stroke(backgroundColor);
    //BAR TEXT
    text("CENTRAL", width * 0.63 - (textWidth("CENTRAL") / 2), height * 0.06 + (width * 0.015));
    for (var r = 0; r < count; r++) {
      drawTriangle(r);
    }
  } else if (opt1 == false){
    stroke(black);
    fill(backgroundColor);
    strokeWeight(3);
    rect(width * 0.6, height * 0.05, width * 0.06, width * 0.03, 10, 10, 10, 10);
    strokeWeight(1);
    fill(black);
    stroke(black);
    //BAR TEXT
    text("CENTRAL", width * 0.63 - (textWidth("CENTRAL") / 2), height * 0.06 + (width * 0.015));
  }


  if (opt2 == true) {
    stroke(black);
    fill(black);
    strokeWeight(3);
    rect(width * 0.675, height * 0.05, width * 0.06, width * 0.03, 10, 10, 10, 10);
    strokeWeight(1);
    fill(backgroundColor);
    stroke(backgroundColor);
    //BAR TEXT
    text("EAST", width * 0.705 - (textWidth("EAST") / 2), height * 0.06 + (width * 0.015));
    for (var r = 0; r < count; r++) {
      drawTriangle(r);
    }
  }else {
    stroke(black);
    fill(backgroundColor);
    strokeWeight(3);
    rect(width * 0.675, height * 0.05, width * 0.06, width * 0.03, 10, 10, 10, 10);
    strokeWeight(1);
    fill(black);
    stroke(black);
    //BAR TEXT
    text("EAST", width * 0.705 - (textWidth("EAST") / 2), height * 0.06 + (width * 0.015));
  }

  if (opt3 == true) {
    stroke(black);
    fill(black);
    strokeWeight(3);
    rect(width * 0.75, height * 0.05, width * 0.06, width * 0.03, 10, 10, 10, 10);
    strokeWeight(1);
    fill(backgroundColor);
    stroke(backgroundColor);
    //BAR TEXT
    text("SOUTH", width * 0.78 - (textWidth("SOUTH") / 2), height * 0.06 + (width * 0.015));
    for (var r = 0; r < count; r++) {
      drawTriangle(r);
    }
  } else {
    stroke(black);
    fill(backgroundColor);
    strokeWeight(3);
    rect(width * 0.75, height * 0.05, width * 0.06, width * 0.03, 10, 10, 10, 10);
    strokeWeight(1);
    fill(black);
    stroke(black);
    //BAR TEXT
    text("SOUTH", width * 0.78 - (textWidth("SOUTH") / 2), height * 0.06 + (width * 0.015));
  }

  if (opt4 == true) {
    stroke(black);
    fill(black);
    strokeWeight(3);
    rect(width * 0.825, height * 0.05, width * 0.06, width * 0.03, 10, 10, 10, 10);
    strokeWeight(1);
    fill(backgroundColor);
    stroke(backgroundColor);
    //BAR TEXT
    text("WEST", width * 0.855 - (textWidth("WEST") / 2), height * 0.06 + (width * 0.015));
    for (var r = 0; r < count; r++) {
      drawTriangle(r);
    }
  }else {
    stroke(black);
    fill(backgroundColor);
    strokeWeight(3);
    rect(width * 0.825, height * 0.05, width * 0.06, width * 0.03, 10, 10, 10, 10);
    strokeWeight(1);
    fill(black);
    stroke(black);
    //BAR TEXT
    text("WEST", width * 0.855 - (textWidth("WEST") / 2), height * 0.06 + (width * 0.015));
  }
}