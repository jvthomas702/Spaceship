//define variables
var spaceship,spaceship1_image,spaceship2_image;
var bubble,bubble_image;
var gamestate;
var health ;
var spawnEdge;
var bubbles;
var shot,shots;
var shotData,score;

function movement(){
    // move spaceship
    if(keyDown("up")){
    spaceship.addSpeed(0.2,spaceship.rotation -90);
    spaceship.setFrame(1);
    }
    else   if(keyDown("down")){
        spaceship.addSpeed(0.15,spaceship.rotation +90);
        spaceship.setFrame(0);
}
else{spaceship.setFrame(0)}

//rotate the spaceship
if(keyDown("left")){
    spaceship.rotation -=7.5;

}

else if(keyDown("right")){
    spaceship.rotation +=7.5;
}

//reduce the speed of the spaceship naturaly 
spaceship.setspeed(spaceship.getSpeed() * 0.985)

//Make the spaceship go off the edge 
//teleports you on the other side 
if(spaceship.y>450){
    spaceship.y=-30; 
}
else if(spaceship.x<-50){
    spaceship.y=x30
}

if(spaceship.x>450){
    spaceship.x=-30; 
}
else if(spaceship.x<-50){
    spaceship.x=430
}


}

function reset(){
    gamestate="waiting";
    health=100;
    score=0;
    shotData=[false,0];
    spaceship.x=200;
    spaceship.y=200;
    spaceship.rotation=0;
    spaceship.setSpeed(0,spaceship.rotation);
}

function displayText (){
    if(health>=70){
        fill(3,252,57)

    } else if(health=>50){
        fill(235,252,3)
    }
    else if(health=>20){
        fill(252,111,3)
}
else{
    fill(255,0,0)
}

textSize(20);
if(gamestate==="playing"){
    if(health===100){
        text(health,spaceship.x-17,spaceship.y+40);
    }else{
        text(health,spaceship.x-10.5,spaceship.y+40);
    }

fill ("white");
text("score:" + score,5,20)

}

//display how to play 
if (gamestate==="waiting"){
    fill("white");
    textSize(15);
    text("        How to play:\n Use the arrow keys to move\n        dodge the astroids\n     USe space to shoot\n      hit P the start the game",115,280)
}

if (gamestate==="over"){
    fill("black")
    textSize(30);

text("Game Over!",120,200)

textSize(20)
text("final Score:" + score + "\n Hit R to Restart",130,230)

}

}

function switchGamestates(){
    //start the game


    if (keyDown("P") && gamestate==="waiting" ){
        gamestate="playing"
    } 
    if (keyDown("R") && gamestate==="over" ){
reset();
    }
}

function generateObstacles(){
    //set every amount of frames generate a new chunk of space
    if(frameCount % 20 === 0){
        spawnEdge = Math.round(random(1,4));
        //1=top,2=right,3=bottom,4=left
        if(spawnEdge === 1){
            bubble=createSprite(random(1,400),0,10,10);
            bubble.addImage("bubble",bubble_image);
            bubble.velocityX = random(-5,5);
            bubble.velocityY = random(2,7);
            bubble.scale=0.5;
            bubble.lifetime=450/bubble.velocityY;
            bubble.setCollider("circle",0,0,45);
            bubbles.add(bubble);
        }else if (spawnEdge === 2){
            bubble=createSprite(400,random(1,400),10,10);
            bubble.addImage("bubble",bubble_image);
            bubble.velocityX = random(-2,-7);
            bubble.velocityY = random(-5,5);
            bubble.scale=0.5;
            bubble.lifetime=450/bubble.velocityY;
            bubble.setCollider("circle",0,0,45);
            bubbles.add(bubble);
        }else if(spawnEdge===3){
            bubble=createSprite(random(1,400),400,10,10);
            bubble.addImage("bubble",bubble_image);
            bubble.velocityX = random(-5,5);
            bubble.velocityY = random(-2,-7);
            bubble.scale=0.5;
            bubble.lifetime=450/bubble.velocityY;
            bubble.setCollider("circle",0,0,45);
            bubbles.add(bubble);
        }else{
            bubble=createSprite(400,random(1,400),10,10);
            bubble.addImage("bubble",bubble_image);
            bubble.velocityX = random(2,7);
            bubble.velocityY = random(-5,5);
            bubble.scale=0.5;
            bubble.lifetime=450/bubble.velocityX;
            bubble.setCollider("circle",0,0,45);
            bubbles.add(bubble);
        }
    }
}

function collision(){

    if(bubbles.isTouching(spaceship)){
        //spaceship takes damage while touching the bubble
        health-=1;
    }

    //have bullets destroy bubbles
    for(var x=0;x<shots.length;x++){
        for(var y=0;y<bubbles.length;y++){
            console.log(shots.length);
            if(shots.get(x).collide(bubbles.get(y))){
                bubbles.get(y).destroy();
                shots.get(x).destroy();
                score+=100;
            }
        }
    }
}

function shooting(){
    if (keyDown("space") && shotData[0]===false){
        shot=createSprite(spaceship.x,spaceship.y,5,12);
        shot.shapeColor="white";
        shot.rotation=spaceship.rotation;
        shot.addSpeed(6,spaceship.rotation-90);
        shot.depth=0;
        shot.lifetime=450/6;
        shots.add(shot);
        shotData[0]=true;
    }
if(shotData[0]===true && shotData[1]<20){
    shotData[1]++;
} else{
    shotData[1]=0;
    shotData[0]=false;
}
}

function deathCheck(){
    if(health<=0){
        health=0;
        gamestate="over";
    }
}
function preload(){
 bubble_image=loadImage("images/bubble.png")   
 spaceship1_image=loadImage("images/spaceship1.png")
 spaceship2_image=loadImage("images/spaceship2.png")


}

function setup(){
    //create canvas 
    createCanvas(400,400);
    
    //set Variables
    gamestate="waiting";
    health=100;
    bubbles=new Group();
    shots=new Group();
    score=0;

    // Item 1 is if a shot was fired or not. Item 2 is tracking the delay before being able to shoot again 
    shotData=[false,0]; 
    
    //create sprites 
    spaceship=createSprite(200,200,20,20);
    spaceship.addAnimation("spaceship",spaceship1_image,spaceship2_image);
spaceship.pause();
spaceship.scale=0.5;
spaceship.setCollider("rectangle",0,0,80,70);

shot=createSprite(1000,1000,50,50);
shots.add(shot);
}

function draw(){
    //set background
background("grey")
// draw sprites
drawSprites();

//things that happen during gameplay
if(gamestate==="playing"){
    // movement 
    movement();
    
    // to generate Obstacles 
    generateObstacles();

    //spaceship collision with objects 
    collision();

    //shooting

    shooting();

    //deathcheck

    deathCheck();
}

//display Text 
displayText();

switchGamestates();

}