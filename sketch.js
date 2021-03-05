var mario;
var flag;
var platformGroup, obstacleGroup;
var marioAnimation, obstacleAnimation, wallAnimation, groundAnimation, flagAnimation;
var PLAY = 0, LOSE = 1, WIN = 2;
var GAMESTATE = PLAY;

function preload()
{
  marioAnimation=loadAnimation("images/Capture1.png","images/Capture4.png","images/Capture3.png");
  obstacleAnimation=loadAnimation("images/obstacle1.png");
  wallAnimation=loadAnimation("images/wall.png");
  groundAnimation=loadAnimation("images/ground.png");  
  flagAnimation=loadAnimation("images/Flag.png");
}

function setup() {
  //Creating canvas equal to width and height of display
  createCanvas(displayWidth,668);
  var countDistanceX = 0;
  var platform;
  var gap;
  
  //creating a player mario
  mario = new Player();
  
  //creating a group
  platformGroup = createGroup();
  obstacleGroup = createGroup(); 

  //adding platforms to stand for mario
  for (var i=0;i<26;i++)
	 {
     frameRate(30);
      platform = new Platform(countDistanceX);
      platformGroup.add(platform.spt);//Adding each new platform to platformGroup
      gap=random([0,0,0,0,200]);//givin randome value to gap
      countDistanceX = countDistanceX + platform.spt.width + gap; //counting x location of next platform to be build
   
      //adding wall to the game
      if(i%3===0)
      {
      wall=new Wall(countDistanceX);
      platformGroup.add(wall.spt);
      }

      //adding obstacles to the game
      if(i%4==0)
      {
      obstacle=new Obstacle(countDistanceX);
      obstacleGroup.add(obstacle.spt);
      }
  }
  flag = createSprite(countDistanceX,height-350);
  flag.addAnimation("flag", flagAnimation);
  flag.scale = 0.2;
  flag.debug = true;
  flag.setCollider("rectangle", 0, 0, 1200, 6000);
}

function draw() {
  background('skyblue');

  //code to move the camera
  translate(  -mario.spt.x + width/2 , 0);
  
  if (GAMESTATE === PLAY){
     //apply gravity to mario and set colliding with platforms
  mario.applyGravity();
  mario.spt.collide(platformGroup);

  //Calling various function to controll mario
  if (keyDown("left"))  
  { 
    mario.moveLeft();
  }
  if (keyDown("right")) 
  { 
    
    mario.moveRight();
  }
  if (keyDown("up") && mario.spt.velocityY===0) 
  { 
    mario.jump();
  }
  if (mario.spt.isTouching(obstacleGroup) || mario.spt.y>668){
    GAMESTATE = LOSE;
  }
  if (mario.spt.isTouching(flag)){
    GAMESTATE = WIN;
  }

  }

  if (GAMESTATE === LOSE){
    mario.spt.setVelocity(0,0);
    mario.spt.pause();
    obstacleGroup.destroyEach();
    fill("red");
    textSize(40);
    text("GAME OVER!", mario.spt.x, 300);
  }

  if (GAMESTATE === WIN){
    mario.spt.setVelocity(0,0);
    mario.spt.pause();
    obstacleGroup.destroyEach();
    fill("green");
    textSize(40);
    text("YOU WIN!", mario.spt.x, 300);
  }

 
  
   drawSprites();
}



