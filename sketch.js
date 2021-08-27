var gameState=0;
var canvas, backgroundImage;
var player;
var girl, girl_img,girl2_img,girl_left,girl_right;
var boy,boy_img,boy2_img,boy_left,boy_right;
var ghost1,ghost_img,ghost2,ghost2_img,ghostGroup;
var house,house_img;
var  wall1, wall2, wall3;
var home,home_img;
var Score=0;
var Lives=3;
var gender=0;
var restart,restart_img;
var gameOver,gameOver_img;

function preload(){
  girl_img=loadImage("girl.png");
  girl_right=loadImage("girl_right.jpeg");
  girl_left=loadImage("girl_left.jpeg");

  boy_img=loadImage("boy.png");
  boy_right=loadImage("boy_right.jpeg");
  boy_left=loadImage("boy_left.jpeg");

  ghost_img=loadImage("ghost1.png");
  ghost2_img=loadImage("ghost2.png");

  gameOver_img=loadImage("gameOver.png");
  restart_img=loadImage("restart.png");

  house_img=loadImage("house.png");

}

function setup(){
  createCanvas(1200,800);
    wall1=createSprite(500,200,1200,10);
    wall2=createSprite(700,350,1200,10);
    wall3=createSprite(500,500,1200,10);
    wall4=createSprite(700,650,1200,10);

    house=createSprite(1150,750,70,50);
    house.addImage(house_img);
    house.scale=0.2;

    wall1.visible=false;
    wall2.visible=false;
    wall3.visible=false;
    wall4.visible=false;

     restart=createSprite(550,400,50,50);
     restart.addImage(restart_img);
     gameOver=createSprite(650,500,50,50);
     gameOver.addImage(gameOver_img);

    restart.visible=false;
    gameOver.visible=false;

    girl=createSprite(400,350,50,10);
  girl.addImage(girl_img);
  girl.scale=0.8;

  boy=createSprite(700,350,50,10);
  boy.addImage(boy_img);
  boy.scale=0.2;

   

  createPlayer();
  player.visible=false;
  //createGirl();
  //createBoy();
    
   
    ghostGroup=createGroup();
    //player.visible=true;
    
}
function gameStarts(){
  console.log("gameStarts")
gameState=1;
player.x=50;
player.y=140;
//player.scale=0.5;
//girl.destroy();
//boy.destroy();
girl.visible=false;
boy.visible=false;
}

function draw(){

edges=createEdgeSprites();


  if(gameState===0){
    
    girl.visible=true;
    boy.visible=true;
    //createBoy();
    //createGirl();
    
    background(0);
    textSize(30);
    fill("white");
    text("PLEASE SELECT YOUR GENDER",300,100);

    text("RULES FOR THIS GAME:",100,490);
    fill("white");
    textSize(18);
    text("1)You Have to use the arrow keys for the direction",100,510);
    text("2)You have to be safe from the ghosts and reach your house",100,530);
    text("LET'S GO!",100,550);
    textSize(30);
    text("Click on your gender to start the game",300,600);
    console.log("gameState=0");

    
  
  }
  else if(gameState===1){
    background("orange");
    wall1.visible=true;
    wall2.visible=true;
    wall3.visible=true;
    wall4.visible=true;
    restart.visible=false;
    gameOver.visible=false;
  
    boy.visible=false;
    girl.visible=false;
    //createPlayer();
  //player.scale=0.5;
  //ghost1=createSprite()
  Spawnghosts();
  textSize(18);
  fill("white");
  text("SCORE:"+Score,20,30);
  
  textSize(18);
  fill("white");
  text("LIVES="+Lives,900,30) ;
    
  }
  if(mousePressedOver(girl)){
    player.visible=true;
      player.addImage(girl_right);
      player.scale=0.4;
      gameStarts();
      console.log("mousePressed")
     // boy.destroy();
      boy.visible=false;
      gender=1;
    
  }
    if(mousePressedOver(boy)){
      player.visible=true;
    player.addImage(boy_right);
    player.scale=0.2;
    gameStarts();
    //girl.destroy();
    girl.visible=false;
    gender=2;
    }
    if(keyDown("RIGHT_ARROW")){
      player.x=player.x+4;
      

    }
   if(keyDown("LEFT_ARROW")){
     player.x=player.x-4;
    
   }
   if(keyDown("UP_ARROW")){
     player.y=player.y-4;
   }
   if(player.x>1100){
    if(keyDown("DOWN_ARROW")){
     player.y=player.y+4;
    }
     if(gender===1){
       player.addImage(girl_left);
     }
     else 
     player.addImage(boy_left);
   
   }
   if(player.x<100 && player.y>250){
   if( keyDown("DOWN_ARROW")){
     player.y=player.y+4;
   }
     if(gender===1){
       player.addImage(girl_right);
     }
     else 
     player.addImage(boy_right);
   
   }
    
    if(player.isTouching(ghostGroup)){
      Lives--;
      player.destroy();
      createPlayer();
    }

    if(Lives===0){
      wall1.visible=false;
      wall2.visible=false;
      wall3.visible=false;
      wall4.visible=false;
      house.visible=false; 
      
      gameState=2;
    }

    if(gameState===2){
      background("black");
     
     // player.destroy();
     player.visible=false;
      ghostGroup.destroyEach();
      player.velocityX=0;
      restart.visible=true;
      gameOver.visible=true;
    }

    if(mousePressedOver(restart)){
  //console.log("restart");
  Restart();
}
  player.collide(edges[2]);
  player.collide(edges[3]);
//  console.log(player.x +"//"+ player.y);
    
  
  console.log(gameState);

  drawSprites();
}
function createGirl(){
  girl=createSprite(400,350,50,10);
  girl.addImage(girl_img);
  girl.scale=0.8;
}
function createBoy(){
  boy=createSprite(700,350,50,10);
  boy.addImage(boy_img);
  boy.scale=0.2;
}
function Spawnghosts(){
   if(frameCount%200===0){
    var ghosts=createSprite(random(50,700),random(150,700),20,random(20,40));
    ghosts.addImage(ghost_img);
    ghosts.velocityX=4;
    //ghosts.lifetime=150;
    ghosts.bounceOff(edges[1]);
    ghostGroup.add(ghosts);
    //console.log(edges[1]);
    
   }
   
}
function createPlayer(){
  player=createSprite(50,140,20,20);
  if(gender===1){
    player.addImage(girl_img);
      player.scale=0.4;
  }
 else if(gender===2){
    player.addImage(boy_img);
    player.scale=0.2;
  }
}

function createWalls(){
    
}
function Restart(){
  console.log("inrestart");
  restart.visible=false;
  gameOver.visible=false;
  gameState=0;
  //createPlayer();
  girl.visible=true;
  boy.visible=true;
  Lives=3;
  gender=0;
}