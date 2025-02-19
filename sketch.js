var PLAY=1;
var END=0;
var gamestate=PLAY;
var Trex,Trex_running;
var Ground,Groundimg;
var InvisibleGround;
var Cloudimg;
var CloudGroup;
var Cactus1,Cactus2,Cactus3,Cactus4,Cactus5,Cactus6;
var CactusGroup;
var gameOver;
var restart;
var gameOverImg;
var restartImg;
var score;
var jump;
var die;
var checkpoint;
function preload(){
Trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
Trex_collided=loadImage("trex_collided.png");
Groundimg=loadImage("ground2.png");
Cloudimg=loadImage("cloud.png");
Cactus1=loadImage("obstacle1.png");
Cactus2=loadImage("obstacle2.png");
Cactus3=loadImage("obstacle3.png");
Cactus4=loadImage("obstacle4.png");
Cactus5=loadImage("obstacle5.png");
Cactus6=loadImage("obstacle6.png");
gameOverImg=loadImage("gameOver.png");
restartImg=loadImage("restart.png");
jump=loadSound("jump.mp3");
die=loadSound("die.mp3");
checkpoint=loadSound("checkpoint.mp3");
}

function setup() {
  createCanvas(600, 200);
  Trex=createSprite(50,180,20,50);
Trex.addAnimation("running",Trex_running);
Trex.addAnimation("collided",Trex_collided);
  Trex.scale=0.5;
Ground=createSprite(200,180,400,20);
Ground.addImage("ground",Groundimg);
Ground.x=Ground.width/2;
Ground.velocityX=-(6+3*score/100);
InvisibleGround=createSprite(200,190,400,10);
InvisibleGround.visible=0;
CloudGroup=new Group();
CactusGroup=new Group();
Trex.setCollider("rectangle",0,0,100,100);
Trex.debug=true;
gameOver=createSprite(300,100);
gameOver.addImage(gameOverImg);
restart=createSprite(300,140);
restart.addImage(restartImg);
gameOver.scale=0.5;
restart.scale=0.5;
score=0;
}
function draw() {
  background("white");
  text("Score: "+score,500,50);
  if(gamestate==PLAY){
    score=score+Math.round(getFrameRate()/60);
    Ground.velocityX=-(6+3*score/100);
    gameOver.visible=false;
    restart.visible=false;
    if(score>0&&score%100==0){
      checkpoint.play();
    }
    if(keyDown("space") && Trex.y>=150){
      Trex.velocityY=-12;
      jump.play();
    }
    if(Ground.x<0){
      Ground.x=Ground.width/2;
      }
      Trex.velocityY=Trex.velocityY+0.8;
      spawnClouds();
spawnObstacles();
if(CactusGroup.isTouching(Trex)){
gamestate=END;
die.play();
  }}
  else if(gamestate==END){
    gameOver.visible=true;
    restart.visible=true;
    Ground.velocityX=0;
    Trex.velocityY=0;
    CactusGroup.setVelocityXEach(0);
    CloudGroup.setVelocityXEach(0);
    CactusGroup.setLifetimeEach(-1);
    CloudGroup.setLifetimeEach(-1);
    Trex.changeAnimation("collided",Trex_collided);

    if(mousePressedOver(restart)){
      reset();
    }
  }
Trex.collide(InvisibleGround);
  drawSprites();
}
function spawnClouds(){
  if(frameCount%60==0){
  var Cloud=createSprite(600,120,40,10);
  Cloud.addImage("cloud",Cloudimg);
  Cloud.velocityX=-3;
  Cloud.y=Math.round(random(80,120));
  Cloud.scale=0.5;
  Cloud.depth=Trex.depth;
  Trex.depth=Trex.depth+1
  Cloud.lifetime=230;
  CloudGroup.add(Cloud);
}}
function spawnObstacles(){
if(frameCount%60==0){
  var Obstacles=createSprite(600,165,10,40);
  Obstacles.velocityX=-(6+3*score/100);
  var numeros=Math.round(random(1,6));
  switch(numeros){
case 1:Obstacles.addImage(Cactus1);
break;
case 2:Obstacles.addImage(Cactus2);
break;
case 3:Obstacles.addImage(Cactus3);
break;
case 4:Obstacles.addImage(Cactus4);
break;
case 5:Obstacles.addImage(Cactus5);
break;
case 6:Obstacles.addImage(Cactus6);
break;
default:break;
  }
  Obstacles.scale=0.5;
Obstacles.lifetime=130
CactusGroup.add(Obstacles);
}

}
function reset(){
  gamestate=PLAY;
  score=0;
  gameOver.visible=false;
  restart.visible=false;
 CactusGroup.destroyEach();
 CloudGroup.destroyEach();
 Trex.changeAnimation("running",Trex_running);
}