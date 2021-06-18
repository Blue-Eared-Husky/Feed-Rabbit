var garden,rabbit;
var gardenImg,rabbitImg;
var appleImg, leafImg;
var apples, leaves;
var randomnum, points = 0;

function preload(){
  gardenImg = loadImage("garden.png");
  rabbitImg = loadImage("rabbit.png");
  appleImg = loadImage("apple.png");
  leafImg = loadImage("leaf.png");
}

function setup(){
  createCanvas(400,400);
  
  // Moving background
  garden=createSprite(200,200);
  garden.addImage(gardenImg);

  //creating boy running
  rabbit = createSprite(180,340,30,30);
  rabbit.scale =0.09;
  rabbit.addImage(rabbitImg);

  apples = createGroup();
  leaves = createGroup();
}


function draw() {
  background(0);
  
  edges= createEdgeSprites();
  rabbit.collide(edges);
  rabbit.x = World.mouseX;

  if (frameCount%80 == 0){
    randomnum = Math.round(random(1,2));
    if (randomnum == 1){
      createApples();
    }
    if (randomnum == 2){
      createLeaves();
    }
  }

  drawSprites();
  fill("white");
  text("Points: " + points,20,20);
}

function createApples(){
  var apple = createSprite(Math.round(random(10,390)),-10,10,10);
  apples.add(apple);
  apple.addImage(appleImg);
  apple.scale = 0.2;
  apple.depth = rabbit.depth;
  rabbit.depth = rabbit.depth + 1;
  apple.velocityY = 4;
  apples.setLifetimeEach(100);
  if (apples.isTouching(rabbit)){
    apples.destroyEach();
    points++;
  }
}

function createLeaves(){
  var leaf = createSprite(Math.round(random(10,390)),-10,10,10);
  leaves.add(leaf);
  leaf.addImage(leafImg);
  leaf.scale = 0.1;
  leaf.depth = rabbit.depth;
  rabbit.depth = rabbit.depth + 1;
  leaf.velocityY = 4;
  leaves.setLifetimeEach(100);
  if (leaf.y >403){
    leaf.destroy();
  }
  if (leaves.isTouching(rabbit)){
    leaves.destroyEach();
    points= points - 1;
  }
}