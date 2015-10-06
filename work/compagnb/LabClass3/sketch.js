var posX = [];
var posY = [];
var index = 0;

function setup() {
  createCanvas(300, 300);
  fill(200);
}

function draw() {
  
  beginShape();
  
  // ( first parameter x pos, second y pos
  // vertex(50, 100);
  // vertex(100, 0);
  // vertex(150, 50);
  
  for (var i = 0; i < posX.length; i++){
    vertex(posX[i], posY[i]);
  }
  
  endShape();
  
}

function mouseClicked(){
  // you can also use
  // posX.push(mouseX);
  // posY.push(mouseY);
  
  posX[index] = mouseX;
  posY[index] = mouseY;
  
  // console.log(index);
  console.log("posX: " + posX[index] + " | posY: " + posY[index] );
  
  index++;
  
  if (index >= 10){
    index = 0;
  }
}