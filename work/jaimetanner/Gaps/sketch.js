var table;
var data = new Object;
var back = 85;
var counter = 0;
// r = [0];
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
var z = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Pacifico');
  background(250);
  fill(85);
  stroke(85);
  strokeWeight(1);
  textSize(9);
  //load data into string array
  table = loadTable("data.txt", "tsv", "header", showData);
  rect(0, height * 0.8, width, height * 0.8);

  //title 
  textSize(40);
  stroke(178, 34, 34);
  fill(139, 0, 0);
  text("Understanding Child Marriage and the Gender Gap", width * 0.05, height * 0.1);
  textSize(9);
  //top scale line
  fill(85);
  stroke(85);
  line(width - 25, height * 0.8, width - 25, height * 0.1);
  text("0%", width - 22, height * 0.79);
  text("100%", width - 22, height * 0.1);

  // middle scale bar 
  fill(230);
  stroke(230);
  text("0.25", width * 0.03, height * 0.83);
  text("0.65", width * 0.97, height * 0.83);
  line(width * 0.03, height * 0.81, width * 0.03, height * 0.78);
  line(width * 0.97, height * 0.81, width * 0.97, height * 0.78);
  textSize(12);
  text("Gender Development Index", width / 2 - (textWidth("Gender Development Index") / 2), height * 0.83);
  //how to read bar 
  fill(150);
  noStroke();
  rect(width * 0.75, height * 0.05, width * 0.20, height * 0.2);
  fill(230);
  stroke(230);
  textSize(15);
  text("How To Read", width * 0.76, height * 0.09);
  line(width * 0.75, height * 0.19, width * 0.95, height * 0.19);
  triangle(width * 0.82, height * 0.19, width * 0.88, height * 0.19, width * 0.85, height * 0.12);
  //descriptions in read bar  
  fill(210);
  stroke(210);
  textSize(10);
  text("% women married under", width * 0.85, height * 0.12);
  text("age of 18", width * 0.87, height * 0.14);
  text("Female GDI", width * 0.82 - (textWidth("Female GDI__")), height * 0.18);
  text("Male GDI", width * 0.89, height * 0.18);

  fill(85);
  stroke(85);
}

function draw() {
  // noStroke();
  // for (var r = 0; r < hdiM.length; r++) {
  //   if (counter == 0 && z == counter) {
  //     fill(85, 85, 85, 50);
  //     triangle((hdiM[r] - hdiF[r]) * 0.5 + hdiF[r], marriage18[r], hdiM[r], height * 0.8, hdiF[r], height * 0.8);
  //     z++;
  //   } else if (counter == r && z == counter) {
  //     fill(85);
  //     triangle((hdiM[r] - hdiF[r]) * 0.5 + hdiF[r], marriage18[r], hdiM[r], height * 0.8, hdiF[r], height * 0.8);
  //     z++;
  //   } else {
  //     fill(85, 85, 85, 20);
  //     triangle((hdiM[r] - hdiF[r]) * 0.5 + hdiF[r], marriage18[r], hdiM[r], height * 0.8, hdiF[r], height * 0.8);
  //     z++;
  //   }
    
  // }
      
}

function showData() {
  stroke(255);
  fill(255, 0, 0);
  var count = table.getRowCount();
  for (var r = 0; r < count; r++) {

    country.push(table.getString(r, 0));
    var ge15 = table.getString(r, 1);
    var ge18 = table.getString(r, 2);
    hdi.push(table.getString(r, 3));
    var hF = table.getString(r, 4);
    var hM = table.getString(r, 5);
    var vM = table.getString(r, 6);
    var vF = table.getString(r, 7);

    // dataAll.push(data);
    marriage15.push(map(ge15, 0, 100, width / 2, width - 30));
    marriage18.push(map(ge18, 0, 100, height * 0.8, 0.1));
    hdiF.push(map(hF, 0.25, 0.65, width * 0.03, width * 0.97));
    hdiM.push(map(hM, 0.25, 0.65, width * 0.03, width * 0.97));
    fVio.push(map(vF, 0, 100, height * 0.5, height - 30));
    mVio.push(map(vM, 0, 100, height * 0.5, height - 30));


    stroke(0);

    stroke(0, 0, 0, 50);
    fill(0, 0, 0, 50);
    triangle((hdiM[r] - hdiF[r]) * 0.5 + hdiF[r], marriage18[r], hdiM[r], height * 0.8, hdiF[r], height * 0.8);
    fill(250);
    stroke(250);
    // line(hdiF[r], height / 2, hdiF[r], fVio[r]);
    // line(hdiM[r], height / 2, hdiM[r], mVio[r]);
  }
}


function keyPressed() {
  console.log("cat");
  if (keyCode === RIGHT_ARROW) {
    counter++;
  } else if (keyCode === LEFT_ARROW) {
    counter--;
  }
  return false; // prevent any default behavior
}

// function mouseClicked() {
//   if (back == 85) {
//     value = 255;
//   } else {
//     back = 85;
//   }
// }