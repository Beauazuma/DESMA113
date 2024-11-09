//help from Chat GPT and the coding train on youtube. 

let x, y;
let x2, y2;

let frameCountLimit = 10000;
let currentFrame = 0;
let walkerSize = 1;

function setup() {
  createCanvas(600, 600);
  
  x = width / 2;
  y = height / 2;
  
  x2 = width / 2;
  y2 = height / 2;
  
  background(0);
  noStroke();
  
  colorMode(HSB, 100); // Keeping HSB for color control
}

function draw() {
  for (let i = 0; i < 100; i++) {
    step();
  }

  currentFrame++;

  // Stop after reaching the frame limit
  if (currentFrame >= frameCountLimit) {
    noLoop();
  }
}

function step() {
  
  x += random(-1, 1);
  y += random(-1, 1);
  
  x = constrain(x, walkerSize / 2, width - walkerSize / 2);
  y = constrain(y, walkerSize / 2, height - walkerSize / 2);
  
  x2 += random(-1, 1);
  y2 += random(-1, 1);
  
  x2 = constrain(x2, walkerSize / 2, width - walkerSize / 2);
  y2 = constrain(y2, walkerSize / 2, height - walkerSize / 2);
  
  // Define the center of the canvas
  let centerX = width / 2;
  let centerY = height / 2;
  
  let centerX2 = width / 2;
  let centerY2 = height / 2;

  // Calculate the distance from the mouse position to the center
  let distFromCenter = dist(x, y, centerX, centerY);
  let distFromCenter2 = dist(x2, y2, centerX2, centerY2);
  
  // Define the maximum distance (200 pixels from the center)
  let maxDist = 200;
  let maxDist2 = 200;
  // Map the distance to the alpha value (50 at the center, 0 at the border)
  let alpha = map(distFromCenter, 0, maxDist, 50, 0);
  let alpha2 = map(distFromCenter2, 0, maxDist2, 50, 0);
  
  // Constrain alpha so it doesn't go below 0 or above 50
  alpha = constrain(alpha, 0, 10);
  
  // Set the fill color with the mapped alpha
  fill(255, alpha);
  
  // Draw the ellipse
  noStroke();
  ellipse(x, y, walkerSize, walkerSize); 
  
  //fill(255, alpha);
 // ellipse(x, y, walkerSize, walkerSize); 
  //print(mouseX, mouseY);
}

