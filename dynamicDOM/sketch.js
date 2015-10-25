// form input
// easing
// position
// input form displays submission

// global variables
var input;
var x, y, txtLength;

function setup() {
  
  // create canvas a full width and height of the window
  createCanvas(windowWidth, windowHeight);
  
  // create input form with a default value of ?
  // also do create element to do any element
  input = createInput("?");
  input.style("font-size", "50pt");
  input.style("color", "lavender");
  input.style("background-color", "gray");
  // giving x and y a start value
  x = width/2;
  y = height/2;
  
  noCanvas();
}

function draw() {
  //measure length of the string in input
  txtLength = input.value().length;
  //calculate distance (delta) between where the input
  //should go and where it currently is
  var dx = mouseX-x;
  var dy = mouseY-y;
  
  // update the input position
  x += dx * .01;
  y += dy * .01;
  input.position(x - txtLength*20, y);
  
}

function keyPressed(){
  
  // print out value in console
  console.log(input.value());
  
  // enter subbission
  if(keyCode == ENTER){
    // create a p element with the input value
    createElement("p", input.value());
    // clear input
    input.value("");
  }

  
}