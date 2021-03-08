//Namespacing
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Body=Matter.Body;
const Constraint = Matter.Constraint;

//Variables
var particles=[];
var plinkos1=[];
var plinkos2=[];
var plinkos3=[];
var plinkos4=[];
var divisions=[];
var score = 0;
var particle;
var particles;
var turn = 0;
var count=0;
var divisionHeight=300;
var gameState = "START";

var upground,leftground,rightground;
var bottomdivision;

function setup() {
  //To create canvas
  createCanvas(800,800);

  engine = Engine.create();
  world = engine.world;

  //Creating bottom division using ground class
  bottomdivision=new Ground(400,795,width,10);

  if(frameCount%60===0){
    particles.push(new Particle(random(width/2-10,width/2+10)))
  }

   //Creating multiple divisions using for loop
   for(var d=0; d<=width; d=d+80)
   {
     divisions.push(new Divisions(d,height-divisionHeight/2,10,divisionHeight));
   }

   
  //Creating first line of multiple plinkos
  for(var a=40; a<=width; a=a+50)
  {
    plinkos1.push(new Plinko(a,75))
  }

  //Creating second line of multiple plinkos
  for(var b=15; b<width-10; b=b+50)
  {
    plinkos2.push(new Plinko(b,175));
  }

  //Creating third line of multiple plinkos
  for(var c=40; c<width; c=c+50)
  {
    plinkos3.push(new Plinko(c,275));
  }

  //Creating fourth line of multiple plinkos
  for(var d=15; d<width-10; d=d+50)
  {
    plinkos4.push(new Plinko(d,375));
  }

 upground=new Ground(width/2,2.5,width,5);
  leftground=new Ground(1,height/2,5,height);

 
}

function draw() {
  //black background
  background(0);  

  Engine.update(engine);

  //displaying ground
  bottomdivision.display();

 

  //Displaying divisions
  for(var z=0; z<=divisions.length-1; z=z+1)
  {
    divisions[z].display();
  }


  //Displaying plinkos
  for(var e=0; e<=plinkos1.length-1; e=e+1)
  {
    plinkos1[e].display();
  }

  for(var e=0; e<=plinkos1.length-1; e=e+1)
  {
    plinkos2[e].display();
  }

  for(var e=0; e<=plinkos1.length-1; e=e+1)
  {
    plinkos3[e].display();
  }

  for(var e=0; e<=plinkos1.length-1; e=e+1)
  {
    plinkos4[e].display();
  }

  //Displaying particles after every 60 frames
  if(frameCount%60===0)
  {
    particles.push(new Particle(random(width/2-10,width/2+10),10,10));
  }
  
  //Displaying particles
  for(var f=0; f<=particles.length-1; f=f+1)
  {
    particles[f].display();
  }

  
  if(particle != null)
  {
     particle.display();

     if(particle.body.position.y> 700)
     {
        if(particle.body.position.x < 300)
        {
            score=score+500;
            particle=null;
            if(count>= 5) gameState ="END";
        }

        else if(particle.body.position.x < 600 && particle.body.position.x > 301)
        {
          score=score+100;
          particle=null;
          if(count>= 5) gameState ="END";   
        }

        else if(particle.body.position.x < 900 && particle.body.position.x > 601)
        {
          score=score+200;
          particle=null;
          if(count>= 5) gameState ="END";   
        }
     }
  }
  textSize(20)
  text("Score : "+score,20,30);

  if(gameState == "END"){
    background("black");
    fill("red");
    textSize(100);
    text("Game Over",200,400);
  }

 

  textSize(30);
  text("500",20,530);
  text("500",100,530);
  text("500",180,530);
  text("500",260,530);
  text("100",330,530);
  text("100",410,530);
  text("100",490,530);
  text("200",570,530);
  text("200",650,530);
  text("200",730,530);

 
  upground.display();
  leftground.display

}

function mousePressed(){
  if(gameState !== "END"){
    count++;
         particle=new Particle(mouseX,50,10,10);
  }
}