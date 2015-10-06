// Major Studio
// 20150903
// Parsing String Data

function preLoad() {
  // load something and continue on only when finished
}

function setup() {

  // create a canvas full screen
  createCanvas(windowWidth, windowHeight);

  // hold don't draw at 60 frames a second
  noLoop();
  
  noStroke();
  textSize(20);
  // load data into an string array
  loadJSON("data/colors.json", showJson);

}

function draw() {
   background(255, 0, 0);

}

// call back to return a variable of data
function showJson(data) {
  
  background(255);
  fill(data.yellow);
  text(data.yellow, 300, 300);
  fill(data.green);
  text(data.green, 500, 300);
  

}