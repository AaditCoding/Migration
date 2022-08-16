//all the variables which are needed
var bird, bird_image;
var bg, bg_image;
var fg,fg_image;
var pipe1,pipeNorth_image;
var pipe2,pipeSouth_image;
var pipe1Group, pipe2Group;
var score;

var gameState = "START"
var restart, r;
var wing_sound


function preload(){
bird_images=loadAnimation("bird1.png","bird2.png");
bg_image=loadImage("bg.png");
fg_image=loadImage("fg.png");
pipeNorth_image=loadImage("pipeNorth.png");
pipeSouth_image=loadImage("pipeSouth.png");
r=loadImage("unnamed.png");
wing_sound=loadSound("wing.mp3")
introBg=loadImage("4622688.png")

}

function setup() {
createCanvas(windowWidth,windowHeight);


//background
bg = createSprite(windowWidth,windowHeight);
bg.addImage(bg_image);

//foot ground
fg=createSprite(144,470,288,112);
fg.addImage(fg_image);

//bird
bird = createSprite(25,256,10,10)
bird.addAnimation("flapping",bird_images)
bird.addImage(bird_image);

//pipe group
pipe1Group = new Group();
pipe2Group = new Group();

//scoring
score = 0;

//restarting the game
restart = createSprite(144,256,10,10);
restart.addImage(r);
restart.visible=false;
restart.scale = 0.4;
}

function draw() {
  if(gameState=== "START"){
    if(keyDown("space")){
      gameState="PLAY"
    }
    background(introBg)
    textSize(50)
    text("Migration",width/2,height/2-300)
    textSize(30)
    text("Flappy Bird is migrating east for resources",width/2,height/2-100)
    text("But flappy bird will not get there easily",width/2,height/2-50)
    text("He has to travel day and night and through obstacles to get there.",width/2,height/2-0)
    text("Rules:",width/4,height/4)
    text("Press Space to move Flappy Bird Up",width/6,height/6+200)
    text("Let go of Space Bar to fly down",width/6,height/6+300)
    text("Try not to hit obstacles or you will lose",width/6,height/6+400)
    text("Press Space to Play",width/2,height/2+100)
    
    
  }
   if(gameState === "PLAY"){
  pipe_move();
  background(windowWidth,windowHeight);
  textSize(30);
textFont("Georgia");
text("Score:" + score,width/7,height/7);

  //bird movement
if (keyDown("space")){
  bird.y = bird.y - 20;
  wing_sound.play()
  }
  else{
  bird.velocityY = 5;
  }
 
  //foot ground movement
fg.velocityX = -1;

//repositioning foot ground
if(fg.x < 137){
  fg.x = fg.width/2;
  }

  //game end
  if (bird.isTouching(pipe1Group) || bird.isTouching(pipe2Group)){
    gameState = "END";
  }
  if(bird.isTouching(fg)){
    gameState = "END";
  }
  
if(frameCount % 75 === 0){
score++;
}
textSize(30);
textFont("Georgia");
text("Score:" + score,175,500);
drawSprites();
}
else if(gameState === "END")  {
fg.velocityX = 0;
bird.visible = false;
bird.x=25;
bird.y=256;
pipe1Group.setVelocityXEach(0);
pipe2Group.setVelocityXEach(0);
pipe1Group.setLifetimeEach(-1);
pipe2Group.setLifetimeEach(-1);
restart.visible=true;
if(mousePressedOver(restart)){
  reset();
}
drawSprites();
}
  





}

function pipe_move(){
if (frameCount % 75 === 0 ){
  pipe1 = createSprite(144,0,10,100);
  pipe1.addImage(pipeNorth_image);
  pipe1.y = random(0,50);
  pipe1.velocityX = -2;
  pipe1Group.add(pipe1);
  pipe1Group.setLifetimeEach(144);
 
  pipe2 = createSprite(144,512,10,100);
  pipe2.addImage(pipeSouth_image);
  pipe2.y = random(462,512);
  pipe2.velocityX = -2;
  pipe2Group.add(pipe2);
  pipe2Group.setLifetimeEach(144);

}

}

function reset(){
  gameState = PLAY;
  pipe1Group.destroyEach();
  pipe2Group.destroyEach();
  score = 0;
  bird.visible=true;
  restart.visible=false
}

