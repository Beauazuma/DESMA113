//work cited: An algorithm for irregular grids by Ahmad Moussa. Chat GPT for trouble shooting. Patt Vira

let rectInfo = [];
let c = [];
//var l = random(1,2);

function setup() {
  randomSeed(random(0, 1000000000000));

  widMod = 1;
  lenMod = 1;

  w = min(windowWidth, windowHeight);

  wx = w * widMod;
  wy = w * lenMod;

  createCanvas(wx, wy);

  // size of the padding between grid and sketch borders
  padding = w / random(4, 50);

  // number of rows and columns of the grid
  gridDivsX = random(3, 100);
  gridDivsY = random(3, 100);

  // actual spacing between grid points
  gridSpacingX = (wx - padding * 2) / gridDivsX;
  gridSpacingY = (wy - padding * 2) / gridDivsY;

  // here we populate the 2d boolean array
  bools = [];
  for (let x = 0; x <= gridDivsX; x++) {
    var column = [];
    for (let y = 0; y <= gridDivsY; y++) {
      column.push([1]);
    }
    bools.push(column);
  }

  //COLORING
  for (let i = 0; i < gridDivsX; i++) {
    c[i] = [];
    for (let j = 0; j < gridDivsY; j++) {
      c[i][j] = color(random(256), random(256), random(256));
    }
  }

  //THEGRIDDD
  constructIrregularGrid([random(0.01, 2), random(0.01, 3)]);
  constructIrregularGrid([random(0)]);

  background(230);
  stroke(255);
  strokeWeight(0);
  noFill();
  drawGrid();
  markEmptySpots();
}


function makeRect(posX, posY, dimX, dimY) {
  this.posX = posX;
  this.posY = posY;
  this.dimX = dimX;
  this.dimY = dimY;
}

function constructIrregularGrid(sizesArr) {
  for (let x = 0; x < gridDivsX - max(sizesArr) + 1; x++) {
    for (let y = 0; y < gridDivsY - max(sizesArr) + 1; y++) {
      xdim = random(sizesArr);
      ydim = random(sizesArr);

      fits = true;

      // check if within bounds
      if (x + xdim > gridDivsX || y + ydim > gridDivsY) {
        fits = false;
      }

      // check if rectangle overlaps with any other rectangle
      if (fits) {
        for (let xc = x; xc < x + xdim; xc++) {
          for (let yc = y; yc < y + ydim; yc++) {
            if (bools[xc][yc] == 0) {
              fits = false;
            }
          }
        }
      }

      if (fits) {
        // mark area as occupied
        for (let xc = x; xc < x + xdim; xc++) {
          for (let yc = y; yc < y + ydim; yc++) {
            bools[xc][yc] = false;
          }
        }

        rectInfo.push(new makeRect(x, y, xdim, ydim));
      }
    }
  }
}



function drawGrid() {

  for (let n = 0; n < rectInfo.length; n++) {
    r = rectInfo[n];

    fill(c[r.posX][r.posY]);

    rect(
      r.posX * gridSpacingX + padding,
      r.posY * gridSpacingY + padding,
      r.dimX * gridSpacingX,
      r.dimY * gridSpacingY
    );
  }
}

function markEmptySpots() {
  for (let x = 0; x < gridDivsX; x++) {
    for (let y = 0; y < gridDivsY; y++) {
      if (bools[x][y]) {
        point(
          x * gridSpacingX + gridSpacingX / 2 + padding,
          y * gridSpacingY + gridSpacingY / 2 + padding
        );
      }
    }
  }
}

function keyPressed()  {
  drawGrid();
}
