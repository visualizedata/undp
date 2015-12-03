var table;  // store the data in a global variable
var forkArray = [1.0546719652000942,3.4945664018771017,5.714884379407968,7.576115153506111, 8.961310749506984,9.783434233720811];


function setup() {
  noLoop(); // no need for input or animation here
  //noFill();
  //textSize(10);
  // load the "tsv" formatted data from the undp source. 
  // the data structure is "tsv" and we have a "header" in the file
  wageTable = loadTable("wage_gaps.tsv", "tsv", "header");
  povertyTable = loadTable("poverty-head-count.tsv", "tsv", "header", showData);
  //colorMode(HSB, 360, 1.0, 1.0);
  createCanvas(windowWidth,windowHeight);
    background(229,221,203);
  // // textAlign(CENTER,TOP);
  // textSize(11);
  // fill(255);
  // textFont("monaco");

}

// call back function when table is loaded
function showData() {
  var maxWage = 10000; // set maximum value low
var minWage = 0; //wages are set at 0 min.
var maxPov = 0;
var minPov = 100;
var country = [];
var region = [];
var mwages = [];
var fwages = [];
var pvcount = [];
var NAlocations = [];
var textSpacing = [];
var theYlimit = 0;
var theLowerY = 0;
var maleHigher = 0;
   // textAlign(CENTER,TOP);
  textSize(11);
  fill(88);
  textFont("monaco");

  //get the wage stuff first
  for (var row = 0; row < wageTable.getRowCount(); row++) {
    var fmwage = wageTable.getString(row,3);
    fmwage = fmwage.replace(/\,/g,'');
    fmwage = parseFloat(fmwage);
    if (fmwage > 1) {
      fwages.push(fmwage);
        var mlwage = wageTable.getString(row,4);
        mlwage = mlwage.replace(/\,/g,'');
        mlwage = parseFloat(mlwage);
        mwages.push(mlwage);
      country.push(wageTable.getString(row,1));
      region.push(wageTable.getString(row,0))
    }
    
  }
  //now find the poverty headcount in the other table
    for (var i=0; i < country.length; i++) {
      thiscountry = country[i].toUpperCase();
      //search through the pv data
    for (row = 0; row < povertyTable.getRowCount() - 1; row++) {
      var thatcountry = povertyTable.getString(row,0).toUpperCase();
      if (thiscountry == thatcountry) {
         // get the most recent poverty headcount data
        for (var c = 14; c > 0; c--) {
          var thispvcount = povertyTable.getString(row,c);
          thispvcount = parseFloat(thispvcount);
          if (thispvcount > 0) {
            pvcount.push(thispvcount);
            break;
          } else if (c == 1) {
            pvcount.push("NA");
          }
      }
      break;
    } else if (row == povertyTable.getRowCount() - 2) {
                  pvcount.push("NA");
    }
    }
  }
  
//the arrays are ready and working
//kill the countries with no matching data
    for (i=0; i < pvcount.length; i++) {
      if (pvcount[i] == "NA") {
        NAlocations.push(i);
      }
    }
    for (i=0; i < NAlocations.length; i++) {
      country.splice(NAlocations[i],1);
      mwages.splice(NAlocations[i],1);
      fwages.splice(NAlocations[i],1);
      pvcount.splice(NAlocations[i],1);
    }    

//get max and min for poverty head count
    for (i=0; i < pvcount.length; i++) {
      if (pvcount[i] > maxPov) {
        maxPov = pvcount[i];
      }
      if (pvcount[i] < minPov) {
        minPov = pvcount[i];
      }
    }
    //convert the percentage range to the nearest 10s
    minPov = int(minPov/10) * 10 + 5;
    maxPov = 7 + int(maxPov/10) * 10;
//get max for wages: MAX WAGES SKEW THE CHART TOO MUCH...
    // for (i=0; i < fwages.length; i++) {
    //   if (fwages[i] > maxWage) {
    //     maxWage = fwages[i];
    //   }
    //   if (mwages[i] > maxWage) {
    //     maxWage = mwages[i];
    //   }
    // }
    // //convert the wages to nearest 5000
    // maxWage = 12000;
    
    

//draw the x axis and y axis
textSize(18);
textAlign(LEFT,CENTER);
 textFont("geneva");
text("Measuring Wage-Gaps in Sub-Saharan Africa",10,20);
textSize(12);
ellipse(30,50,12,12);
text("Avg. Annual Wages: Women",40,50);
noFill();
stroke(88);
ellipse(30,70,10,10);
noStroke();
fill(88);
text("Avg. Annual Wages: Men",40,70);


var regioncolor = "Region by Color: ";
text(regioncolor,30,90);
fill(177,84,36);
var west = " • West ";
text(west,30 + textWidth(regioncolor),90);
 fill(177, 154, 36);
var central = " • Central ";
text(central,30 + textWidth(regioncolor)+ textWidth(west),90);
 fill(85,149,40);
var east = " • East ";
text(east,30 + textWidth(regioncolor)+ textWidth(west) + textWidth(central),90);
fill(72, 96, 218);
var south = " • Southern ";
text(south,30 + textWidth(regioncolor)+ textWidth(west) + textWidth(central) + textWidth(east),90);
fill(88);
text("Poverty headcount ratio at national poverty lines", 30, height * 0.8 + 50);
text("(% of population)", 30, height * 0.8 + 70);
 textAlign(CENTER,TOP);
text("Estimated",width * 0.9, height * 0.1 + 15);
text("Earned Income (USD)",width * 0.9, height * 0.1 + 30);

textSize(11);
 textFont("monaco");
stroke(88);
//X-AXIS



line(width * 0.05, height * 0.8, width * 0.9, height * 0.8);
//Y-AXIS
line(width * 0.9, height * 0.8, width * 0.9, height * 0.1);
var theYbottom = height * 0.8;
//draw the x-axis measurements max to min with increments of 20
var maxtomin = maxPov;
while(maxtomin > 0) {
  stroke(88);
  line(map(maxtomin,maxPov,minPov,width * 0.05,width * 0.9),height * 0.8 + 5,map(maxtomin,maxPov,minPov,width * 0.05,width * 0.9),height * 0.8 - 5);
  noStroke();
  textAlign(CENTER,TOP);
  text(maxtomin,map(maxtomin,maxPov,minPov,width * 0.05,width * 0.9),height * 0.8 + 8);
  if (maxtomin > minPov) {
    var nextinc = int(maxtomin/5) * 5;
    if (nextinc === maxtomin) {
      maxtomin = maxtomin - 10;
      if (maxtomin < minPov) {
        maxtomin = minPov;
      }
      } else {
        maxtomin = nextinc;
      }
    } else {
      maxtomin = 0;
    }
  }
  
//draw the y-axis measurements max to min with increments of 5000
maxtomin = maxWage;
while(maxtomin > 0) {
  stroke(88);
  line(width * 0.9 + 5,map(maxtomin,maxWage,minWage,height * 0.1,height * 0.8),width * 0.9 - 5,map(maxtomin,maxWage,minWage,height * 0.1,height * 0.8));
  noStroke();
  textAlign(LEFT,CENTER);
  text(maxtomin,width * 0.9 + 8,map(maxtomin,maxWage,minWage,height * 0.1,height * 0.8));
  if (maxtomin > minWage) {
     nextinc = int(maxtomin/2500) * 2500;
    if (nextinc === maxtomin) {
      maxtomin = maxtomin - 2500;
      if (maxtomin < minWage) {
        maxtomin = minWage;
      }
      } else {
        maxtomin = nextinc;
      }
    } else {
      maxtomin = 0;
    }
  }

///Draw the countries
var vi = 7;
//get the Y axis top limites for men and women
for (i=0; i < country.length; i++) {
if (fwages[i] > mwages[i]) {
  theYlimit = map(fwages[i],maxWage,minWage,height * 0.1,height * 0.8);
  theLowerY = map(mwages[i],maxWage,minWage,height * 0.1,height * 0.8);
  maleHigher = false;
} else {
  theYlimit = map(mwages[i],maxWage,minWage,height * .1,height * .8);
  theLowerY = map(fwages[i],maxWage,minWage,height * .1,height * .8);
  maleHigher = true;
}
//get the x position
var thisX = map(pvcount[i],maxPov,minPov,width * 0.05,width * 0.9);

/// Start drawing!!!!
textAlign(CENTER,TOP);
noStroke();
if (region[i] == "Central")
  fill(177, 154, 36);
else if (region[i] == "East")
  fill(85,149,40);
else if (region[i] == "Southern")
  fill(72, 96, 218);
else if (region[i] == "West")
  fill(177,84,36);

var textLoc = textWidth(country[i]) - 3;
var textLocFirst = thisX - textLoc/2;
var textLocLast = thisX + textLoc/2;
var yLoc = 0;
//check the text width and put in a y postition for it
for (var j=0; j < textSpacing.length; j += 2) {
  if (textLocFirst < textSpacing[j] && textLocLast > textSpacing[j]) {
    yLoc += 15;
  } else if (textLocFirst < textSpacing[j + 1] && textLocLast > textSpacing[j+1]) {
    yLoc += 15;
  } else if (textLocFirst < textSpacing[j] && textLocLast > textSpacing[j+1]) {
    yLoc += 15;
  } else if (textLocFirst > textSpacing[j] && textLocLast < textSpacing[j+1]) {
    yLoc += 15;
  }
}
textSpacing.push(textLocFirst,textLocLast);

var startDraw = theYbottom + 20 + yLoc;
var forkHere = theLowerY + 25;
var forkdraw = 1;

//text(textLocFirst, thisX,startDraw - 10);
text(country[i],thisX,startDraw);


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
        text("^ " + mwages[i],thisX + 15, 10);
        break;
      }
}
noFill();
if (region[i] == "Central")
  stroke(177, 154, 36);
else if (region[i] == "East")
  stroke(85,149,40);
else if (region[i] == "Southern")
  stroke(72, 96, 218);
else if (region[i] == "West")
  stroke(177,84,36);
ellipse(thisX + 10, theYlimit,8,8);

}

}

function windowResized() {
resizeCanvas(windowWidth, windowHeight);
background(229,221,203);
showData();
}
