var table;
var data = new Object;
var back = 85;
var tri = false;
var opt1 = true,
  opt2 = false,
  opt3 = false,
  opt4 = false,
  allOpt = false;
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
var halfway = [];
var hM = [];
var hF = [];
var ge18 = [];
var z = 0;
var latoReg, latoLight;
var areas = ["c", "e", "s", "w", "n"];
xLines = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7];
var lines = [];

/*-----------load fonts-----------*/
function preload() {
  latoLight = loadFont('Lato-Hairline.ttf');
  latoReg = loadFont('Lato-Light.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  /*-----------background----------*/
  var black = color(255);
  var backgroundColor = color(119, 136, 153);
  var groundColor = color(49, 56, 63);

  textFont(latoReg);
  background(backgroundColor);
  fill(groundColor);
  stroke(groundColor);
  strokeWeight(1);
  textSize(9);
  /*-----------load tsv-----------*/
  table = loadTable("data.txt", "tsv", "header", showData);
  rect(0, height * 0.9, width, height * 0.9);

  /*-----------title-----------*/
  textSize(33);
  stroke(black);
  fill(black);
  text("Child Marriages and the Gender Gap", width * 0.05, height * 0.05);
  line(width * 0.05, height * 0.065, width * 0.06 + textWidth("Child Marriages and the Gender Gap"), height * 0.065);
  textFont(latoLight);
  textSize(9);
  strokeWeight(0.7);
  text("This project explores the relationship between the percentage of women between the ages of 20 and 24 who were married before the age of 18 in select African countries, and how it compares to the UNDP’s Human Development Index (HDI). Each country is represented by a triangle, with the height defined by the percentage of child marriage, the left corner of the triangle base the female score on the HDI, and the right the male score on the HDI.", width * 0.05, height * 0.09, width * 0.4);
  textSize(8);

  /*-----------y-axis-----------*/
  fill(black);
  line(width - 25, height * 0.9, width - 25, height * 0.15);

  // text("0%", width - 22, height * 0.85);
  // text("100%", width - 22, height * 0.15);


  /*-----------x-axis-----------*/
  // fill(230);
  // stroke(230);
  // text("0.25", width * 0.03, height * 0.93);
  // text("0.65", width * 0.97, height * 0.93);

  textSize(11);
  text("Human Development Index", width / 2 - (textWidth("Human Development Index") / 2), height * 0.99);
  /*-----------X Lines-----------*/
  for (var r = 0; r < xLines.length; r++) {
    lines.push(map(xLines[r], 0.2, 0.7, width * 0.02, width * 0.97));
  }
  for (var r = 0; r < lines.length; r++) {
    fill(230);
    stroke(230);
    textSize(8);
    text(xLines[r], lines[r], height * 0.935);
    line(lines[r], height * 0.92, lines[r], height * 0.88)
  }
}

/*-----------sort data-----------*/
function showData() {
  var black = color(240, 250, 255);
  stroke(black);
  fill(black);
  count = table.getRowCount();
  for (var r = 0; r < count; r++) {

    country.push(table.getString(r, 0));
    var ge15 = table.getString(r, 1);
    ge18.push(table.getString(r, 2));
    hdi.push(table.getString(r, 3));
    hF.push(table.getString(r, 4));
    hM.push(table.getString(r, 5));
    region.push(table.getString(r, 8));
    hdiDiff.push(hM[r] - hF[r]);

    marriage18.push(map(ge18[r], 0, 100, height * 0.9, height * 0.15));
    hdiF.push(map(hF[r], 0.2, 0.7, width * 0.02, width * 0.97));
    hdiM.push(map(hM[r], 0.2, 0.7, width * 0.02, width * 0.97));

    stroke(black);
  }


  /*-----------buttons-----------*/
  handlePress();

  central = createButton('CENTRAL');
  central.class('mybutton');
  central.id('central');
  central.position(width * 0.675, height * 0.05);
  //  central.mousePressed(handlePress);

  east = createButton('  EASTERN  ');
  east.class('mybutton');
  east.id('east');
  east.position(width * 0.75, height * 0.05);
  //  east.mousePressed(handlePress);


  south = createButton('SOUTHERN  ');
  south.class('mybutton');
  south.id('south');
  south.position(width * 0.825, height * 0.05);
  //  south.mousePressed(handlePress);

  west = createButton(' WESTERN ');
  west.class('mybutton');
  west.id('west');
  west.position(width * 0.9, height * 0.05);
  //  west.mousePressed(handlePress);

  north = createButton(' ALL ');
  north.class('mybutton');
  north.id('all');
  north.position(width * 0.6, height * 0.05);
  //  north.mousePressed(handlePress);


  /*-----------buttons controls-----------*/
  $('#central').click(function() {
    if ($(this).hasClass('active')) {
      opt1 = false;
      $(this).removeClass('active');
    } else {
      opt1 = true;
      $(this).addClass('active');
    }
    handlePress();
  });

  $('#east').click(function() {
    if ($(this).hasClass('active')) {
      opt2 = false;
      console.log(opt2);
      $(this).removeClass('active');
    } else {
      opt2 = true;
      console.log(opt2);
      $(this).addClass('active');
    }
    handlePress();
  });

  $('#south').click(function() {
    if ($(this).hasClass('active')) {
      opt3 = false;
      console.log(opt3);
      $(this).removeClass('active');
    } else {
      opt3 = true;
      console.log(opt3);
      $(this).addClass('active');
    }
    handlePress();
  });


  $('#west').click(function() {
    if ($(this).hasClass('active')) {
      opt4 = false;
      console.log(opt4);
      $(this).removeClass('active');
    } else {
      opt4 = true;
      console.log(opt4);
      $(this).addClass('active');
    }
    handlePress();
  });


  $('#all').click(function() {
    if ($(this).hasClass('active')) {
      allOpt = false;
      $(this).removeClass('active');
    } else {
      allOpt = true;
      $(this).addClass('active');
    }
    handlePress();
  });


}

function handlePress() {
  var backgroundColor = color(119, 136, 153);
  fill(backgroundColor);
  noStroke()
  rect(0, height * 0.15, width, height * 0.75);
  /*-----------y-axis-----------*/
  stroke(255);
  line(width * 0.975, height * 0.9, width * 0.975, height * 0.15);

  text("0%", width - 22, height * 0.89);
  text("100%", width - 22, height * 0.17);
  line(width * 0.97, height * 0.9, width * 0.98, height * 0.9);
  line(width * 0.97, height * 0.15, width * 0.98, height * 0.15);
  stroke(255);
  textSize(11);
  push();
  translate(width * 0.99, height * 0.65);
  rotate(-HALF_PI);
  text("% of women married under age 18", 0, 0);
  pop();

  if (opt1) {
    drawTriangle(areas[0]);
  }
  if (opt2) {
    drawTriangle(areas[1]);
  }
  if (opt3) {
    drawTriangle(areas[2]);
  }
  if (opt4) {
    drawTriangle(areas[3]);
  }
  if (allOpt) {
    drawTriangle(areas[1]);
    drawTriangle(areas[2]);
    drawTriangle(areas[3]);
    drawTriangle(areas[4]);
  }
}

function mouseMoved() {
  for (var r = 0; r < region.length; r++) {
    var middle = ((hdiM[r] - hdiF[r]) * 0.5 + hdiF[r]);
    if (middle - mouseX <= 10 && middle - mouseX >= 0 && region[r] == "c" && opt1 == true) {
      selectTriangle(r);
    } else if (middle - mouseX <= 10 && middle - mouseX >= 0 && region[r] == "e" && opt2 == true) {
      selectTriangle(r);
    } else if (middle - mouseX <= 10 && middle - mouseX >= 0 && region[r] == "s" && opt3 == true) {
      selectTriangle(r);
    } else if (middle - mouseX <= 10 && middle - mouseX >= 0 && region[r] == "w" && opt4 == true) {
      selectTriangle(r);
    } else if (middle - mouseX <= 10 && middle - mouseX >= 0 && allOpt == true) {
      selectTriangle(r);
    }
  }

}

function drawTriangle(spot) {
  var mountainColor = color(25, 28, 32, 110);
  // stroke(83, 102, 115, 100);
  fill(mountainColor);
  for (var r = 0; r < region.length; r++) {
    if (region[r] == "e") {
      stroke(51, 51, 0);
    } else if (region[r] == "w") {
      stroke(0, 51, 51);
    } else if (region[r] == "c") {
      stroke(51, 0, 25);
    } else if (region[r] == "s") {
      stroke(0, 0, 51);
    }
    strokeWeight(1.2);
    // noStroke();
    if (spot == region[r]) {
      triangle((hdiM[r] - hdiF[r]) * 0.5 + hdiF[r], marriage18[r], hdiM[r], height * 0.9, hdiF[r], height * 0.9);
    }
  }
}

function selectTriangle(r) {
  var groundColor = color(49, 56, 63);
  fill(groundColor);
  stroke(groundColor);
  strokeWeight(1);
  textSize(9);
  rect(0, height * 0.9, width, height * 0.9);

  handlePress();
  var mountainColor = color(25, 28, 32);
  stroke(0);
  strokeWeight(1);
  fill(mountainColor);
  triangle((hdiM[r] - hdiF[r]) * 0.5 + hdiF[r], marriage18[r], hdiM[r], height * 0.9, hdiF[r], height * 0.9);
  fill(255);
  stroke(230, 230, 230, 200);
  for (i = 0; i < width * 0.8; i++) {
    ellipse(((hdiM[r] - hdiF[r]) * 0.5 + hdiF[r]) + (i * 6), marriage18[r], 0.5, 0.5);
  }

  /*-----------x-axis further information-----------*/
  fill(230);
  stroke(230);
  textSize(10);
  textAlign(LEFT);
  text(hM[r] + "  :" + "  Male Human Development Score", hdiM[r], height * 0.935);
  textAlign(RIGHT);
  text("Female Human Development Score :" + "  " + hF[r], hdiF[r], height * 0.935);


  line(hdiM[r], height * 0.92, hdiM[r], height * 0.9);
  line(hdiF[r], height * 0.92, hdiF[r], height * 0.9);
  textSize(14);
  textAlign(CENTER);
  text(country[r], (hdiM[r] - hdiF[r]) * 0.5 + hdiF[r], height * 0.96);
  textAlign(LEFT);
  textSize(11);
  text(ge18[r] + "%", width * 0.957, marriage18[r] - 5);
  text(width * 0.96, ge18[r], width * 0.98, ge18[r]);

  textSize(11);
  stroke(180);
  text("Human Development Index", width / 2 - (textWidth("Human Development Index") / 2), height * 0.99);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}