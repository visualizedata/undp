var countryTable;
var countryTable2;
var dataTable;
var dataTable2;
var forkArray = [1.0546719652000942,3.4945664018771017,5.714884379407968,7.576115153506111, 8.961310749506984,9.783434233720811];
var altDataloaded = false;
var regionsFilter = ["west","central","east","southern"]; 
var regionsTest = [1,1,1,1]; 
var countryObject = [];
var namecollision = [];
var ychange = true;
var xmaxmin = [];
//variables for the default Y data
var dataset = 0;
var dataspec = 2;
var datasort = 0;
//variables for the default X data
var basedata = 0;
var hdimax = 190;
var ymax = 10000;
var ymin = 0;
var hdimin = 100;
var theYlimit = 0;
var theLowerY = 0;
var maleHigher = true;
 var centralColor;
var eastColor;
var southernColor;
var westColor;
var backColor;




function setup() {
  createCanvas(windowWidth,windowHeight);
// centralColor = color(177, 154, 36);
// eastColor = color(85,149,40);
// southernColor = color(72, 96, 218);
// westColor =  color(177,84,36);
//backColor = color(229,221,203)
// backColor = color(255)
// centralColor = color(255, 140, 0);
// eastColor = color(50, 205, 50);
// southernColor = color(65, 105, 225);
// westColor =  color(220, 20, 60);
centralColor = color('GoldenRod');
eastColor = color('SeaGreen');
southernColor = color('MidnightBlue');
westColor =  color('Maroon');
backColor = color(210,180,140,40)

// backColor = color(238,226,210);
// //backColor = color(0);
// centralColor = color(108,58,32);
// eastColor = color(88,166,86);
// //eastColor = color(147,38,47);
// southernColor = color(185,61,71);
// //southernColor = color(2, 39, 95);
// westColor =  color(50,153,143);
// //westColor =  color(185,61,71);

background(255);
background(backColor);

  countryTable2 = loadTable("povheadcount.tsv", "tsv", "header", nextData);
}
function nextData() {
  countryTable = loadTable("HDIwRegionCODE.tsv", "tsv", "header", setObjects);
}
function setObjects() {
  for (var row = 0; row < countryTable.getRowCount(); row++) {
  var regions = countryTable.getString(row,0);
  var hdis = countryTable.getString(row,1);
  var thcountry = countryTable.getString(row,2);
  var thcode = countryTable.getString(row,3);
 countryObject.push(new Country(regions,hdis,thcountry,thcode));
  }
  //now get the default data table (wage gaps)
  dataTable = loadTable("wage_gaps.tsv", "tsv", "header", setData);
  dataTable2 = loadTable("genderLabor.tsv", "tsv", "header", setAlt);

}
function setData() {
      for (var i = 0; i < countryObject.length; i++) {
  countryObject[i].update();
  }
  //get max and mins
        for (var i = 0; i < countryObject.length; i++) {
          if (countryObject[i].hdi > 100) {
          //check regions
          for (var j=0; j < regionsFilter.length;j++) {
            if(countryObject[i].region == regionsFilter[j]) {
        xmaxmin.push(countryObject[i].hdi);
        break;
            }
          }
          }
  }
  background(255);
   background(backColor);
  makeAxis();

    for (var i = 0; i < countryObject.length; i++) {
//   countryObject[i].update();
  countryObject[i].display();
  }

}

function draw() {
  
}
function setAlt () {
  dataset = 0;
 }

function Country(region, hdi, name,code) {
  this.country = name;
 this.code = code;
  this.region = region;
  this.hdi = hdi;
    for (var rowy = 0; rowy < countryTable2.getRowCount(); rowy++) {
    if (this.code == countryTable2.getString(rowy,1)) {
      this.pov = countryTable2.getString(rowy,2);
      //console.log(this.pov);
      this.povyear = countryTable2.getString(rowy,0);
      break;
    } else {
      this.pov = 0;
      this.povyear = 0;
    }
  }

}
Country.prototype.display = function() {
  var xpos = this.hdi;
  if (datasort === 1) {
     var xpos = this.pov;
  }
  if (this.fpart > 0 && xpos > 0) {
    //filter by reigion
for (var j=0; j < regionsFilter.length;j++) {
    if(this.region == regionsFilter[j] && regionsTest[j] == 1) {
  makeBranches(this.fpart,this.mpart,this.country,xpos,this.region);
  break;
    }
}
  }
};

Country.prototype.update = function() {
  if (dataset === 0) {
  for (var row = 0; row < dataTable.getRowCount(); row++) {
    if (this.code == dataTable.getString(row,1)) {
      this.mpart = dataTable.getString(row,4);
      this.fpart = dataTable.getString(row,3);
      break;
    } else {
      this.mpart = 0;
      this.fpart = 0;
    }
  }
  } else if (dataset === 1) {
  for (var row = 0; row < dataTable2.getRowCount(); row++) {
    if (this.code == dataTable2.getString(row,1)) {
      this.fpart = dataTable2.getString(row,dataspec);
   this.mpart = 100 - this.fpart;
      break;
    } else {
      this.fpart = 0;
   this.mpart = 0;
    }
  }
   
  }

};

//function ychange(gdata) {
function dataChange(sel) {
  //the vars the data sets and the specific data in it
 // console.log(sel.value);
     var tnum = sel.value; 
    //console.log(tnum)
    dataspec = Number(tnum);
    if (dataspec === 1) {
      dataset = 0;
      ymax = 10000;
    } else {
      dataset = 1;
      ymax = 100;
    }
     text(dataTable2.getString(2,2),300,70);
for (var i = 0; i < countryObject.length; i++) {
   countryObject[i].update();
   }
   background(255);
      background(backColor);
    makeAxis();
    namecollision = [];
 for (var i = 0; i < countryObject.length; i++) {
  countryObject[i].display();
 }
}
function regionSort(num) {
  if (regionsTest[num] == 1) {
    regionsTest[num] = 0;
  } else {
        regionsTest[num] = 1;
  }
      resetMaxs();
      background(255);
        background(backColor);
    makeAxis();
    namecollision = [];
   for (var i = 0; i < countryObject.length; i++) {
  countryObject[i].display();
 }
}
function sortChange(sel) {
  //the vars for the sorting data
 // console.log(sel.value);
     var tnum = sel.value; 
    //console.log(tnum)
    datasort = Number(tnum);
    resetMaxs();
    background(255);
          background(backColor);
    makeAxis();
    namecollision = [];
 for (var i = 0; i < countryObject.length; i++) {
  countryObject[i].display();
 }
}

function resetMaxs() {
    xmaxmin = [];
 for (var i = 0; i < countryObject.length; i++) {
      if (countryObject[i].hdi > 100 && datasort == 0) {
         for (var j=0; j < regionsFilter.length;j++) {
            if(countryObject[i].region == regionsFilter[j] && regionsTest[j] == 1) {
  xmaxmin.push(countryObject[i].hdi);
  break;
            }
         }
          } else if (countryObject[i].pov > 0 && datasort == 1) {
                     for (var j=0; j < regionsFilter.length;j++) {
            if(countryObject[i].region == regionsFilter[j] && regionsTest[j] == 1) {
              xmaxmin.push(countryObject[i].pov);
              break;
            }
                     }
          }
 }
 //console.log(xmaxmin);
}

function makeAxis() {
  textSize(11);
 textFont("monaco");
 //fill(152,142,120, 50);
 fill(211,211,211, 50);
 stroke(152,142,120,50);
 rect(width * 0.05, height * 0.75, width * 0.85, 20);
  fill(33);

stroke(88);
//X-AXIS
line(width * 0.05, height * 0.75, width * 0.9, height * 0.75);
//Y-AXIS
line(width * 0.9, height * 0.75, width * 0.9, height * 0.1);
var maxtomin = 5 + int(max(xmaxmin) / 5) * 5;
var minnum = int(min(xmaxmin) / 5) * 5;
var maxnum = 5 + int(max(xmaxmin) / 5) * 5;
while(maxtomin > 0) {
  stroke(88);
  line(map(maxtomin,maxnum,minnum,width * 0.05,width * 0.9),height * 0.75 + 5,map(maxtomin,maxnum,minnum,width * 0.05,width * 0.9),height * 0.75 - 5);
  noStroke();
  textAlign(CENTER,TOP);
  if (maxtomin != maxnum) {
    if (maxtomin != minnum) {
  text(maxtomin,map(maxtomin,maxnum,minnum,width * 0.05,width * 0.9),height * 0.75 + 8);
    }
  }
  if (maxtomin > minnum) {
    var nextinc = int(maxtomin/5) * 5;
    if (nextinc === maxtomin) {
      maxtomin = maxtomin - 10;
      if (maxtomin < minnum) {
        maxtomin = minnum;
      }
      } else {
        maxtomin = nextinc;
      }
    } else {
      maxtomin = 0;
    }
  }
var ymaxtomin = ymax;
var ymin = 0;
var yinc = ymax * 0.25;
while(ymaxtomin > 0) {
  stroke(88);
  line(width * 0.9 + 5,map(ymaxtomin,ymax,ymin,height * 0.1,height * 0.75),width * 0.9 - 5,map(ymaxtomin,ymax,ymin,height * 0.1,height * 0.75));
  noStroke();
  textAlign(LEFT,CENTER);
  text(ymaxtomin,width * 0.9 + 8,map(ymaxtomin,ymax,ymin,height * 0.1,height * 0.75));
  ymaxtomin = ymaxtomin - yinc;
  }
}

function makeBranches(fdata,mdata,countryName,xpoint,region) {
var minnum = int(min(xmaxmin) / 5) * 5;
var maxnum = 5 + int(max(xmaxmin) / 5) * 5;

 if (int(fdata) > int(mdata)) {
   
  theYlimit = map(fdata,ymax,ymin,height * 0.1,height * 0.75);
  theLowerY = map(mdata,ymax,ymin,height * 0.1,height * 0.75);
  maleHigher = false;
   // console.log(countryName + ": " + fdata + " " + mdata);

} else {
  theYlimit = map(mdata,ymax,ymin,height * .1,height * 0.75);
  theLowerY = map(fdata,ymax,ymin,height * .1,height * 0.75);
  maleHigher = true;
}
//get the x position
var thisX = map(xpoint,maxnum,minnum,width * 0.05,width * 0.9);
//console.log(thisX);

textAlign(CENTER,TOP);
noStroke();
if (region == "central")
  fill(centralColor);
else if (region == "east")
  fill(eastColor);
else if (region == "southern")
  fill(southernColor);
else if (region == "west")
  fill(westColor);

var startDraw = height * 0.75 + 20;
var forkHere = theLowerY + 25;
var forkdraw = 1;
var texpoint = thisX-5;
for (j = 0; j < namecollision.length; j++) {
  if (texpoint < int(namecollision[j]) + 5 && texpoint > int(namecollision[j]) - 5) {
    texpoint = texpoint - 10;
  }
}
push();
  translate(texpoint, startDraw + 2); // Translate to the center
  rotate(5.2);                // Rotate by theta
  textAlign(RIGHT);
text(countryName,0,0);
pop();
namecollision.push(texpoint);

while (startDraw > forkHere) {
  ellipse(thisX, startDraw,2,2);
  startDraw -= 5;
}
while (startDraw > theLowerY) {
 // fill(222,222,0);
    ellipse(thisX + forkArray[forkdraw], startDraw,2,2);
    ellipse(thisX - forkArray[forkdraw], startDraw,2,2);
      startDraw -= 5;
        forkdraw++;
}

ellipse(thisX - 10, theLowerY,8,8);

while (startDraw - 5 > theYlimit) {
      ellipse(thisX + 10, startDraw,2,2);
      startDraw -= 5;
      if (startDraw < -10) {
        textAlign(LEFT);
        text("^ " + mdata,thisX + 15, 10);
        break;
      }
}
noFill();
if (region == "central")
  stroke(centralColor);
else if (region == "east")
  stroke(eastColor);
else if (region == "southern")
  stroke(southernColor);
else if (region == "west")
  stroke(westColor);
  ellipse(thisX + 10, theYlimit,8,8);

}
function windowResized() {
resizeCanvas(windowWidth, windowHeight);
background(255);
         background(backColor);
    makeAxis();
    namecollision = [];
 for (var i = 0; i < countryObject.length; i++) {
  countryObject[i].display();
 }
 }

