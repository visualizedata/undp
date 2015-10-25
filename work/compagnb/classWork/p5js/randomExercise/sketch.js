// global variables
var participants = ["Jamie", "Justine", "Linnea", "Gabi", "Jacob", "Barbara", "Jon"];
var output =""; //string variable to draw on the canvas

// runs once to set up
function setup() {
  //create a canvas at this size in px
  createCanvas(800,600);
  

}

// loops continuously
function draw() {
  background(255);
  fill(0, 255,0);
  //rect(width/2, height/2, 100, 100);
  //rect(mouseX-50, mouseY-50, 100, 100);
  textSize(32);
  fill(0);
  text(output, width/2, height/2);
}

function mouseReleased(){
  
  // create a random number between 0..6
  var rnd = floor(random(participants.length));
  //call from the array with that random nuber and assign it to output
  output = participants[rnd];
  //remove from array
  participants.splice(rnd, 1);
}