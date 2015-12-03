var table;
var countryInfo = [];
var areas = [];
var ranks = [];
var countries = [];
var hdrF = [];
var hdrM = [];
var lifeF = [];
var lifeM = [];
var meanSchoolF = [];
var meanSchoolM = [];
var expSchoolF = [];
var expSchoolM = [];
var gniF = [];
var gniM = [];
var loaded = false;

var femaleImg, maleImg, headerImg;

// min and max values for the size
var minVal = 100; // make higher for worse case senerio
var maxVal = 0; // make lower for worse case and gets bumped up higher

var c = [];

function preload(){
  // load data info from undpGoals.txt
  table = loadTable("data/hdrQuant.txt", "tsv", "header");
  femaleImg = loadImage("images/femalesm.png");
  maleImg = loadImage("images/malesm.png");
  headerImg = loadImage("images/header.png");
  
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(191, 222, 235);
  noLoop(); // no need for input or animation here
  noFill();
  textSize(10);
  
  // process all the data into arrays
  processData();
  console.log("min val: " + minVal + " ||  max val: " + maxVal );
  if(loaded){
    for (row = 0; row < areas.length; row++) {
      countryInfo.push(new CountryInfo(row));
    }
  }
}

function draw() {
  

  
  
  // display
  for (var i = 0; i < areas.length; i++) {
    countryInfo[i].display();
  }
  fill("#D3D3D3");
  textSize(8);
  text(".5 rating", 5, map(.48, minVal, maxVal, height-150, 100+20) );
  rect(0, map(.5, minVal, maxVal, height-150, 100+20), width, 1);
  createHeader();
}

function processData(){
    //  count the rows
  print(table.getRowCount() + " total rows in table");
  //  count the columns
  print(table.getColumnCount() + " total columns in table");
  //  print contents of column named Country Name
  areas = table.getColumn("Area");
  ranks = table.getColumn("HDI ranks");
  countries = table.getColumn("Country");
  hdrF = table.getColumn("hdrF2013");
  hdrM = table.getColumn("hdrM2013");
  lifeF = table.getColumn("lifeF2013");
  lifeM = table.getColumn("lifeM2013");
  meanSchoolF = table.getColumn("meanSchoolF2002-2012");
  meanSchoolM = table.getColumn("meanSchoolM2000-2012");
  expSchoolF = table.getColumn("expSchoolF2000-2012");
  expSchoolM = table.getColumn("expSchoolM2000-2012");
  gniF = table.getColumn("gniF2013");
  gniM = table.getColumn("gniM2013");

  // while parsing, give me the max and min values
  mapHighLow();
  loaded = true;
}

// function to give max and min values
function mapHighLow(){
  var count = table.getRowCount();
  //get min and max
  for (var row = 7; row < count; row++) {
    for (var col = 3; col < 5; col++) {
      var val = table.getString(row, col);
      val = float(val);

      if(minVal > val){
        minVal = val;
      } else if(maxVal < val){
        maxVal = val;
      }
      
    }
  }
}
function createHeader(){
  image(maleImg, width-30, 30);
  fill("#072a41");
  text("Male HDR Rating", width-100, 45);
  image(femaleImg, width-30, 60);
  text("Female HDR Rating", width-109, 75);
  image(headerImg, 0, 0);
  
}

function CountryInfo(row){
  this.row = row;
  this.area = areas[this.row];
  this.rank = ranks[this.row];
  this.country = countries[this.row];
  this.hdrF = hdrF[this.row];
  this.hdrM = hdrM[this.row];
  this.lifeF = lifeF[this.row]; 
  this.lifeM = lifeM[this.row];
  this.meanSchoolF = meanSchoolF[this.row]; 
  this.meanSchoolM = meanSchoolM[this.row]; 
  this.expSchoolF = expSchoolF[this.row]; 
  this.expSchoolM = expSchoolM[this.row]; 
  this.gniF = gniF[this.row];
  this.gniM = gniM[this.row];
}
CountryInfo.prototype.display = function(){
  noStroke();
  if (this.row%2 == 1) {
    fill("rgba(255,255,255,0.4)");
    rect(this.row * width/55, 100, width/55, height-230);
  } else {
    fill(245);
    rect(this.row * width/55, 100, width/55, height-230);
  }
  countryInfo[this.row].showCountryNames();
  countryInfo[this.row].showFemaleHDR();
  countryInfo[this.row].showMaleHDR();

}
CountryInfo.prototype.showCountryNames = function(){
  var rowWBorder = 1+this.row;
  push();
  translate(this.row * width/55, height-130);
  rotate(45);
  fill("#072a41");
  text(this.country, 10, 0);
  rotate(0);
  pop();
}
CountryInfo.prototype.showFemaleHDR = function(){
  var rowWBorder = 1+this.row;
  if (this.hdrF == ".."){
    
  }else {
  image(femaleImg, (this.row * width/55)+2, map(this.hdrF, minVal, maxVal, height-150, 100+20));
  }
}
CountryInfo.prototype.showMaleHDR = function(){
  var rowWBorder = 1+this.row;
  if (this.hdrF == ".."){
    
  }else {
  image(maleImg, (this.row * width/55)+2, map(this.hdrM, minVal, maxVal, height-150, 100+20));
  }
}
function mouseMoved(){
  console.log("mouseX: " + mouseX);
  console.log("mouseY: " + mouseY);
  
}