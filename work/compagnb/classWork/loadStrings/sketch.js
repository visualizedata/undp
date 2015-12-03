// Major Studio
// 20150903
// Parsing String Data

function preLoad(){
  // load something and continue on only when finished
}

function setup() {
  
  // create a canvas full screen
  createCanvas(windowWidth, windowHeight);
  
  // hold don't draw at 60 frames a second
  noLoop();
  
  // load data into an string array
  loadStrings("data/text.txt", showStrings);
  
}

function draw() {
  
}

// call back to return a variable of data
function showStrings(data){
  
    // iterate through the data and display it on screen 
    for(var i = 0; i < data.length; i++){
      // display txt - start px , spacing, width , height 
      // text(data[i], 50, 50+i*10, 800, 800);
      text(data[i], 50, 50+i*20);
      
    }
  
}