var reg = []; //array to pull region info
var cou = []; //array to pull country info
var region = []; //array to push region info to
var country = []; //array to push country info to
var MYSF = []; //array to push schooling female info into
var MYSM = []; //array to push schooling male info into
var EF = []; //array to pull income female into
var EM = []; //array to pull income male into
var EGF = [];
var EGM = [];
var EGNIF = []; //array to push income female into
var EGNIM = []; //array to push income male into
var diam = []; //diameter of arc, difference of income male and income female
var c1 = []; //array for larger income value either male or female
var c2 = []; //array for smaller income value either male or female
var egnip = []; //array for percentage of income
var w = 0; // counter
var sans; //font

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
    EGNIM.push(EM / 19);
    EGNIF.push(EF / 19);
    // console.log(EGF[i] + " " + EGM[i]);
    // EGNIM[i] = map(EGM[i], 0, 1650, 1650,0);
    // EGNIF[i] = map(EGF[i],0,1650, 1650,0);
    // console.log(EGNIF[i] + " " + EGNIM[i]);
    egnip[i] = (EGNIF[i] / EGNIM[i]) * 100;
    // console.log(egnip[i]);
    diam[i] = abs(EGNIM[i] - EGNIF[i]);
  }
  background(0, 0, 15);
  noStroke();
  fill(235);
  textFont(sans);
  textSize(18);
  text("Click for More Information", 25, windowHeight - 110);
  fill(135);
  textSize(14);
  text("$0", (windowWidth / 25), (windowHeight * 3 / 8) + 25);
  text("$33,000", (windowWidth - 15), (windowHeight * 3 / 8) + 25);
  text("0 years", (windowWidth / 25) - 40, (windowHeight * 3 / 8));
  text("10 years", (windowWidth / 25) - 40, (windowHeight * 3 / 8) - (200));
  textSize(16);
  fill(235);
  text("GNI", (windowWidth / 25) - 30, (windowHeight * 3 / 8) + 25);
  text("Mean Years Schooling", (windowWidth / 25) - 50, (windowHeight * 3 / 8) - 130, (windowWidth / 25) - 25, (windowHeight * 3 / 8) - 90);
  textSize(20);
  text("Comparision of Gross National Income, Education (Mean Years of Schooling), and Gender", windowWidth - 400, 20, windowWidth - 15, (windowHeight * 3 / 8) - (250));
  for (var k = 0; k < table.getRowCount(); k++) {
    if (EGNIM[k] < EGNIF[k]) {
      c1[k] = EGNIF[k];
      c2[k] = EGNIM[k];
    } else {
      c1[k] = EGNIM[k];
      c2[k] = EGNIF[k];
    }

    stroke(100);
    strokeWeight(2);
    noFill();
    arc((diam[k] / 2) + (windowWidth / 25) + c2[k], (windowHeight * 3 / 8), diam[k], diam[k], 0, PI);
    console.log(EGNIM[k] - EGNIF[k]);
    console.log("=============");
    console.log(diam[k]);

    //school lines
    strokeWeight(2);
    stroke(255, 73, 0);
    line((windowWidth / 25) + EGNIF[k], (windowHeight * 3 / 8), (windowWidth / 25) + EGNIF[k], (windowHeight * 3 / 8) - (MYSF[k] * 20));
    stroke(0, 218, 125);
    line((windowWidth / 25) + EGNIM[k], (windowHeight * 3 / 8), (windowWidth / 25) + EGNIM[k], (windowHeight * 3 / 8) - (MYSM[k] * 20));
    // console.log(k * 10);
    // console.log(MYSM[k]);
    // console.log(MYSF[k]);
  }
}

function mouseReleased() {
  if (mouseReleased) {
    w = w + 1; // counter
    if (w > 43) { //if counter gets before start leave at first country
      w = 0;
      noStroke();
      fill(0, 0, 15);
      rect(0, 0, windowWidth, windowHeight);
      for (var l in EGNIF) {
        stroke(100);
        strokeWeight(2);
        noFill();
        arc((diam[l] / 2) + (windowWidth / 25) + c2[l], (windowHeight * 3 / 8), diam[l], diam[l], 0, PI);
        strokeWeight(2);
        stroke(255, 73, 0);
        line((windowWidth / 25) + EGNIF[l], (windowHeight * 3 / 8), (windowWidth / 25) + EGNIF[l], (windowHeight * 3 / 8) - (MYSF[l] * 20));
        stroke(0, 218, 125);
        line((windowWidth / 25) + EGNIM[l], (windowHeight * 3 / 8), (windowWidth / 25) + EGNIM[l], (windowHeight * 3 / 8) - (MYSM[l] * 20));
        fill(135);
        textSize(14);
        text("$0", (windowWidth / 25), (windowHeight * 3 / 8) + 25);
        text("$33,000", (windowWidth - 15), (windowHeight * 3 / 8) + 25);
        text("0 years", (windowWidth / 25) - 40, (windowHeight * 3 / 8));
        text("10 years", (windowWidth / 25) - 40, (windowHeight * 3 / 8) - (200));
        textSize(16);
        fill(235);
        text("GNI", (windowWidth / 25) - 30, (windowHeight * 3 / 8) + 25);
        text("Mean Years Schooling", (windowWidth / 25) - 50, (windowHeight * 3 / 8) - 130, (windowWidth / 25) - 25, (windowHeight * 3 / 8) - 90);
        textSize(20);
        text("Comparision of Gross National Income, Education (Mean Years of Schooling), and Gender", windowWidth - 400, 20, windowWidth - 15, (windowHeight * 3 / 8) - (250));
      }
    }
    noStroke();
    fill(0, 0, 15);
    rect(0, 0, windowWidth, windowHeight);
    for (var j in EGNIF) {
      stroke(100);
      strokeWeight(2);
      noFill();
      arc((diam[j] / 2) + (windowWidth / 25) + c2[j], (windowHeight * 3 / 8), diam[j], diam[j], 0, PI);
      strokeWeight(2);
      stroke(179, 51, 0);
      line((windowWidth / 25) + EGNIF[j], (windowHeight * 3 / 8), (windowWidth / 25) + EGNIF[j], (windowHeight * 3 / 8) - (MYSF[j] * 20));
      stroke(0, 143, 81);
      line((windowWidth / 25) + EGNIM[j], (windowHeight * 3 / 8), (windowWidth / 25) + EGNIM[j], (windowHeight * 3 / 8) - (MYSM[j] * 20));
    }
    noStroke();
    fill(235);
    textFont(sans);
    textSize(24);
    text(country[w], 25, windowHeight - 110);
    fill(255, 73, 0);
    textSize(14);
    text("Estimated GNI Female: ", 25, windowHeight - 90);
    text("Mean Years Schooling Female: ", 25, windowHeight - 70);
    fill(0, 218, 125);
    text("Estimated GNI Male: ", 25, windowHeight - 50);
    text("Mean Years Schooling Male: ", 25, windowHeight - 30);
    fill(235);
    textSize(16);
    text("$" + EGNIF[w] * 20, 25 + textWidth("Estimated GNI Female:"), windowHeight - 90);
    text("$" + EGNIM[w] * 20, 25 + textWidth("Estimated GNI Male:"), windowHeight - 50);
    text(MYSF[w] + " years", 25 + textWidth("Mean Years Schooling Female:"), windowHeight - 70);
    text(MYSM[w] + " years",  25 + textWidth("Mean Years Schooling Male:"), windowHeight - 30);

    strokeWeight(3);
    noFill();
    stroke(235);
    arc((diam[w] / 2) + (windowWidth / 25) + c2[w], (windowHeight * 3 / 8), diam[w], diam[w], 0, PI);
    stroke(255, 73, 0);
    line((windowWidth / 25) + EGNIF[w], (windowHeight * 3 / 8), (windowWidth / 25) + EGNIF[w], (windowHeight * 3 / 8) - (MYSF[w] * 20));
    stroke(0, 218, 125);
    line((windowWidth / 25) + EGNIM[w], (windowHeight * 3 / 8), (windowWidth / 25) + EGNIM[w], (windowHeight * 3 / 8) - (MYSM[w] * 20));
    noStroke();
    fill(135);
    textSize(14);
    text("$0", (windowWidth / 25), (windowHeight * 3 / 8) + 25);
    text("$33,000", (windowWidth - 15), (windowHeight * 3 / 8) + 25);
    text("0 years", (windowWidth / 25) - 40, (windowHeight * 3 / 8));
    text("10 years", (windowWidth / 25) - 40, (windowHeight * 3 / 8) - (200));
    textSize(16);
    fill(235);
    text("GNI", (windowWidth / 25) - 30, (windowHeight * 3 / 8) + 25);
    text("Mean Years Schooling", (windowWidth / 25) - 50, (windowHeight * 3 / 8) - 130, (windowWidth / 25) - 25, (windowHeight * 3 / 8) - 90);
    textSize(20);
    text("Comparision of Gross National Income, Education (Mean Years of Schooling), and Gender", windowWidth - 400, 20, windowWidth - 15, (windowHeight * 3 / 8) - (250));
  }
}

function draw() {}