var table;
var region = [];
var HDIrank = [];
var code = [];
var country = [];
var HDIF = [];
var HDIM = [];
var LEF = [];
var LEM = [];
var MYSF = [];
var MYSM = [];
var EYSF = [];
var EYSM = [];
var EGNIF = [];
var EGNIM = [];
var mysg = 0;
var eysg = 0;
var l = 0; // counter x value
var m = 0;
var c = [0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 5, 6, 7]; //counter y value
var q = -1;
var d = 0;
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
  background(255);
  noLoop();
  table = loadTable("HDI3let.tsv", "tsv", "header", showData);
}

function showData() {
  for (var j = 0; j < table.getRowCount(); j++) { // pull in infromation from table
    var regiona = table.getString(j, 0);
    var HDIranka = table.getString(j, 1);
    var codea = table.getString(j, 2);
    var countrya = table.getString(j, 3);
    var HDIFa = table.getNum(j, 4);
    var HDIMa = table.getNum(j, 5);
    var LEFa = table.getNum(j, 6);
    var LEMa = table.getNum(j, 7);
    var MYSFa = table.getNum(j, 8);
    var MYSMa = table.getNum(j, 9);
    var EYSFa = table.getNum(j, 10);
    var EYSMa = table.getNum(j, 11);
    var EGNIFa = table.getNum(j, 12);
    var EGNIMa = table.getNum(j, 13);
    region.push(regiona);
    HDIrank.push(HDIranka);
    code.push(codea);
    country.push(countrya);
    HDIF.push(HDIFa);
    HDIM.push(HDIMa);
    LEF.push(LEFa);
    LEM.push(LEMa);
    MYSF.push(MYSFa);
    MYSM.push(MYSMa);
    EYSF.push(EYSFa);
    EYSM.push(EYSMa);
    EGNIF.push(EGNIFa);
    EGNIM.push(EGNIMa);
  }
  //title
  noStroke();
  fill(200);
  textFont(sans);
  textSize(30);
  textAlign(CENTER);
  text("Human Development Index Gender Gap", windowWidth / 2, windowHeight / 20);

  //list of 3 letter country codes
  for (var i in code) {
    if (i > 8 && i < 18) {
      l = 1;
    }
    if (i > 17 && i < 27) {
      l = 2;
    }
    if (i > 26 && i < 36) {
      l = 3;
    }
    if (i > 35 && i < 45) {
      l = 4;
    }
    if (i > 44 && i < 53) {
      l = 5;
    }
    textAlign(LEFT);
    noStroke();
    textSize(40);
    textFont(sans);
    fill(50);
    text(code[i].toUpperCase(), (windowWidth / 8) + (l * (windowWidth / 8)), (windowHeight / 4) + (c[i] * (windowHeight / 12)));
    fill(255);
    rect((windowWidth / 8) + (l * (windowWidth / 8)), (windowHeight / 4) + (c[i] * (windowHeight / 12)) - (40 * HDIF[i]), (windowWidth / 8), (40 * (HDIM[i] - HDIF[i])));
  }
}

function mouseMoved() {
  var count = 0;
  for (var k in code) {
    if (k > -1 && k < 9) {
      m = 0;
    }
    if (k > 8 && k < 18) {
      m = 1;
    }
    if (k > 17 && k < 27) {
      m = 2;
    }
    if (k > 26 && k < 36) {
      m = 3;
    }
    if (k > 35 && k < 45) {
      m = 4;
    }
    if (k > 44 && k < 53) {
      m = 5;
    }
    var xvalue = (windowWidth * 3 / 16) + (m * (windowWidth / 8));
    var yvalue = (windowHeight / 4) + (c[k] * (windowHeight / 12)) - (windowHeight / 24);
    if (mouseX < xvalue + (windowWidth / 16) && mouseX > xvalue - (windowWidth / 16)) {
      if (mouseY < yvalue + (windowHeight / 24) && mouseY > yvalue - (windowHeight / 24)) {
        q = count;
      }
    }
    count++;
    if (q > -1 && q < 9) {
      l = 0;
    }
    if (q > 8 && q < 18) {
      l = 1;
    }
    if (q > 17 && q < 27) {
      l = 2;
    }
    if (q > 26 && q < 36) {
      l = 3;
    }
    if (q > 35 && q < 45) {
      l = 4;
    }
    if (q > 44 && q < 53) {
      l = 5;
    }
    textFont(sans);
    fill(255);
    rect(windowWidth/8,windowHeight/6 + 10, windowWidth * 6/ 8, windowHeight * 5 /6 - 10);
    fill(50);
    textSize(40);
    var n = 0;
    for (var v in code) {
      if (v > -1 && v < 9) {
      }
      if (v > 8 && v < 18) {
        n = 1;
      }
      if (v > 17 && v < 27) {
        n = 2;
      }
      if (v > 26 && v < 36) {
        n = 3;
      }
      if (v > 35 && v < 45) {
        n = 4;
      }
      if (v > 44 && v < 53) {
        n = 5;
      }
      fill(50);
      text(code[v].toUpperCase(), (windowWidth / 8) + (n * (windowWidth / 8)), (windowHeight / 4) + (c[v] * (windowHeight / 12)));
    fill(255);
    rect((windowWidth / 8) + (n * (windowWidth / 8)), (windowHeight / 4) + (c[v] * (windowHeight / 12)) - (40 * HDIF[v]), (windowWidth / 8), (40 * (HDIM[v] - HDIF[v])));
    }
    fill(150);
    textSize(11);
    text(country[q], (windowWidth / 8) + (l * (windowWidth / 8)), 15 + (windowHeight / 4) + (c[q] * (windowHeight / 12)));
    fill(255);
    rect((windowWidth / 8) + (l * (windowWidth / 8)), (windowHeight / 4) + (c[q] * (windowHeight / 12)) - (40 * HDIF[q]), (windowWidth / 8), (40 * (HDIM[q] - HDIF[q])));
    fill(150);
    textFont(sans2);
    textSize(9);
    text("0", (windowWidth / 4) + (l * (windowWidth / 8)) + 15 - (windowWidth / 16), (windowHeight / 4) + (c[q] * (windowHeight / 12)) + 5);
    text("0.25", (windowWidth / 4) + (l * (windowWidth / 8)) + 15 - (windowWidth / 16), (windowHeight / 4) + (c[q] * (windowHeight / 12)) - 5);
    text("0.5", (windowWidth / 4) + (l * (windowWidth / 8)) + 15 - (windowWidth / 16), (windowHeight / 4) + (c[q] * (windowHeight / 12)) - 12);
    text("0.75", (windowWidth / 4) + (l * (windowWidth / 8)) + 15 - (windowWidth / 16), (windowHeight / 4) + (c[q] * (windowHeight / 12)) - 20);
    text("1", (windowWidth / 4) + (l * (windowWidth / 8)) + 15 - (windowWidth / 16), (windowHeight / 4) + (c[q] * (windowHeight / 12)) - 30);
    stroke(25);
    line((windowWidth / 4) + (l * (windowWidth / 8)) + 10 - (windowWidth / 16), (windowHeight / 4) + (c[q] * (windowHeight / 12)), (windowWidth / 4) + (l * (windowWidth / 8)) + 5 - (windowWidth / 16), (windowHeight / 4) + (c[q] * (windowHeight / 12)));
    line((windowWidth / 4) + (l * (windowWidth / 8)) + 10 - (windowWidth / 16), (windowHeight / 4) + (c[q] * (windowHeight / 12)) - 35, (windowWidth / 4) + (l * (windowWidth / 8)) + 5 - (windowWidth / 16), (windowHeight / 4) + (c[q] * (windowHeight / 12)) - 35);
    line((windowWidth / 4) + (l * (windowWidth / 8)) + 10 - (windowWidth / 16), (windowHeight / 4) + (c[q] * (windowHeight / 12)) - 35, (windowWidth / 4) + (l * (windowWidth / 8)) + 10 - (windowWidth / 16), (windowHeight / 4) + (c[q] * (windowHeight / 12)));
    noStroke();
  var xvalue2 = (windowWidth / 16);
  var yvalue2 = (windowHeight / 3);
  if (mouseX < xvalue + (windowWidth / 16) && mouseX > xvalue - (windowWidth / 16)) {
    if (mouseY < yvalue && mouseY > windowHeight /4) {
      d = q;
    }
  }

 if(d >-1 && d <8){
        fill('rgba(19, 79, 129, 0.5)');
        rect(windowWidth / 8, (windowHeight / 6) + 10, windowWidth / 8, (windowHeight * 8 / 12) + 7);
  }
  if(d >7 && d <27){
        fill('rgba(0, 26, 77, 0.5)');
        rect(windowWidth / 8, (windowHeight * 10 / 12) + 10, windowWidth / 8, (windowHeight / 12)+ 7 );
        rect(windowWidth *2 / 8, (windowHeight / 6) + 10, windowWidth / 8, (windowHeight * 9 / 12)+ 7);
        rect(windowWidth *3 / 8, (windowHeight / 6) + 10, windowWidth / 8, (windowHeight * 9 / 12)+ 7);
  }
  if(d >26 && d <32){
        fill('rgba(133, 83, 0, 0.5)');
        rect(windowWidth *4 / 8, (windowHeight / 6) + 10, windowWidth / 8, (windowHeight * 5 / 12)+ 7);
  }
  if(d >31 && d <37){
        fill('rgba(75, 31, 75, 0.5)');
        rect(windowWidth *4 / 8,  10 + (windowHeight * 7 / 12), windowWidth / 8, (windowHeight * 4 / 12)+ 7);
        rect(windowWidth *5 / 8, (windowHeight / 6) + 10, windowWidth / 8, (windowHeight * 1 / 12) + 7);
  }
  if(d >38 && d <53){
        fill('rgba(77, 0, 0, 0.5)');
        rect(windowWidth * 5 / 8, (windowHeight * 3 / 12) + 10, windowWidth / 8, (windowHeight * 8 / 12));
         rect(windowWidth * 6 / 8, (windowHeight * 2 / 12) + 10, windowWidth / 8, (windowHeight * 9 / 12));
  }
  }
}

function mousePressed() {
  if (q != -1) {
    noStroke();
    fill(255);
    rect(0, 0, windowWidth, windowHeight / 6 + 10);
    rect(0, 0, windowWidth / 8, windowHeight);
    rect(windowWidth * 7 / 8, 0, windowWidth / 8, windowHeight);
    textSize(100);
    textFont(sans);
    fill(50);
    text(country[q].toUpperCase(), windowWidth / 8, windowHeight / 6); //make graphic uppercase of countries and postion
    fill(255); //rectangle fill
    rect(windowWidth / 8, windowHeight / 6 - (100 * HDIF[q]), windowWidth * 7 / 8, (100 * (HDIM[q] - HDIF[q]))); //rectangle of gap
    if (HDIF[q] !== 0) {
      fill(125);
      textSize(14);
      text("HDI Male: " + HDIM[q], windowWidth / 32, (windowHeight / 6) - 10 - (100 * HDIF[q]));
      text("HDI Female: " + HDIF[q], windowWidth / 32, (windowHeight / 6) + 10 - (100 * HDIF[q]));
    }
    fill(125);
    textSize(14);
    text("HDI Rank:", windowWidth / 64, (windowHeight / 4) - 35);
    text("Region:", windowWidth / 64, (windowHeight / 3) - 35);
    text("HDI gap:", windowWidth / 64, (windowHeight * 5 / 12) - 35);
    text("Life Expectancy Gap:", windowWidth / 64, (windowHeight * 6 / 12) - 35);
    text("Education Gap:", windowWidth / 64, (windowHeight * 7 / 12) - 35);
    text("Expected Education Gap:", windowWidth / 64, (windowHeight * 8 / 12) - 35);
    text("Estimated GNI Gap:", windowWidth / 64, (windowHeight * 9 / 12) - 35);
    textSize(30);
    fill(100);
    text(HDIrank[q], windowWidth / 32, (windowHeight / 4));
    text(region[q], windowWidth / 32, (windowHeight / 3));
    text(nfc((HDIM[q] - HDIF[q]), 2), windowWidth / 32, (windowHeight * 5 / 12));

    if (MYSF[q] < MYSM[q]) {
      mysg = nfc((MYSM[q] - MYSF[q]), 2);
    }
    if (MYSF[q] > MYSM[q]) {
      mysg = nfc((MYSF[q] - MYSM[q]), 2);
    }
    if (MYSF[q] == MYSM[q]) {
      mysg = 0;
    }
    if (EYSF[q] < EYSM[q]) {
      eysg = nfc((EYSM[q] - EYSF[q]), 2);
    }
    if (EYSF[q] > EYSM[q]) {
      eysg = nfc((EYSF[q] - EYSM[q]), 2);
    }
    if (EYSF[q] == EYSM[q]) {
      eysg = 0;
    }
    text(abs(nfc((LEF[q] - LEM[q]), 2)), windowWidth / 32, (windowHeight * 6 / 12));
    text(mysg, windowWidth / 32, (windowHeight * 7 / 12));
    text(eysg, windowWidth / 32, (windowHeight * 8 / 12));
    text("$" + round(EGNIM[q] - EGNIF[q]), windowWidth / 32, (windowHeight * 9 / 12));

    textSize(14);
    text("Life Expectancy Female:", (windowWidth * 7 / 8) + 5, (windowHeight * 3 / 12) - 35);
    text("Life Expectancy Male:", (windowWidth * 7 / 8) + 5, (windowHeight * 4 / 12) - 35);
    text("Education Female:", (windowWidth * 7 / 8) + 5, (windowHeight * 5 / 12) - 35);
    text("Education Male:", (windowWidth * 7 / 8) + 5, (windowHeight * 6 / 12) - 35);
    text("Expected Education Female:", (windowWidth * 7 / 8) + 5, (windowHeight * 7 / 12) - 35);
    text("Expected Education Male:", (windowWidth * 7 / 8) + 5, (windowHeight * 8 / 12) - 35);
    text("Estimated GNI Female:", (windowWidth * 7 / 8) + 5, (windowHeight * 9 / 12) - 35);
    text("Estimated GNI Male:", (windowWidth * 7 / 8) + 5, (windowHeight * 10 / 12) - 35);
    textSize(30);
    fill(100);
    text(nfc(LEF[q], 2) + " years", (windowWidth * 7 / 8) + 5, (windowHeight * 3 / 12));
    text(nfc(LEM[q], 2) + " years", (windowWidth * 7 / 8) + 5, (windowHeight * 4 / 12));
    text(nfc(MYSF[q], 2) + " years", (windowWidth * 7 / 8) + 5, (windowHeight * 5 / 12));
    text(nfc(MYSM[q], 2) + " years", (windowWidth * 7 / 8) + 5, (windowHeight * 6 / 12));
    text(nfc(EYSF[q], 2) + " years", (windowWidth * 7 / 8) + 5, (windowHeight * 7 / 12));
    text(nfc(EYSM[q], 2) + " years", (windowWidth * 7 / 8) + 5, (windowHeight * 8 / 12));
    text("$" + round(EGNIF[q]), (windowWidth * 7 / 8) + 5, (windowHeight * 9 / 12));
    text("$" + round(EGNIM[q]), (windowWidth * 7 / 8) + 5, (windowHeight * 10 / 12));
  }
  // if (d) {
  //   fill(255);
  //   rect((windowWidth / 8), (windowHeight / 6), (windowWidth * 6 / 8), (windowHeight * 5 / 6));
  //   fill(50);
  //   for (var b in code) {
  //     text(code[b].toUpperCase(), (windowWidth / 8) + (l * (windowWidth / 8)), (windowHeight / 4) + (c[b] * (windowHeight / 12)));
  //     // if (region[d] == "Central") {
  //     //   fill(rgba(19, 79, 129, 0.5));
  //     //   rect(windowWidth / 8, windowHeight / 6, windowWidth / 8, windowHeight * 5 / 6);
  //     // }
  //   }
    // if (d) {
    //   fill(255);
    //   rect((windowWidth / 8), (windowHeight / 6), (windowWidth * 6 / 8), (windowHeight * 5 / 6));
    //   for (var b in code) {
    //     l = 0;
    //     if (b > 8 && b < 18) {
    //       l = 1;
    //     }
    //     if (b > 17 && b < 27) {
    //       l = 2;
    //     }
    //     if (b > 26 && b < 36) {
    //       l = 3;
    //     }
    //     if (b > 35 && b < 45) {
    //       l = 4;
    //     }
    //     if (b > 44 && b < 53) {
    //       l = 5;
    //     }
    //     textAlign(LEFT);
    //     noStroke();
    //     textSize(40);
    //     textFont(sans);
    //     fill(50);
    //     text(code[b].toUpperCase(), (windowWidth / 8) + (l * (windowWidth / 8)), (windowHeight / 4) + (c[b] * (windowHeight / 12)));
    //     fill(255);
    //     rect((windowWidth / 8) + (l * (windowWidth / 8)), (windowHeight / 4) + (c[b] * (windowHeight / 12)) - (40 * HDIF[b]), (windowWidth / 8), (40 * (HDIM[b] - HDIF[b])));
    //   }
    //   if (region[d] == "Central") {
    //     l = 0;
    //     for (var cent = 0; cent < 8; cent++) {
    //       fill(19, 79, 129);
    //       text(code[cent].toUpperCase(), (windowWidth / 8) + (l * (windowWidth / 8)), (windowHeight / 4) + (cen[cent] * (windowHeight / 12)));
    //       fill(255);
    //       rect((windowWidth / 8) + (l * (windowWidth / 8)), (windowHeight / 4) + (cen[cent] * (windowHeight / 12)) - (40 * HDIF[cent]), (windowWidth / 8), (40 * (HDIM[cent] - HDIF[cent])));
    //     }
    //   }
    //   if (region[d] == "Eastern") {
    //     for (var east = 8; east < 27; east++) {
    //       l = 0;
    //       if (east > 8 && east < 18) {
    //         l = 1;
    //       }
    //       if (east > 17 && east < 27) {
    //         l = 2;
    //       }
    //       fill(0, 26, 77);
    //       text(code[east].toUpperCase(), (windowWidth / 8) + (l * (windowWidth / 8)), (windowHeight / 4) + (eas[east] * (windowHeight / 12)));
    //       fill(255);
    //       rect((windowWidth / 8) + (l * (windowWidth / 8)), (windowHeight / 4) + (eas[east] * (windowHeight / 12)) - (40 * HDIF[east]), (windowWidth / 8), (40 * (HDIM[east] - HDIF[east])));
    //     }
    //   }
    //   if (region[d] == "Northern") {
    //     for (var nort = 27; nort < 32; nort++) {
    //       l = 3;
    //       fill(133, 83, 0);
    //       text(code[nort].toUpperCase(), (windowWidth / 8) + (l * (windowWidth / 8)), (windowHeight / 4) + (nor[nort] * (windowHeight / 12)));
    //       fill(255);
    //       rect((windowWidth / 8) + (l * (windowWidth / 8)), (windowHeight / 4) + (nor[nort] * (windowHeight / 12)) - (40 * HDIF[nort]), (windowWidth / 8), (40 * (HDIM[nort] - HDIF[nort])));
    //     }
    //   }
    //   if (region[d] == "Southern") {
    //     for (var sout = 32; sout < 37; sout++) {
    //       if (sout > 31 && sout < 35) {
    //         l = 3;
    //       }
    //       if (sout > 34 && sout < 36) {
    //         l = 4;
    //       }
    //       fill(75, 31, 75);
    //       text(code[sout].toUpperCase(), (windowWidth / 8) + (l * (windowWidth / 8)), (windowHeight / 4) + (sou[sout] * (windowHeight / 12)));
    //       fill(255);
    //       rect((windowWidth / 8) + (l * (windowWidth / 8)), (windowHeight / 4) + (sou[sout] * (windowHeight / 12)) - (40 * HDIF[sout]), (windowWidth / 8), (40 * (HDIM[sout] - HDIF[sout])));
    //     }
    //   }
    //   if (region[d] == "Western") {
    //     for (var west = 36; west < 53; west++) {
    //       if (west > 34 && west < 36) {
    //         l = 4;
    //         if (west > 35 && west < 45) {
    //           l = 4;
    //         }
    //         if (west > 44 && west < 53) {
    //           l = 5;
    //         }
    //         fill(77, 0, 0);
    //         text(code[west].toUpperCase(), (windowWidth / 8) + (l * (windowWidth / 8)), (windowHeight / 4) + (wes[west] * (windowHeight / 12)));
    //         fill(255);
    //         rect((windowWidth / 8) + (l * (windowWidth / 8)), (windowHeight / 4) + (wes[west] * (windowHeight / 12)) - (40 * HDIF[west]), (windowWidth / 8), (40 * (HDIM[west] - HDIF[west])));
    //       }
    //     }
    //   }
    // }
  // }
}

function draw() {

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}