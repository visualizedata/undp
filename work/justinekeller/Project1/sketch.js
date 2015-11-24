var table; // full list
var table2; // clean table
var countryFull = []; //full country list array
var country = []; //cleaned country array
var HDIF = []; // human development index female
var HDIM = []; //human development index male
var k = 0; // counter
var isOverBlock;
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
  table = loadTable("HDI.tsv", "tsv", "header", showData);
  table2 = loadTable("HDIclean.tsv", "tsv", "header", showData);
  background(255);
}

function showData() {
    textAlign(CENTER);
    textSize(18);
    textFont(sans2);
    text("Use Arrow Keys to View Country Human Develop Index Gender Gap and Mouse over for more Information", windowWidth / 4, windowHeight / 2, windowWidth / 4 + 200, windowHeight /2 + 50); //begining click here text
    textSize(24);
    textAlign(LEFT);
    text("Human Development Index Gender Gap", windowWidth /3, windowHeight/20);
    //coutnry list
    for (var i = 0; i < table.getRowCount(); i++) {
      var currentRow = table.getRow(i);
      countryFull = currentRow.getString(1); // pull full list of countries
      textSize(14); // list text size
      fill(150); // list text color
      textFont(sans2); //list text font
      text(countryFull, (windowWidth * 13 / 15), (10 + [i] * 15)); // coutnry list
    }
    console.log(windowWidth);
    //country list and HDIF/ HDIM for main graphic
    for (var j = 0; j < table2.getRowCount(); j++) {
      var countrya = table2.getString(j, 1);
      var HDIFa = table2.getNum(j, 2);
      var HDIMa = table2.getNum(j, 3);
      country.push(countrya);
      HDIF.push(HDIFa);
      HDIM.push(HDIMa);
      // console.log(country;
      // console.log(HDIF);
      // console.log(HDIM);
    }
  }
  
function keyPressed() {
  // interaction with keys to cycle through countries
  if (keyCode === LEFT_ARROW) {
    noStroke();
    fill(255); // clear background
    rect(0, ((windowHeight / 2) - 100), (windowWidth * 13 / 15) - 10, 400); // clearbackground
    rect((windowWidth * 13 / 15) - 10, 2, 10, (windowHeight) - 2);

    k = k - 1; //decrease counter
    if (k === -1) { //if counter gets before start leave at first country
      k = 0;
    }

    textSize(100); //graphic text size
    textFont(sans); //graphic text font
    fill(50); // graphic text color
    text(country[k].toUpperCase(), windowWidth * 2 / 25 + 25, windowHeight / 2); //make graphic uppercase of countries and postion
    textSize(12); //gender gap text
    text("Gender Gap", windowWidth / 30, ((windowHeight / 2) - (100 * HDIF[k])) - 10, windowWidth / 25, ((windowHeight / 2) - (100 * HDIF[k])) + 10);
    fill(255); //rectangle fill
    rect(105, (windowHeight / 2) - (100 * HDIF[k]), 960, (100 * (HDIM[k] - HDIF[k]))); //rectangle of gap
    //Legend
    stroke(25);
    line(windowWidth * 2 / 25 + 5, windowHeight / 2, windowWidth * 2 / 25 + 5, windowHeight / 2 - 88);
    line(windowWidth * 2 / 25 + 5, windowHeight / 2, windowWidth * 2 / 25 + 10, windowHeight / 2);
    line(windowWidth * 2 / 25 + 5, windowHeight / 2 - 88, windowWidth * 2 / 25 + 10, windowHeight / 2 - 88);
    noStroke();
    fill(100);
    textFont(sans2);
    textSize(14);
    text("Human Development Index", windowWidth * 2 / 25 + 5, windowHeight / 2 + 16);
    fill(150);
    textSize(11);
    textAlign(RIGHT);
    text("0", windowWidth * 2 / 25, (windowHeight / 2) + 8);
    text("0.25", windowWidth * 2 / 25, (windowHeight / 2) - 14);
    text("0.5", windowWidth * 2 / 25, (windowHeight / 2) - 36);
    text("0.75", windowWidth * 2 / 25, (windowHeight / 2) - 58);
    text("1", windowWidth * 2 / 25, (windowHeight / 2) - 80);
    textAlign(LEFT);

    fill(50); //boxes
    if (k === 0) {
      rect((windowWidth * 13 / 15) - 8, 15, 3, 10);
    }
    if (k === 1) {
      rect((windowWidth * 13 / 15) - 8, 30, 3, 10);
    }
    if (k === 2) {
      rect((windowWidth * 13 / 15) - 8, 45, 3, 10);
    }
    if (k === 3) {
      rect((windowWidth * 13 / 15) - 8, 60, 3, 10);
    }
    if (k === 4) {
      rect((windowWidth * 13 / 15) - 8, 105, 3, 10);
    }
    if (k === 5) {
      rect((windowWidth * 13 / 15) - 8, 120, 3, 10);
    }
    if (k === 6) {
      rect((windowWidth * 13 / 15) - 8, 180, 3, 10);
    }
    if (k === 7) {
      rect((windowWidth * 13 / 15) - 8, 195, 3, 10);
    }
    if (k === 8) {
      rect((windowWidth * 13 / 15) - 8, 210, 3, 10);
    }
    if (k === 9) {
      rect((windowWidth * 13 / 15) - 8, 225, 3, 10);
    }
    if (k === 10) {
      rect((windowWidth * 13 / 15) - 8, 240, 3, 10);
    }
    if (k === 11) {
      rect((windowWidth * 13 / 15) - 8, 255, 3, 10);
    }
    if (k === 12) {
      rect((windowWidth * 13 / 15) - 8, 270, 3, 10);
    }
    if (k === 13) {
      rect((windowWidth * 13 / 15) - 8, 345, 3, 10);
    }
    if (k === 14) {
      rect((windowWidth * 13 / 15) - 8, 360, 3, 10);
    }
    if (k === 15) {
      rect((windowWidth * 13 / 15) - 8, 375, 3, 10);
    }
    if (k === 16) {
      rect((windowWidth * 13 / 15) - 8, 390, 3, 10);
    }
    if (k === 17) {
      rect((windowWidth * 13 / 15) - 8, 405, 3, 10);
    }
    if (k === 18) {
      rect((windowWidth * 13 / 15) - 8, 420, 3, 10);
    }
    if (k === 19) {
      rect((windowWidth * 13 / 15) - 8, 435, 3, 10);
    }
    if (k === 20) {
      rect((windowWidth * 13 / 15) - 8, 450, 3, 10);
    }
    if (k === 21) {
      rect((windowWidth * 13 / 15) - 8, 465, 3, 10);
    }
    if (k === 22) {
      rect((windowWidth * 13 / 15) - 8, 480, 3, 10);
    }
    if (k === 23) {
      rect((windowWidth * 13 / 15) - 8, 495, 3, 10);
    }
    if (k === 24) {
      rect((windowWidth * 13 / 15) - 8, 510, 3, 10);
    }
    if (k === 25) {
      rect((windowWidth * 13 / 15) - 8, 540, 3, 10);
    }
    if (k === 26) {
      rect((windowWidth * 13 / 15) - 8, 555, 3, 10);
    }
    if (k === 27) {
      rect((windowWidth * 13 / 15) - 8, 570, 3, 10);
    }
    if (k === 28) {
      rect((windowWidth * 13 / 15) - 8, 630, 3, 10);
    }
    if (k === 29) {
      rect((windowWidth * 13 / 15) - 8, 645, 3, 10);
    }
    if (k === 30) {
      rect((windowWidth * 13 / 15) - 8, 675, 3, 10);
    }
    if (k === 31) {
      rect((windowWidth * 13 / 15) - 8, 690, 3, 10);
    }
    if (k === 32) {
      rect((windowWidth * 13 / 15) - 8, 705, 3, 10);
    }
    if (k === 33) {
      rect((windowWidth * 13 / 15) - 8, 720, 3, 10);
    }
    if (k === 34) {
      rect((windowWidth * 13 / 15) - 8, 735, 3, 10);
    }
    if (k === 35) {
      rect((windowWidth * 13 / 15) - 8, 750, 3, 10);
    }
    if (k === 36) {
      rect((windowWidth * 13 / 15) - 8, 765, 3, 10);
    }
    if (k === 37) {
      rect((windowWidth * 13 / 15) - 8, 780, 3, 10);
    }

  } else if (keyCode === RIGHT_ARROW) {
    noStroke();
    fill(255); // clear background
    rect(0, ((windowHeight / 2) - 100), (windowWidth * 13 / 15) - 10, 400); // clearbackground
    rect((windowWidth * 13 / 15) - 10, 2, 10, (windowHeight) - 2);
    k = k + 1; //increase counter
    if (k === 38) { //at end keep at last country
      k = 37;
    }

    textSize(100); //graphic text size
    textFont(sans); //graphic text font
    fill(50); // graphic text color
    text(country[k].toUpperCase(), windowWidth * 2 / 25 + 25, windowHeight / 2); //make graphic uppercase of countries and postion
    textSize(12); //gender gap text
    text("Gender Gap", windowWidth / 30, ((windowHeight / 2) - (100 * HDIF[k])) - 10, windowWidth / 25, ((windowHeight / 2) - (100 * HDIF[k])) + 10);
    fill(255); //rectangle fill
    rect(105, (windowHeight / 2) - (100 * HDIF[k]), 960, (100 * (HDIM[k] - HDIF[k]))); //rectangle of gap
    //Legend
    stroke(25);
    line(windowWidth * 2 / 25 + 5, windowHeight / 2, windowWidth * 2 / 25 + 5, windowHeight / 2 - 88);
    line(windowWidth * 2 / 25 + 5, windowHeight / 2, windowWidth * 2 / 25 + 10, windowHeight / 2);
    line(windowWidth * 2 / 25 + 5, windowHeight / 2 - 88, windowWidth * 2 / 25 + 10, windowHeight / 2 - 88);
    noStroke();
    fill(100);
    textFont(sans2);
    textSize(14);
    text("Human Development Index", windowWidth * 2 / 25 + 5, windowHeight / 2 + 16);
    fill(150);
    textSize(11);
    textAlign(RIGHT);
    text("0", windowWidth * 2 / 25, (windowHeight / 2) + 8);
    text("0.25", windowWidth * 2 / 25, (windowHeight / 2) - 14);
    text("0.5", windowWidth * 2 / 25, (windowHeight / 2) - 36);
    text("0.75", windowWidth * 2 / 25, (windowHeight / 2) - 58);
    text("1", windowWidth * 2 / 25, (windowHeight / 2) - 80);
    textAlign(LEFT);

    fill(50); //boxes
    if (k === 0) {
      rect((windowWidth * 13 / 15) - 8, 15, 3, 10);
    }
    if (k === 1) {
      rect((windowWidth * 13 / 15) - 8, 30, 3, 10);
    }
    if (k === 2) {
      rect((windowWidth * 13 / 15) - 8, 45, 3, 10);
    }
    if (k === 3) {
      rect((windowWidth * 13 / 15) - 8, 60, 3, 10);
    }
    if (k === 4) {
      rect((windowWidth * 13 / 15) - 8, 105, 3, 10);
    }
    if (k === 5) {
      rect((windowWidth * 13 / 15) - 8, 120, 3, 10);
    }
    if (k === 6) {
      rect((windowWidth * 13 / 15) - 8, 180, 3, 10);
    }
    if (k === 7) {
      rect((windowWidth * 13 / 15) - 8, 195, 3, 10);
    }
    if (k === 8) {
      rect((windowWidth * 13 / 15) - 8, 210, 3, 10);
    }
    if (k === 9) {
      rect((windowWidth * 13 / 15) - 8, 225, 3, 10);
    }
    if (k === 10) {
      rect((windowWidth * 13 / 15) - 8, 240, 3, 10);
    }
    if (k === 11) {
      rect((windowWidth * 13 / 15) - 8, 255, 3, 10);
    }
    if (k === 12) {
      rect((windowWidth * 13 / 15) - 8, 270, 3, 10);
    }
    if (k === 13) {
      rect((windowWidth * 13 / 15) - 8, 345, 3, 10);
    }
    if (k === 14) {
      rect((windowWidth * 13 / 15) - 8, 360, 3, 10);
    }
    if (k === 15) {
      rect((windowWidth * 13 / 15) - 8, 375, 3, 10);
    }
    if (k === 16) {
      rect((windowWidth * 13 / 15) - 8, 390, 3, 10);
    }
    if (k === 17) {
      rect((windowWidth * 13 / 15) - 8, 405, 3, 10);
    }
    if (k === 18) {
      rect((windowWidth * 13 / 15) - 8, 420, 3, 10);
    }
    if (k === 19) {
      rect((windowWidth * 13 / 15) - 8, 435, 3, 10);
    }
    if (k === 20) {
      rect((windowWidth * 13 / 15) - 8, 450, 3, 10);
    }
    if (k === 21) {
      rect((windowWidth * 13 / 15) - 8, 465, 3, 10);
    }
    if (k === 22) {
      rect((windowWidth * 13 / 15) - 8, 480, 3, 10);
    }
    if (k === 23) {
      rect((windowWidth * 13 / 15) - 8, 495, 3, 10);
    }
    if (k === 24) {
      rect((windowWidth * 13 / 15) - 8, 510, 3, 10);
    }
    if (k === 25) {
      rect((windowWidth * 13 / 15) - 8, 540, 3, 10);
    }
    if (k === 26) {
      rect((windowWidth * 13 / 15) - 8, 555, 3, 10);
    }
    if (k === 27) {
      rect((windowWidth * 13 / 15) - 8, 570, 3, 10);
    }
    if (k === 28) {
      rect((windowWidth * 13 / 15) - 8, 630, 3, 10);
    }
    if (k === 29) {
      rect((windowWidth * 13 / 15) - 8, 645, 3, 10);
    }
    if (k === 30) {
      rect((windowWidth * 13 / 15) - 8, 675, 3, 10);
    }
    if (k === 31) {
      rect((windowWidth * 13 / 15) - 8, 690, 3, 10);
    }
    if (k === 32) {
      rect((windowWidth * 13 / 15) - 8, 705, 3, 10);
    }
    if (k === 33) {
      rect((windowWidth * 13 / 15) - 8, 720, 3, 10);
    }
    if (k === 34) {
      rect((windowWidth * 13 / 15) - 8, 735, 3, 10);
    }
    if (k === 35) {
      rect((windowWidth * 13 / 155) - 8, 750, 3, 10);
    }
    if (k === 36) {
      rect((windowWidth * 13 / 15) - 8, 765, 3, 10);
    }
    if (k === 37) {
      rect((windowWidth * 13 / 15) - 8, 780, 3, 10);
    }
  }
}

function mouseMoved(){
  
    var distance = dist(mouseX, mouseY, windowWidth * 2 / 25 + 225, windowHeight / 2);
    if (distance < 200) {
      isOverBlock = true;
    } else {
      isOverBlock = false;
    }
    if (isOverBlock === true) {
      fill(255);
      rect(windowWidth * 2 / 25 + 25, windowHeight * 2 /3 - 25 , windowWidth * 10 / 15, windowHeight / 3 );
      textSize(18);
      textFont(sans3);
      noFill();
      stroke(50);
      rect(windowWidth * 2 /25 + 30, windowHeight * 2 /3 - 15, windowWidth * 2 / 25 + 120, 75);
      fill(150);
      noStroke();
      text("HDI Female: " + HDIF[k], windowWidth * 2 / 25 + 50, (windowHeight * 2 / 3) + 15);
      text("HDI Male: " + HDIM[k],  windowWidth * 2 / 25 + 50, (windowHeight * 2 / 3) + 40);
    }
    }