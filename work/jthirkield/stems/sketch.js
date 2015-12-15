var countryTable;
var countryTable2;
var dataTable;
var dataTable2;
var dataTable3;
var forkArray = [1.0546719652000942,3.4945664018771017,5.714884379407968,7.576115153506111, 8.961310749506984,9.783434233720811];
var altDataloaded = false;
var regionsFilter = ["Western","Central","Eastern","Southern","Northern"]; 
var regionsTest = [1,1,1,1,1]; 
var countryObject = [];
var namecollision = [];
var ychange = true;
var ybottom = 0;
var xmaxmin = [];
//variables for the default Y data
var dataset = 0;
var dataspec = 0;
var datasort = 0;
var timeoutTrack = 0;
var lasttimer = 2000;
//variables for the default X data
var basedata = 0;
var hdimax = 190;
var ymax = 10000;
var ymin = 0;
var hdimin = 99;
var theYlimit = 0;
var theLowerY = 0;
var maleHigher = true;
 var CentralColor;
  var NorthernColor;
var EasternColor;
var SouthernColor;
var WesternColor;
var backColor;
var rolloverArray = [];
var countrySelected = "none";
var backopac = 100;
var startup = true;
var tracktimer = true;
var trackWindow = false;




function setup() {
  createCanvas(windowWidth,windowHeight);
//DarkGoldenRod
//SteelBlue
 //SeaGreen
 //MidnightBlue
 //Maroon
 //Tan
 colorMode(RGB, 255, 255, 255, 255);
//CentralColor = color(218,165,32,255);
NorthernColor = color(70,130,180,255); //
EasternColor = color(46, 139, 87,255);
CentralColor = color(184,134,11,255);
SouthernColor = color(25,25,112,255);
WesternColor =  color(128,0,0,255);
CentralFade = color(218,165,32,100);
NorthernFade = color(70,130,180,100); //

EasternFade = color(46, 139, 87,100);
SouthernFade = color(25,25,112,100);
WesternFade =  color(128,0,0,100);
//backColor = color(210,180,140,100);
backColor = color(229,221,203,255);


frameRate(1);
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
  var giis = countryTable.getString(row,4);
  var thcountry = countryTable.getString(row,2);
  var thcode = countryTable.getString(row,3);
 countryObject.push(new Country(regions,hdis,thcountry,thcode,giis));
  }
  //now get the default data table (wage gaps)
  dataTable = loadTable("wage_gaps.tsv", "tsv", "header", setData);
  dataTable2 = loadTable("genderLabor.tsv", "tsv", "header", setAlt);
  dataTable3 = loadTable("laborforce.tsv", "tsv", "header", setAlt);

}
function setData() {
      for (var i = 0; i < countryObject.length; i++) {
  countryObject[i].update();
  }
  //get max and mins
        for (var i = 0; i < countryObject.length; i++) {
          if (countryObject[i].hdi > hdimin) {
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


function setAlt () {
  dataset = 0;
 }

function Country(region, hdi, name,code,gii) {
  this.country = name;
 this.code = code;
  this.region = region;
  this.hdi = hdi;
  this.gii = gii;
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
  } else if (datasort === 2 || datasort === 3) {
     var xpos = this.gii;
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
  } else if (dataset === 3) {
  for (var row = 0; row < dataTable3.getRowCount(); row++) {
    if (this.code == dataTable3.getString(row,1)) {
      this.mpart = dataTable3.getString(row,3);
      this.fpart = dataTable3.getString(row,2);
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
   //  var tnum = sel.value; 
    //console.log(tnum)
    dataspec = sel;
    if (dataspec === 1) {
      dataset = 0;
      ymax = 10000;
    } else if (dataspec === 10) {
      dataset = 0;
      ymax = 5000;
    }   else if (dataspec === 11) {
      dataset = 0;
      ymax = 25000;
    }   else if (dataspec === 12) {
     dataset = 3;
      ymax = 100;
 
    } else {
      dataset = 1;
      ymax = 100;
    }
for (var i = 0; i < countryObject.length; i++) {
   countryObject[i].update();
   }
   background(255);
      background(backColor);
    makeAxis();
    namecollision = [];
      rolloverArray = [];
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
      rolloverArray = [];
   for (var i = 0; i < countryObject.length; i++) {
  countryObject[i].display();
 }
}
function sortChange(sel) {
  //the vars for the sorting data
 // console.log(sel.value);
   //  var tnum = sel.value; 
    //console.log(tnum)
    datasort = sel;
    resetMaxs();
    background(255);
          background(backColor);
    makeAxis();
    namecollision = [];
      rolloverArray = [];
 for (var i = 0; i < countryObject.length; i++) {
  countryObject[i].display();
 }
}

function resetMaxs() {
    xmaxmin = [];
 for (var i = 0; i < countryObject.length; i++) {
      if (countryObject[i].hdi > 0 && datasort == 0) {
         for (var j=0; j < regionsFilter.length;j++) {
            if(countryObject[i].region == regionsFilter[j] && regionsTest[j] == 1) {
  xmaxmin.push(countryObject[i].hdi);
  break;
            }
         }
          }   else if (countryObject[i].hdi > 99 && datasort == 4) {
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
          } else if (countryObject[i].gii > 0 && datasort == 2) {
                     for (var j=0; j < regionsFilter.length;j++) {
            if(countryObject[i].region == regionsFilter[j] && regionsTest[j] == 1) {
              xmaxmin.push(countryObject[i].gii);
              break;
            }
                     }
          }else if (countryObject[i].gii > 75 && datasort == 3) {
                     for (var j=0; j < regionsFilter.length;j++) {
            if(countryObject[i].region == regionsFilter[j] && regionsTest[j] == 1) {
              xmaxmin.push(countryObject[i].gii);
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
 //fill(0,211,211, 50);
 //fill(210,180,140,100);
// fill(216,185,144);
  fill(152,131,102);
 stroke(152,142,120,50);
 rect(width * 0.1, height * 0.75, width * 0.85, 20);
  fill(33);

stroke(88);
//X-AXIS
line(width * 0.1, height * 0.75, width * 0.95, height * 0.75);
//Y-AXIS
line(width * 0.95, height * 0.75, width * 0.95, height * 0.1);
var maxtomin = 5 + int(max(xmaxmin) / 5) * 5;
var minnum = int(min(xmaxmin) / 5) * 5;
var maxnum = 5 + int(max(xmaxmin) / 5) * 5;
while(maxtomin > 0) {
  stroke(88);
  line(map(maxtomin,maxnum,minnum,width * 0.1,width * 0.95),height * 0.75 + 5,map(maxtomin,maxnum,minnum,width * 0.10,width * 0.95),height * 0.75 - 5);
  noStroke();
  textAlign(CENTER,TOP);
  if (maxtomin != maxnum) {
    if (maxtomin != minnum) {
  text(maxtomin,map(maxtomin,maxnum,minnum,width * 0.1,width * 0.95),height * 0.75 + 8);
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
  line(width * 0.95 + 5,map(ymaxtomin,ymax,ymin,height * 0.1,height * 0.75),width * 0.95 - 5,map(ymaxtomin,ymax,ymin,height * 0.1,height * 0.75));
  noStroke();
  textAlign(LEFT,CENTER);
      var yaxisText = "$" + ymaxtomin;
  if (ymax === 100) {
     yaxisText = ymaxtomin + "%";
  }
  text(yaxisText,width * 0.95 + 8,map(ymaxtomin,ymax,ymin,height * 0.1,height * 0.75));
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
var thisX = map(xpoint,maxnum,minnum,width * 0.1,width * 0.95);
//console.log(thisX);

var locationinfo = [theYlimit, theLowerY, thisX, maleHigher, countryName];
rolloverArray.push(locationinfo);

textAlign(CENTER,TOP);
noStroke();
if (countrySelected == "none" || countrySelected == countryName) {
if (region == "Central")
  fill(CentralColor);
else if (region == "Eastern")
  fill(EasternColor);
else if (region == "Southern")
  fill(SouthernColor);
else if (region == "Northern")
  fill(NorthernColor);
else if (region == "Western")
  fill(WesternColor);
} else {
 if (region == "Central")
  fill(CentralFade);
else if (region == "Eastern")
  fill(EasternFade);
else if (region == "Southern")
  fill(SouthernFade);
else if (region == "Northern")
  fill(NorthernFade);
else if (region == "Western")
  fill(WesternFade);
}

var startDraw = height * 0.75 + 20;
ybottom = startDraw;
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
if (startup) {
aniTheDraw(startDraw,forkHere,thisX,theLowerY,theYlimit,forkdraw,region,mdata);
} else {
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
       if  (dataspec === 11) {
        text("^ " + mdata,thisX + 15, 10);
       }
        break;
      }
}
noFill();
if (countrySelected == "none" || countrySelected == countryName) {
  var boxColor = CentralColor;
if (region == "Central")
  stroke(CentralColor);
else if (region == "Eastern")
  stroke(EasternColor);
else if (region == "Northern")
  stroke(NorthernColor);
else if (region == "Southern")
  stroke(SouthernColor);
else if (region == "Western")
  stroke(WesternColor);
if (region == "Central")
  boxColor = CentralColor;
else if (region == "Eastern")
  boxColor = EasternColor;
else if (region == "Northern")
  boxColor = NorthernColor;
else if (region == "Southern")
  boxColor = SouthernColor;
else if (region == "Western")
  boxColor = WesternColor;
} else {
 if (region == "Central")
  stroke(CentralFade);
else if (region == "Eastern")
  stroke(EasternFade);
else if (region == "Northern")
  stroke(NorthernFade);
else if (region == "Southern")
  stroke(SouthernFade);
else if (region == "Western")
  stroke(WesternFade);
}
  ellipse(thisX + 10, theYlimit,8,8);

//HERE IS THE TEXT BOX
if (countrySelected == countryName) {
  fill(255)
 //   rect(thisX - 160,theYlimit-55, 155, 60,5);

  fill(153);
  noStroke();
  var ystart = theLowerY - 7;
  if (theLowerY < 100) {
   ystart = theLowerY;
  }
  while(ystart > theYlimit + 5) {
      ellipse(thisX - 10, ystart,2,2);
      ystart -= 5;
  }
  fill(0);
  noStroke();
  textAlign(LEFT);
 //text("In " + countryName + mdata, thisX - 155,theYlimit-55);
 
 ///DATA STORY SENTENCES
 var datasentence = "annual income";
  var dataStory = "";

 if (dataspec > 1 && dataspec < 8) {
if (dataspec == 2) datasentence = "% of firms have female participation in ownership.";
else if (dataspec == 3) datasentence = "% of firms have at least one female top manager.";
    else if(dataspec == 4) datasentence = "% of firms have majority female ownership.";
    else if(dataspec == 5) datasentence = "% of permanent full-time workers are female.";
    else if(dataspec == 6) datasentence = "%  of permanent full-time production workers are female.";
    else if(dataspec == 7) datasentence = "%  of permanent full-time non-production workers are female.";
  dataStory = "In " + countryName + ", " + fdata + datasentence;
} else if (dataset == 3) {
    dataStory =  "In " + countryName + ", " + fdata + "% of the women and " + mdata + "% of the men participate in the labor force.";
} else {
  var thigap = mdata - fdata;
  var percentgap = int(100 * thigap/fdata);
  var digit = percentgap.toString()[0];
  var anOrA = "a";
  if (digit == 8 || percentgap == 11 || percentgap == 18) {
    anOrA = "an";
  }
  dataStory =  "In " + countryName + ", women earn an average of $" + fdata + " a year. Men earn $" + mdata + ". That is " + anOrA + " " + percentgap + "% gap.";
}

var boxX = width-int(thisX);
var boxY = height-int(theYlimit + 5);
if (theYlimit < 100) {
  var boxY = height-110;
}
// popupInfo
var elt1 = document.getElementById("popupInfo");
var newPlace = thisX + "px";
elt1.style.right = boxX + 'px';
elt1.style.bottom = boxY + 'px';
elt1.style.borderColor = boxColor;
elt1.style.visibility = 'visible';
  elt1.innerHTML = dataStory;

} 
}
}


function windowResized() {
  trackWindow = true;
 // if (!startup) {
resizeCanvas(windowWidth, windowHeight);
background(255);
         background(backColor);
    makeAxis();
    namecollision = [];
      rolloverArray = [];
     // trackWindow = false;
 for (var i = 0; i < countryObject.length; i++) {
  countryObject[i].display();
 }
 
//  }
 }

function mouseMoved() {
  if (!startup) {
  var nowSelected = "none";
  var foundCountry = []
  for (var u=0; u < rolloverArray.length; u++) {
    
  var ldist = dist(rolloverArray[u][2]-10,rolloverArray[u][1], mouseX, mouseY);
  var hdist = dist(rolloverArray[u][2]+10,rolloverArray[u][0], mouseX, mouseY);
  var Bdist = dist(rolloverArray[u][2],ybottom, mouseX, mouseY);
  if (ldist < 6 || hdist < 6 || Bdist < 15) {
    foundCountry.push(rolloverArray[u][4]);
    if (ldist < 6) {
      foundCountry.push(ldist);
    } else {
     foundCountry.push(hdist);
    }
  }
  }
  if (foundCountry.length > 2) {
    var themin = foundCountry[1];
    var minIndex = 0;
    //search for the loWestern distance between the center and the cursor
  for (var j = 3; j < foundCountry.length; j = j + 2) {
         if (foundCountry[j] < themin) {
        minIndex = j - 1;
        themin = foundCountry[j];
      }
    }
    nowSelected = foundCountry[minIndex];
    //below if you just get one dots
  } else if (foundCountry.length == 2) {
        nowSelected = foundCountry[0];
  }
  if (countrySelected != nowSelected) {
    if (nowSelected != "none") {
        cursor(HAND);
        text(nowSelected,10,10);
    } else {
      cursor(ARROW)
    }
    countrySelected = nowSelected;
    background(255);
         background(backColor);
    makeAxis();
    namecollision = [];
 for (var i = 0; i < countryObject.length; i++) {
  countryObject[i].display();
 }

  }
}
if (nowSelected == "none") {
   var elt1 = document.getElementById("popupInfo");
elt1.style.visibility = 'hidden';

}
}

function aniTheDraw(AstartDraw,AforkHere,AthisX,AtheLowerY,AtheYlimit,Aforkdraw,Aregion,AData) {
if (Aregion == "Central")
  fill(CentralColor);
else if (Aregion == "Eastern")
  fill(EasternColor);
else if (Aregion == "Southern")
  fill(SouthernColor);
else if (Aregion == "Northern")
  fill(NorthernColor);
else if (Aregion == "Western")
  fill(WesternColor);

noStroke();
if (AstartDraw > AforkHere) {
  ellipse(AthisX, AstartDraw,2,2);
  AstartDraw -= 5;
} else if (AstartDraw > AtheLowerY) {
 // fill(222,222,0);
    ellipse(AthisX + forkArray[Aforkdraw], AstartDraw,2,2);
    ellipse(AthisX - forkArray[Aforkdraw], AstartDraw,2,2);
      AstartDraw -= 5;
        Aforkdraw++;
} else if (AstartDraw -5 <= AtheLowerY && Aforkdraw > 1) {
ellipse(AthisX - 10, AtheLowerY,8,8);
if (AstartDraw - 5 <= AtheYlimit) {
  ellipse(AthisX + 10, AtheYlimit,8,8);
}
Aforkdraw = 1;
} else if (AstartDraw - 5 > AtheYlimit) {
      ellipse(AthisX + 10, AstartDraw,2,2);
     AstartDraw -= 5;
   if (AstartDraw - 5 < AtheYlimit) {
        noFill();
if (Aregion == "Central")
  stroke(CentralColor);
else if (Aregion == "Eastern")
  stroke(EasternColor);
else if (Aregion == "Southern")
  stroke(SouthernColor);
else if (Aregion == "Northern")
  stroke(NorthernColor);
else if (Aregion == "Western")
  stroke(WesternColor);

      ellipse(AthisX + 10, AtheYlimit,8,8);

    }
 if (AstartDraw < -10) {
        textAlign(LEFT);
               if (dataspec === 11) {
        text("^ " + AData,AthisX + 15, 10);
               }
        startup = false;
        var elt1 = document.getElementById("XAXIS");
        elt1.style.visibility = 'visible';
        var elt1 = document.getElementById("YAXIS");
        elt1.style.visibility = 'visible';
        var elt1 = document.getElementById("regions");
        elt1.style.visibility = 'visible';

        AstartDraw = -15;
        
    }
} else {
  AstartDraw = -15;
 // startup = false;
}

  
if (AstartDraw > AtheYlimit && AstartDraw > -15) {
  var aniSpeed = 100;
  if (AstartDraw < height/3 + height/3) {
    aniSpeed = 25;
  } else if (AstartDraw < height/3) {
    aniSpeed = 5;
  }
  timeoutTrack++;
 // if (!trackWindow) {
var mytime = setTimeout(function() {
    aniTheDraw(AstartDraw,AforkHere,AthisX,AtheLowerY,AtheYlimit,Aforkdraw,Aregion,AData);
}, aniSpeed)
if (trackWindow) {
  while(mytime--) {
  clearTimeout(mytime);
  }
  trackWindow = false;
  timeoutTrack = 0;
}

//}
}
}