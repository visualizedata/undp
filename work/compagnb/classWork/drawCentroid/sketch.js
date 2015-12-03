var posX = [];
var posY = [];
var index = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  fill(200);
}

function draw() {
  background(255);

  beginShape();
  
  // draw polygon
  for (var i = 0; i < posX.length; i++){
    // ( first parameter x pos, second y pos
    vertex(posX[i], posY[i]);
  }
    endShape(CLOSE);
  
  // draw centroid  
  var cX = 0;
  var cY = 0;
  var a = 0;
  
  for(var i = 0; i < posX.length - 1; i++){
    cX += (posX[i]+posX[i+1])*(posX[i]*posY[i+1] - posX[i+1]*posY[i]);
    cY += (posY[i]+posY[i+1])*(posX[i]*posY[i+1] - posX[i+1]*posY[i]);
    a += (posX[i]*posY[i+1] - posX[i+1]*posY[i]);
  }
  a *= 1 / 2;
  cX *= 1 / (6*a);
  cY *= 1 / (6*a);
  
  fill (200,0,200);
  ellipse(cX, cY, 20, 20);


}

function mouseClicked(){
  // you can also use
  // posX.push(mouseX);
  // posY.push(mouseY);

  posX[index] = mouseX;
  posY[index] = mouseY;
  
  // console.log(index);
  // console.log("posX: " + posX[index] + " | posY: " + posY[index] );
  
  index++;
  
  // reset at index 10
  if (index >= 10){
    index = 0;
  }
}