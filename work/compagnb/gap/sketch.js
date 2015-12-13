var quanTable;

var countryInfo = [];
var sorted = [];

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
var completed = false;

var centralCheckBox, eastCheckBox, northernCheckBox, southernCheckBox, westCheckBox;

var dropValue = 'HDR Ratings';
var sortValue = 'By Male Rating';

var femaleImg, maleImg, headerImg;

// min and max values for the size
var minVal = 100; // make higher for worse case senerio
var maxVal = 0; // make lower for worse case and gets bumped up higher

var fontLight;

function preload() {
  // info imported
  quanTable = loadTable("data/hdrQuant.txt", "tsv", "header");

  // load images
  femaleImg = loadImage("images/femalesmW.png");
  maleImg = loadImage("images/malesmW.png");
  headerImg = loadImage("images/header.png");

  // load font
  fontLight = loadFont("fonts/Roboto-Light.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight - 78);
  background('#3d3d3d');
  noLoop(); // no need for input or animation here
  noFill();
  // textSize(10);

  // process all the data into arrays
  processData(quanTable);

  if (loaded) {
    for (row = 0; row < areas.length; row++) {
      countryInfo.push(new CountryInfo(row));
    }
    checkBoxes();
    dataFilter();
    sortFilter();
    completed = true;
  }


}

function draw() {
  // draw default
  //createHeader(); // need to fix stroke and placement
  drawBkgrd();
  drawRefGuides();
  if (completed) {
    reload();
  }

}

function processData(test) {
  //  count the rows
  print(test.getRowCount() + " total rows in table");
  //  count the columns
  print(test.getColumnCount() + " total columns in table");
  //  print contents of column named Country Name
  areas = test.getColumn("area");
  ranks = test.getColumn("HDI ranks");
  countries = test.getColumn("Country");
  hdrF = test.getColumn("hdrF2013");
  hdrM = test.getColumn("hdrM2013");
  lifeF = test.getColumn("lifeF2013");
  lifeM = test.getColumn("lifeM2013");
  meanSchoolF = test.getColumn("meanSchoolF2002-2012");
  meanSchoolM = test.getColumn("meanSchoolM2000-2012");
  expSchoolF = test.getColumn("expSchoolF2000-2012");
  expSchoolM = test.getColumn("expSchoolM2000-2012");
  gniF = test.getColumn("gniF2013");
  gniM = test.getColumn("gniM2013");

  loaded = true;
}

// function to give max and min values
function mapHighLow(int) {
  minVal = 1000000000;
  maxVal = 0;
  var count = quanTable.getRowCount();
  //get min and max
  for (var row = 1; row < count; row++) {
    for (var col = int; col < int + 1; col++) {
      var val = quanTable.getString(row, col);
      val = float(val);

      if (minVal > val) {
        minVal = val;
      } else if (maxVal < val) {
        maxVal = val;
      }
      //console.log(minVal + " || " + maxVal);
    }
  }
}

function createHeader() {
  image(maleImg, width - 30, 10);
  fill("rgba(255, 255, 255, 0.8)");
  text("Male", width - 70, 25);
  image(femaleImg, width - 30, 40);
  text("Female", width - 79, 55);
}

function CountryInfo(row) {
  this.row = row;
  this.area = areas[this.row];
  this.country = countries[this.row];
  this.rank = ranks[this.row];

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


  if (this.hdrM != "..") {
    if (this.hdrF < this.hdrM) {
      this.hdrGap = this.hdrM - this.hdrF;
    } else if (this.hdrF > this.hdrM) {
      this.hdrGap = this.hdrF - this.hdrM;
    }
  } else {
    this.hdrGap = 0;
  }

  if (this.lifeM != "..") {
    if (this.lifeF < this.lifeM) {
      this.lifeGap = this.lifeM - this.lifeF;
    } else if (this.lifeF > this.lifeM) {
      this.lifeGap = this.lifeF - this.lifeM;
    }
  } else {
    this.lifeGap = 0;
  }

  if (this.meanSchoolF != "..") {
    this.meanSchoolF = parseFloat(meanSchoolF[this.row]);
    this.meanSchoolM = parseFloat(meanSchoolM[this.row]);
    if (this.meanSchoolF < this.meanSchoolM) {
      this.meanSchoolGap = this.meanSchoolM - this.meanSchoolF;
    } else if (this.meanSchoolF > this.meanSchoolM) {
      this.meanSchoolGap = this.meanSchoolF - this.meanSchoolM;

    }
  } else {
    this.meanSchoolF = 0;
    this.meanSchoolM = 0;
    this.meanSchoolGap = -100;
  }


  if (this.expSchoolM != "..") {
    this.expSchoolF = parseFloat(expSchoolF[this.row]);
    this.expSchoolM = parseFloat(expSchoolM[this.row]);
    if (this.expSchoolF < this.expSchoolM) {
      this.expSchoolGap = this.expSchoolM - this.expSchoolF;
    } else if (this.expSchoolF > this.expSchoolM) {
      this.expSchoolGap = this.expSchoolF - this.expSchoolM;
    }
  } else {
    this.expSchoolF = 0;
    this.expSchoolM = 0;
    this.expSchoolGap = -100;
  }

  if (this.gniM != "..") {
    this.gniF = parseInt(gniF[this.row]);
    this.gniM = parseInt(gniM[this.row]);
    if (this.gniF < this.gniM) {
      this.gniGap = this.gniM - this.gniF;
    } else if (this.lifeF > this.lifeM) {
      this.gniGap = this.gniF - this.gniM;
    }
  } else {
    this.gniF = 0;
    this.gniM = 0;
    this.gniGap = 0;
  }

}
CountryInfo.prototype.showCountryNames = function() {
  push();
  translate((this.row + 1) * width / 55, height - 170);
  rotate(45);
  strokeWeight(0);
  fill('rgba(255, 255, 255, 0.8)');
  textSize(12);
  textFont(fontLight);
  text(this.country, 10, 0);
  rotate(0);
  pop();

  // fill('rgba(255, 255, 255, 0.3)');
  // for (var i = 0; i < height - 170; i = i + 20) {
  //   rect((this.row * width / 55) + 7, i, 1, 0);
  // }
};

CountryInfo.prototype.display = function() {
  var femaleRank;
  var maleRank;

  if (dropValue == 'HDR Ratings') {
    femaleRank = this.hdrF;
    maleRank = this.hdrM;
    minVal = 0.20;
    maxVal = 0.85;
  } else if (dropValue === 'Life Expectancy') {
    femaleRank = this.lifeF;
    maleRank = this.lifeM;
    minVal = 20;
    maxVal = 100;
  } else if (dropValue === 'Avg. Years of Schooling') {
    femaleRank = this.meanSchoolF;
    maleRank = this.meanSchoolM;
    minVal = 0;
    maxVal = 12;
  } else if (dropValue === 'Expected Years of Schooling') {
    femaleRank = this.expSchoolF;
    maleRank = this.expSchoolM;
    minVal = 0;
    maxVal = 18;
  } else if (dropValue === 'GNI') {
    femaleRank = this.gniF;
    maleRank = this.gniM;
    minVal = -2000;
    maxVal = 35000;
  }

  // countryInfo[this.row].showCountryNames();

  if (this.area == 'central' && centralCheckBox.checked()) {
    drawImages(femaleRank, maleRank, minVal, maxVal, this.row);
  }

  if (this.area == 'east' && eastCheckBox.checked()) {
    drawImages(femaleRank, maleRank, minVal, maxVal, this.row);
  }

  if (this.area == 'northern' && northernCheckBox.checked()) {
    drawImages(femaleRank, maleRank, minVal, maxVal, this.row);
  }

  if (this.area == 'southern' && southernCheckBox.checked()) {
    drawImages(femaleRank, maleRank, minVal, maxVal, this.row);
  }

  if (this.area == 'west' && westCheckBox.checked()) {
    drawImages(femaleRank, maleRank, minVal, maxVal, this.row);
  }
};

function dataFilter() {
  dropdown = createElement('select');
  dropdown.addClass('styled-select');
  // dropdown.position(width - 180, 50);
  dropdown.parent('filters');
  var options = ['HDR Ratings', 'Life Expectancy', 'Avg. Years of Schooling', 'Expected Years of Schooling', 'GNI'];
  for (var i = 0; i < options.length; i++) {
    var option = createElement('option');
    option.attribute('value', options[i]);
    option.html(options[i]);
    option.parent(dropdown);
  }

  var droptest = createDiv('HDR Ratings');
  droptest.parent('value');

  dropdown.elt.onchange = function() {
    droptest.html(this.value);
    dropValue = this.value;
    // console.log(dropValue);
    reload();

  };
}

function sortFilter() {
  sortDrop = createElement('select');
  sortDrop.addClass('styled-select');
  // dropdown.position(width - 180, 50);
  sortDrop.parent('filters');
  var sortOptions = ['By Male Rating', 'By Female Rating', 'By Gap Amount'];
  for (var i = 0; i < sortOptions.length; i++) {
    var sortOption = createElement('option');
    sortOption.attribute('value', sortOptions[i]);
    sortOption.html(sortOptions[i]);
    sortOption.parent(sortDrop);
  }

  var sorttest = createDiv('By Male Rating');
  sorttest.parent('sortValue');

  sortDrop.elt.onchange = function() {
    sorttest.html(this.value);
    sortValue = this.value;
    // console.log(sortValue);
    reload();

  };
}

function checkBoxes() {

  centralCheckBox = createCheckbox('checkboxG1');
  centralCheckBox.id('checkboxG1');
  // centralCheckBox.parent('ck1');
  centralCheckBox.parent('filters');

  centralCheckBox.addClass('css-checkbox');
  var centralLabel = createElement('label', 'Central');
  centralLabel.addClass('css-label');
  // centralLabel.parent('ck1');
  centralLabel.parent('filters');

  centralCheckBox.checked(true); // passing in an arg sets its state?
  centralCheckBox.elt.onchange = function() {
    // console.log("central!");
    reload();
  };

  eastCheckBox = createCheckbox();
  eastCheckBox.parent('filters');
  eastCheckBox.addClass('pinkcheck');
  var eastLabel = createElement('label', 'Eastern');
  eastLabel.parent('filters');
  eastLabel.addClass('pinkcheck');
  eastCheckBox.checked(true); // passing in an arg sets its state?
  eastCheckBox.elt.onchange = function() {
    // console.log("east!");
    reload();
  };

  northernCheckBox = createCheckbox();
  northernCheckBox.parent('filters');
  northernCheckBox.addClass('pinkcheck');
  var northernLabel = createElement('label', 'Northern');
  northernLabel.parent('filters');
  northernLabel.addClass('pinkcheck');
  northernCheckBox.checked(true); // passing in an arg sets its state?
  northernCheckBox.elt.onchange = function() {
    // console.log("Northern!");
    reload();
  };

  southernCheckBox = createCheckbox();
  southernCheckBox.parent('filters');
  southernCheckBox.addClass('pinkcheck');
  var southernLabel = createElement('label', 'Southern');
  southernLabel.addClass('pinkcheck');
  southernLabel.parent('filters');
  southernCheckBox.checked(true); // passing in an arg sets its state?
  southernCheckBox.elt.onchange = function() {
    // console.log("Southern!");
    reload();
  };

  westCheckBox = createCheckbox();
  westCheckBox.parent('filters');
  westCheckBox.addClass('pinkcheck');
  var westLabel = createElement('label', 'Western');
  westLabel.parent('filters');
  westLabel.addClass('pinkcheck');
  westCheckBox.checked(true); // passing in an arg sets its state?
  westCheckBox.elt.onchange = function() {
    // console.log("West!");
    reload();
  };

}

function drawBkgrd() {
  background('#3d3d3d');
  fill('#2B2B2B');
  strokeWeight(0);
  rect(0, height - 170, width, height);
}

function drawRefGuides() {
  if (dropValue == 'HDR Ratings') {
    fill("rgba(255, 255, 255, 0.8)");
    stroke("#D3D3D3");
    strokeWeight(0);
    textFont(fontLight);
    textSize(12);
    text(".20 HDR", 5, map(0.21, 0.20, 0.85, height - 170, 0));
    text(".35 HDR", 5, map(0.35, 0.20, 0.85, height - 170, 0));
    text(".50 HDR", 5, map(0.5, 0.20, 0.85, height - 170, 0));
    text(".65 HDR", 5, map(0.65, 0.20, 0.85, height - 170, 0));
    text(".85 HDR", 5, map(0.83, 0.20, 0.85, height - 170, 0));
    rect(0, map(0.20, 0.20, 0.85, height - 170, 0), width, 1);

    fill("rgba(255, 255, 255, 0.1)");
    stroke("rgba(255, 255, 255, 0.1)");
    rect(0, map(0.35, 0.20, 0.85, height - 170, 0), width, 1);
    rect(0, map(0.5, 0.20, 0.85, height - 170, 0), width, 1);
    rect(0, map(0.65, 0.20, 0.85, height - 170, 0), width, 1);

  } else if (dropValue === 'Life Expectancy') {
    fill("rgba(255, 255, 255, 0.8)");
    stroke("#D3D3D3");
    strokeWeight(0);
    textFont(fontLight);
    textSize(12);
    text("20 yrs", 5, map(21.25, 20, 100, height - 170, 0));
    text("40 yrs", 5, map(40, 20, 100, height - 170, 0));
    text("60 yrs", 5, map(60, 20, 100, height - 170, 0));
    text("80 yrs", 5, map(80, 20, 100, height - 170, 0));
    text("100 yrs", 5, map(97.5, 20, 100, height - 170, 0));
    rect(0, map(20, 20, 100, height - 170, 0), width, 1);

    fill("rgba(255, 255, 255, 0.1)");
    stroke("rgba(255, 255, 255, 0.1)");

    rect(0, map(40, 20, 100, height - 170, 0), width, 1);
    rect(0, map(60, 20, 100, height - 170, 0), width, 1);
    rect(0, map(80, 20, 100, height - 170, 0), width, 1);

  } else if (dropValue === 'Avg. Years of Schooling') {
    fill("rgba(255, 255, 255, 0.8)");
    stroke("#D3D3D3");
    strokeWeight(0);
    textFont(fontLight);
    textSize(12);
    text("0 yrs", 5, map(0.17, 0, 10, height - 170, 0));
    text("2 yrs", 5, map(2, 0, 12, height - 170, 0));
    text("4 yrs", 5, map(4, 0, 12, height - 170, 0));
    text("6 yrs", 5, map(6, 0, 12, height - 170, 0));
    text("8 yrs", 5, map(8, 0, 12, height - 170, 0));
    text("10 yrs", 5, map(10, 0, 12, height - 170, 0));
    text("12 yrs", 5, map(9.67, 0, 10, height - 170, 0));
    rect(0, map(0, 0, 10, height - 170, 0), width, 1);

    fill("rgba(255, 255, 255, 0.1)");
    stroke("rgba(255, 255, 255, 0.1)");
    rect(0, map(2, 0, 12, height - 170, 0), width, 1);
    rect(0, map(4, 0, 12, height - 170, 0), width, 1);
    rect(0, map(6, 0, 12, height - 170, 0), width, 1);
    rect(0, map(8, 0, 12, height - 170, 0), width, 1);
    rect(0, map(10, 0, 12, height - 170, 0), width, 1);
  } else if (dropValue === 'Expected Years of Schooling') {
    fill("rgba(255, 255, 255, 0.8)");
    stroke("#D3D3D3");
    strokeWeight(0);
    textFont(fontLight);
    textSize(12);
    text("0 yrs", 5, map(0.22, 0, 14, height - 170, 0));
    text("2 yrs", 5, map(2, 0, 14, height - 170, 0));
    text("4 yrs", 5, map(4, 0, 18, height - 170, 0));
    text("6 yrs", 5, map(6, 0, 18, height - 170, 0));
    text("8 yrs", 5, map(8, 0, 18, height - 170, 0));
    text("10 yrs", 5, map(10, 0, 18, height - 170, 0));
    text("12 yrs", 5, map(12, 0, 18, height - 170, 0));
    text("14 yrs", 5, map(14, 0, 18, height - 170, 0));
    text("16 yrs", 5, map(16, 0, 18, height - 170, 0));
    text("18 yrs", 5, map(13.55, 0, 14, height - 170, 0));
    rect(0, map(0, 0, 15, height - 170, 0), width, 1);

    fill("rgba(255, 255, 255, 0.1)");
    stroke("rgba(255, 255, 255, 0.1)");
    rect(0, map(2, 0, 18, height - 170, 0), width, 1);
    rect(0, map(4, 0, 18, height - 170, 0), width, 1);
    rect(0, map(6, 0, 18, height - 170, 0), width, 1);
    rect(0, map(8, 0, 18, height - 170, 0), width, 1);
    rect(0, map(10, 0, 18, height - 170, 0), width, 1);
    rect(0, map(12, 0, 18, height - 170, 0), width, 1);
    rect(0, map(14, 0, 18, height - 170, 0), width, 1);
    rect(0, map(16, 0, 18, height - 170, 0), width, 1);
  } else if (dropValue === 'GNI') {
    fill("rgba(255, 255, 255, 0.8)");
    stroke("#D3D3D3");
    strokeWeight(0);
    textFont(fontLight);
    textSize(12);
    text("0 GNI", 5, map(600, 100, 30000, height - 170, 0));
    text("5000 GNI", 5, map(5000, -2000, 35000, height - 170, 0));
    text("10000 GNI", 5, map(10000, -2000, 35000, height - 170, 0));
    text("15000 GNI", 5, map(15000, -2000, 35000, height - 170, 0));
    text("20000 GNI", 5, map(20000, -2000, 35000, height - 170, 0));
    text("25000 GNI", 5, map(25000, -2000, 35000, height - 170, 0));
    text("30000 GNI2", 5, map(30000, -2000, 35000, height - 170, 0));
    text("35000 GNI2", 5, map(34000, -2000, 35000, height - 170, 0));

    rect(0, map(100, 100, 30000, height - 170, 0), width, 1);

    fill("rgba(255, 255, 255, 0.1)");
    stroke("rgba(255, 255, 255, 0.1)");
    rect(0, map(5000, -2000, 35000, height - 170, 0), width, 1);
    rect(0, map(10000, -2000, 35000, height - 170, 0), width, 1);
    rect(0, map(15000, -2000, 35000, height - 170, 0), width, 1);
    rect(0, map(20000, -2000, 35000, height - 170, 0), width, 1);
    rect(0, map(25000, -2000, 35000, height - 170, 0), width, 1);
    rect(0, map(30000, -2000, 35000, height - 170, 0), width, 1);
  }
}

function drawDottedGuides() {
   stroke('rgba(255, 255, 255, 0.1)');
  for (var j = 1; j < 54; j++) {
    fill('rgba(255, 255, 255, 0.3)');
    for (var i = 0; i < height - 170; i = i + 5) {
      rect((j * width / 55) + 7,i, 1, 0);
      // console.log(this.row);
    }
  }
}

function reload() {
  drawBkgrd();
  drawRefGuides();


  sortMe();

  for (var i = 0; i < sorted.length; i++) {
    sorted[i].display();
    sorted[i].showCountryNames();
  }
  drawDottedGuides();

}

function sortMe() {
  // hdr
  if (dropValue == 'HDR Ratings' && sortValue == 'By Male Rating') {
    sorted = [];
    sorted = countryInfo.sort(function(a, b) {
      if (a.hdrM > b.hdrM) {
        return 1;
      }
      if (a.hdrM < b.hdrM) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    sorted = sorted.map(function(val, ind) {
      val.row = ind;
      return val;
    });
  }
  if (dropValue == 'HDR Ratings' && sortValue == 'By Female Rating') {
    sorted = [];
    sorted = countryInfo.sort(function(a, b) {
      if (a.hdrF > b.hdrF) {
        return 1;
      }
      if (a.hdrF < b.hdrF) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    sorted = sorted.map(function(val, ind) {
      val.row = ind;
      return val;
    });
  }
  if (dropValue == 'HDR Ratings' && sortValue == 'By Gap Amount') {
    sorted = [];
    sorted = countryInfo.sort(function(a, b) {
      if (a.hdrGap > b.hdrGap) {
        return 1;
      }
      if (a.hdrGap < b.hdrGap) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    sorted = sorted.map(function(val, ind) {
      val.row = ind;
      return val;
    });
  }

  // life
  if (dropValue == 'Life Expectancy' && sortValue == 'By Male Rating') {
    sorted = [];
    sorted = countryInfo.sort(function(a, b) {
      if (a.lifeM > b.lifeM) {
        return 1;
      }
      if (a.lifeM < b.lifeM) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    sorted = sorted.map(function(val, ind) {
      val.row = ind;
      return val;
    });
  }
  if (dropValue == 'Life Expectancy' && sortValue == 'By Female Rating') {
    sorted = [];
    sorted = countryInfo.sort(function(a, b) {
      if (a.lifeF > b.lifeF) {
        return 1;
      }
      if (a.lifeF < b.lifeF) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    sorted = sorted.map(function(val, ind) {
      val.row = ind;
      return val;
    });
  }
  if (dropValue == 'Life Expectancy' && sortValue == 'By Gap Amount') {
    sorted = [];
    sorted = countryInfo.sort(function(a, b) {
      if (a.lifeGap > b.lifeGap) {
        return 1;
      }
      if (a.lifeGap < b.lifeGap) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    sorted = sorted.map(function(val, ind) {
      val.row = ind;
      return val;
    });
  }

  // Avg. Years of Schooling
  if (dropValue == 'Avg. Years of Schooling' && sortValue == 'By Male Rating') {
    sorted = [];
    sorted = countryInfo.sort(function(a, b) {
      if (a.meanSchoolM > b.meanSchoolM) {
        return 1;
      }
      if (a.meanSchoolM < b.meanSchoolM) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    sorted = sorted.map(function(val, ind) {
      val.row = ind;
      return val;
    });

    for (var i = 0; i < countryInfo.length; i++) {
      // console.log("meanSchoolM: " + countryInfo[i].meanSchoolM + " || " + sorted[i].meanSchoolM);
    }
  }
  if (dropValue == 'Avg. Years of Schooling' && sortValue == 'By Female Rating') {
    sorted = [];
    sorted = countryInfo.sort(function(a, b) {
      if (a.meanSchoolF > b.meanSchoolF) {
        return 1;
      }
      if (a.meanSchoolF < b.meanSchoolF) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    sorted = sorted.map(function(val, ind) {
      val.row = ind;
      return val;
    });
  }
  if (dropValue == 'Avg. Years of Schooling' && sortValue == 'By Gap Amount') {
    sorted = [];
    sorted = countryInfo.sort(function(a, b) {
      if (a.meanSchoolGap > b.meanSchoolGap) {
        return 1;
      }
      if (a.meanSchoolGap < b.meanSchoolGap) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    sorted = sorted.map(function(val, ind) {
      val.row = ind;
      return val;
    });
  }

  // Exp. Years of Schooling
  if (dropValue == 'Expected Years of Schooling' && sortValue == 'By Male Rating') {
    sorted = [];
    sorted = countryInfo.sort(function(a, b) {
      if (a.expSchoolM > b.expSchoolM) {
        return 1;
      }
      if (a.expSchoolM < b.expSchoolM) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    sorted = sorted.map(function(val, ind) {
      val.row = ind;
      return val;
    });
  }
  if (dropValue == 'Expected Years of Schooling' && sortValue == 'By Female Rating') {
    sorted = [];
    sorted = countryInfo.sort(function(a, b) {
      if (a.expSchoolF > b.expSchoolF) {
        return 1;
      }
      if (a.expSchoolF < b.expSchoolF) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    sorted = sorted.map(function(val, ind) {
      val.row = ind;
      return val;
    });
  }
  if (dropValue == 'Expected Years of Schooling' && sortValue == 'By Gap Amount') {
    sorted = [];
    sorted = countryInfo.sort(function(a, b) {
      if (a.expSchoolGap > b.expSchoolGap) {
        return 1;
      }
      if (a.expSchoolGap < b.expSchoolGap) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    sorted = sorted.map(function(val, ind) {
      val.row = ind;
      return val;
    });
  }

  // GNI
  if (dropValue == 'GNI' && sortValue == 'By Male Rating') {
    sorted = [];
    sorted = countryInfo.sort(function(a, b) {
      if (a.gniM > b.gniM) {
        return 1;
      }
      if (a.gniM < b.gniM) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    sorted = sorted.map(function(val, ind) {
      val.row = ind;
      return val;
    });
  }
  if (dropValue == 'GNI' && sortValue == 'By Female Rating') {
    sorted = [];
    sorted = countryInfo.sort(function(a, b) {
      if (a.gniF > b.gniF) {
        return 1;
      }
      if (a.gniF < b.gniF) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    sorted = sorted.map(function(val, ind) {
      val.row = ind;
      return val;
    });
  }
  if (dropValue == 'GNI' && sortValue == 'By Gap Amount') {
    sorted = [];
    sorted = countryInfo.sort(function(a, b) {
      if (a.gniGap > b.gniGap) {
        return 1;
      }
      if (a.gniGap < b.gniGap) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    sorted = sorted.map(function(val, ind) {
      val.row = ind;
      return val;
    });
  }



}

function drawImages(femaleRank, maleRank, minVal, maxVal, row) {
  if (femaleRank > 0 || maleRank > 0) {
    
    if (femaleRank < maleRank) {
      strokeWeight(0);
      fill('rgba(255, 255, 255, 0.8)');
      textSize(12);
      textFont(fontLight);
      text(nfc(maleRank-femaleRank,2,2), ((row + 1) * width / 55)-7, map(maleRank, minVal, maxVal, height - 170, 0)-30);
      
    }else{
      strokeWeight(0);
      fill('rgba(255, 255, 255, 0.8)');
      textSize(12);
      textFont(fontLight);
      text(nfc(femaleRank-maleRank,2,2), ((row + 1) * width / 55)-7, map(femaleRank, minVal, maxVal, height - 170, 0)-30);
      
    }
    
    beginShape();
    stroke('rgba(255, 255, 255, 0.3)');
    strokeWeight(6);
    //lines
    
    if (femaleRank < maleRank) {
      image(maleImg, ((row + 1) * width / 55) + 2, map(maleRank, minVal, maxVal, height - 170, 0)-25);
      image(femaleImg, ((row + 1) * width / 55) + 2, map(femaleRank, minVal, maxVal, height - 170, 0)+5);
      
      vertex(((row + 1) * width / 55) + 7, map(femaleRank, minVal, maxVal, height - 170, 0)); // record one vertex per data point
      vertex(((row + 1) * width / 55) + 7, map(maleRank, minVal, maxVal, height - 170, 0)); // record one vertex per data point

    } else {
      image(femaleImg, ((row + 1) * width / 55) + 2, map(femaleRank, minVal, maxVal, height - 170, 0)-25);
      image(maleImg, ((row + 1) * width / 55) + 2, map(maleRank, minVal, maxVal, height - 170, 0)+5);

      vertex(((row + 1) * width / 55) + 7, map(maleRank, minVal, maxVal, height - 170, 0)); // record one vertex per data point
      vertex(((row + 1) * width / 55) + 7, map(femaleRank, minVal, maxVal, height - 170, 0)); // record one vertex per data point
    }
    endShape();
  }
}

function pickColor(region){
  if (region == "Central"){
    return ;
  }
  if (region == "East"){
    return ;
  }
  if (region == "West"){
    return ;
  }
  if (region == "Southern"){
    return ;
  }
  if (region == "Northern"){
    return ;
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 78);
}
