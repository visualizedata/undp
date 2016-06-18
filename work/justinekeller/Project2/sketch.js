var table;
var reg = []; //array to pull region info
var cou = []; //array to pull country info
var region = []; //array to push region info to
var country = []; //array to push country info to
var MF = []; //array to pull schooling female info into
var MM = []; //array to pull schooling male info into
var MYSF = []; //array to push schooling female info into
var MYSM = []; //array to push schooling male info into
var EF = []; //array to pull income female into
var EM = []; //array to pull income male into
var EGNIF = []; //array to push income female into
var EGNIM = []; //array to push income male into
var diam = []; //diameter of arc, difference of income male and income female
var c1 = []; //array for larger income value either male or female
var c2 = []; //array for smaller income value either male or female
var egnip = []; //array for percentage of income
var w = 0; // counter
var sans; //font
var EGNIFR = [];
var EGNIMR = [];
var ml;
var plys = [];

function setup() {
  sans = loadFont("Raleway-Regular.otf");
  createCanvas(windowWidth, windowHeight);
  noLoop();
  table = loadTable("EGNIMYS.tsv", "tsv", "header", showData);
}

function showData() {
  for (var i = 0; i < table.getRowCount(); i++) {
    var currentRow = table.getRow(i);
    reg = currentRow.getString(0);
    cou = currentRow.getString(1);
    MF = currentRow.getNum(2);
    MM = currentRow.getNum(3);
    EF = currentRow.getNum(4);
    EM = currentRow.getNum(5);
    region.push(reg);
    country.push(cou);
    MYSF.push(MF);
    MYSM.push(MM);
    EGNIM.push(EM / (windowWidth / 52));
    EGNIF.push(EF / (windowWidth / 52));
    egnip[i] = (1 - (EGNIF[i] / EGNIM[i])) * 100;
    diam[i] = abs(EGNIM[i] - EGNIF[i]);
    plys[i] = abs(MYSM[i] - MYSF[i]);
  }
  background(0, 0, 26);
  noStroke();
  fill(235);
  textFont(sans);
  textSize(24);
  text("Click or scroll over lines for More Information", windowWidth * 2 / 3 - 100, windowHeight / 25);
  textSize(20);
  fill(235);
  text("GNI", (windowWidth / 25) - 30, (windowHeight * 3 / 8) + 25);
  push();
  translate(windowWidth / 26, (windowHeight * 3 / 8));
  rotate(PI + HALF_PI);
  text("Mean Years Schooling", 0, 0);
  pop();
  textSize(26);
  text("Comparision of Gross National Income, Education (Mean Years of Schooling), and Gender", windowWidth / 25, windowHeight * 24 / 25);
  for (var k = 0; k < table.getRowCount(); k++) {
    if (EGNIM[k] < EGNIF[k]) {
      c1[k] = EGNIF[k];
      c2[k] = EGNIM[k];
    } else {
      c1[k] = EGNIM[k];
      c2[k] = EGNIF[k];
    }
    //arcs
    stroke(100);
    strokeWeight(2);
    noFill();
    arc((diam[k] / 2) + (windowWidth / 25) + c2[k], (windowHeight * 3 / 8), diam[k], diam[k], 0, PI);
    //school lines
    strokeWeight(2);
    stroke(121, 181, 231);
    line((windowWidth / 25) + EGNIF[k], (windowHeight * 3 / 8), (windowWidth / 25) + EGNIF[k], (windowHeight * 3 / 8) - (MYSF[k] * 18));
    stroke(225, 225, 94);
    line((windowWidth / 25) + EGNIM[k], (windowHeight * 3 / 8), (windowWidth / 25) + EGNIM[k], (windowHeight * 3 / 8) - (MYSM[k] * 18));
  }
}

function mouseReleased() {
  if (mouseReleased) {
    w = w + 1; // counter
    if (w > 43) { //if counter gets before start leave at first country
      w = 0;
      noStroke();
      fill(0, 51, 102);
      rect(0, 0, windowWidth, windowHeight);
      for (var l in EGNIF) {
        stroke(100);
        strokeWeight(2);
        noFill();
        arc((diam[l] / 2) + (windowWidth / 25) + c2[l], (windowHeight * 3 / 8), diam[l], diam[l], 0, PI);
        strokeWeight(2);
        stroke(121, 181, 231);
        line((windowWidth / 25) + EGNIF[l], (windowHeight * 3 / 8), (windowWidth / 25) + EGNIF[l], (windowHeight * 3 / 8) - (MYSF[l] * 18));
        stroke(225, 225, 94);
        line((windowWidth / 25) + EGNIM[l], (windowHeight * 3 / 8), (windowWidth / 25) + EGNIM[l], (windowHeight * 3 / 8) - (MYSM[l] * 18));
        textSize(20);
        fill(235);
        text("GNI", (windowWidth / 25) - 30, (windowHeight * 3 / 8) + 25);
        push();
        translate(windowWidth / 26, (windowHeight * 3 / 8));
        rotate(PI + HALF_PI);
        text("Mean Years Schooling", 0, 0);
        pop();
        textSize(20);
        // text("Comparision of Gross National Income, Education (Mean Years of Schooling), and Gender", windowWidth /2, 20, windowWidth - 15, (windowHeight * 3 / 8) - (250));
      }
    }
    noStroke();
    fill(0, 0, 26);
    rect(0, 0, windowWidth, windowHeight);
    for (var j in EGNIF) {
      stroke(100);
      strokeWeight(2);
      noFill();
      arc((diam[j] / 2) + (windowWidth / 25) + c2[j], (windowHeight * 3 / 8), diam[j], diam[j], 0, PI);
      strokeWeight(2);
      stroke(19, 79, 129);
      line((windowWidth / 25) + EGNIF[j], (windowHeight * 3 / 8), (windowWidth / 25) + EGNIF[j], (windowHeight * 3 / 8) - (MYSF[j] * 18));
      stroke(123, 123, 0);
      line((windowWidth / 25) + EGNIM[j], (windowHeight * 3 / 8), (windowWidth / 25) + EGNIM[j], (windowHeight * 3 / 8) - (MYSM[j] * 18));
    }
    noStroke();
    fill(235);
    textFont(sans);
    textSize(30);
    text(country[w], 25, windowHeight - 110);
    fill(121, 181, 231);
    textSize(18);
    text("Estimated GNI Female: ", 25, windowHeight - 90);
    text("Mean Years Schooling Female: ", 25, windowHeight - 70);
    fill(225, 225, 94);
    text("Estimated GNI Male: ", 25, windowHeight - 50);
    text("Mean Years Schooling Male: ", 25, windowHeight - 30);
    fill(235);
    textSize(20);
    text("$" + round(EGNIF[w] * (windowWidth / 52)), 25 + textWidth("Estimated GNI Female:"), windowHeight - 90);
    text("$" + round(EGNIM[w] * (windowWidth / 52)), 25 + textWidth("Estimated GNI Male:"), windowHeight - 50);
    text(MYSF[w] + " years", 25 + textWidth("Mean Years Schooling Female:"), windowHeight - 70);
    text(MYSM[w] + " years", 25 + textWidth("Mean Years Schooling Male:"), windowHeight - 30);

    strokeWeight(3);
    noFill();
    stroke(235);
    arc((diam[w] / 2) + (windowWidth / 25) + c2[w], (windowHeight * 3 / 8), diam[w], diam[w], 0, PI);
    stroke(121, 181, 231);
    line((windowWidth / 25) + EGNIF[w], (windowHeight * 3 / 8), (windowWidth / 25) + EGNIF[w], (windowHeight * 3 / 8) - (MYSF[w] * 18));
    stroke(225, 225, 94);
    line((windowWidth / 25) + EGNIM[w], (windowHeight * 3 / 8), (windowWidth / 25) + EGNIM[w], (windowHeight * 3 / 8) - (MYSM[w] * 18));
    noStroke();
    textSize(20);
    fill(235);
    text("GNI", (windowWidth / 25) - 30, (windowHeight * 3 / 8) + 25);
    push();
    translate(windowWidth / 26, (windowHeight * 3 / 8));
    rotate(PI + HALF_PI);
    text("Mean Years Schooling", 0, 0);
    pop();
    textSize(24);
     fill(235);
  textFont(sans);
  if(MYSF[w] < MYSM[w]){
    ml = nfc(plys[w],2) + " less years than ";
  }
  if(MYSF[w]>MYSM[w]){
    ml = nfc(plys[w],2) + " more years than ";
  }
  if(MYSF[w] == MYSM[w]){
    ml = "the same number of years as ";
  }
  text("In " + country[w] + " women earn " + round(egnip[w]) + "% less than men,", (windowWidth * 2 / 3) - 100, windowHeight / 25);
  text("and women attend school for " + ml + "men.", (windowWidth * 2 / 3) - 100, (windowHeight / 25) + 2, windowWidth / 3, 100);
  }
}

function mouseMoved() {

  var counter2 = 0;
  var counter3 = 0;

  noStroke();
  fill(0, 0, 26);
  rect(0, 0, windowWidth, windowHeight);
  for (var j in EGNIF) {


    var fvalue = (windowWidth / 25) + EGNIF[j];
    var mvalue = (windowWidth / 25) + EGNIM[j];
    if (mouseX < fvalue + 4 && mouseX > fvalue - 4) {
      if (mouseY < windowHeight * 3 / 8 && mouseY > (windowHeight * 3 / 8) - (MYSF[j] * 20)) {
        w = counter2;
      }
    }
    if (mouseX < mvalue + 4 && mouseX > mvalue - 4) {
      if (mouseY < windowHeight * 3 / 8 && mouseY > (windowHeight * 3 / 8) - (MYSM[j] * 20)) {
        w = counter3;
      }
    }
    counter3++;
    counter2++;
    stroke(100);
    strokeWeight(2);
    noFill();
    arc((diam[j] / 2) + (windowWidth / 25) + c2[j], (windowHeight * 3 / 8), diam[j], diam[j], 0, PI);
    strokeWeight(2);
    stroke(19, 79, 129);
    line((windowWidth / 25) + EGNIF[j], (windowHeight * 3 / 8), (windowWidth / 25) + EGNIF[j], (windowHeight * 3 / 8) - (MYSF[j] * 18));
    stroke(123, 123, 0);
    line((windowWidth / 25) + EGNIM[j], (windowHeight * 3 / 8), (windowWidth / 25) + EGNIM[j], (windowHeight * 3 / 8) - (MYSM[j] * 18));
  }
  textAlign(CENTER);
  textFont(sans);
  textSize(30);
  noStroke();
  fill(235);
  text(country[w], (windowWidth / 25) + EGNIF[w] + (diam[w] / 2), (windowHeight * 3 / 8) + (diam[w] / 2) + 25);
  textAlign(LEFT);
  text(country[w], 25, windowHeight - 110);
  fill(121, 181, 231);
  textSize(18);
  text("Estimated GNI Female: ", 25, windowHeight - 90);
  text("Mean Years Schooling Female: ", 25, windowHeight - 70);
  fill(225, 225, 94);
  text("Estimated GNI Male: ", 25, windowHeight - 50);
  text("Mean Years Schooling Male: ", 25, windowHeight - 30);

  fill(235);
  textSize(20);
  text("$" + round(EGNIF[w] * (windowWidth / 52)), 25 + textWidth("Estimated GNI Female:"), windowHeight - 90);
  text("$" + round(EGNIM[w] * (windowWidth / 52)), 25 + textWidth("Estimated GNI Male:"), windowHeight - 50);
  text(MYSF[w] + " years", 25 + textWidth("Mean Years Schooling Female:"), windowHeight - 70);
  text(MYSM[w] + " years", 25 + textWidth("Mean Years Schooling Male:"), windowHeight - 30);
  // fill(235);
  // text("$" + round(EGNIF[w] * (windowWidth / 52)), (windowWidth / 25) + EGNIF[w], (windowHeight * 3 / 8) + 25);
  // text("$" + round(EGNIM[w] * (windowWidth / 52)), (windowWidth / 25) + EGNIM[w], (windowHeight * 3 / 8) + 25);
  // text(MYSF[w] + " years", (windowWidth / 25) + EGNIF[w], (windowHeight * 3 / 8) - (MYSF[w] * 18) - 15);
  // text(MYSM[w] + " years", (windowWidth / 25) + EGNIM[w], (windowHeight * 3 / 8) - (MYSM[w] * 18) - 15);
  strokeWeight(3);
  noFill();
  stroke(235);
  arc((diam[w] / 2) + (windowWidth / 25) + c2[w], (windowHeight * 3 / 8), diam[w], diam[w], 0, PI);
  stroke(121, 181, 231);
  line((windowWidth / 25) + EGNIF[w], (windowHeight * 3 / 8), (windowWidth / 25) + EGNIF[w], (windowHeight * 3 / 8) - (MYSF[w] * 18));
  stroke(225, 225, 94);
  line((windowWidth / 25) + EGNIM[w], (windowHeight * 3 / 8), (windowWidth / 25) + EGNIM[w], (windowHeight * 3 / 8) - (MYSM[w] * 18));
  noStroke();
  textSize(20);
  fill(235);
  text("GNI", (windowWidth / 25) - 30, (windowHeight * 3 / 8) + 25);
  push();
  translate(windowWidth / 26, (windowHeight * 3 / 8));
  rotate(PI + HALF_PI);
  text("Mean Years Schooling", 0, 0);
  pop();
   textSize(24);
     fill(235);
  textFont(sans);
    if(MYSF[w] < MYSM[w]){
    ml = nfc(plys[w],2) + " less years than ";
  }
  if(MYSF[w]>MYSM[w]){
    ml = nfc(plys[w],2) + " more years than ";
  }
  if(MYSF[w] == MYSM[w]){
    ml = "the same number of years as ";
  }
  
  text("In " + country[w] + " women earn " + round(egnip[w]) + "% less than men,", (windowWidth * 2 / 3) - 100, windowHeight / 25);
  text("and women attend school for " + ml + "men.", (windowWidth * 2 / 3) - 100, (windowHeight / 25) + 2, windowWidth / 3, 100);
}

function draw() {}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}