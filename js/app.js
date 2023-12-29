//Game Constants


let inputDir={x:0,y:0};
const foodSound= new Audio('./music/food.mp3');
const gamseOverSound=new Audio('./music/gameover.mp3');
const moveSound=new Audio('./music/move.mp3');
const musicSound=new Audio('./music/music.mp3');
let scoreBox=document.getElementById('scoreBox');
let hiScoreBox=document.getElementById('hiScoreBox');


let speed =10;
let score=0;
let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}
]
food ={x:8,y:10};

//Game function
function main(ctime){
    window.requestAnimationFrame(main);
    
    if((ctime-lastPaintTime)/1000<1/speed){
        return ;
    }
    lastPaintTime=ctime;
    gameEngine();

}

function isCollide(snakeArr){
    //if you bump into yourself

    for(let i=1;i<snakeArr.length;i++){
        if(snakeArr[i].x===snakeArr[0].x && snakeArr[i].y===snakeArr[0].y){
           return true; 
        }
        if(snakeArr[0].x>=18||snakeArr[0].x<=0 ||snakeArr[0].y>=18||snakeArr[0].y<=0){
            return true;
        }
    }
    return false;
}
function gameEngine(){
    //part 1 : Updating the snake array & Food
    musicSound.play();
    if(isCollide(snakeArr)){
         gamseOverSound.play();
         musicSound.pause();
         inputDir={x:0,y:0};
         alert("Game over !! Press any key to play again ");
         snakeArr=[{x:13,y:15}];
         musicSound.play();
         score=0;
    }
    //if snake have eaten food , increment the score and regerate the food
    if(snakeArr[0].y===food.y&& snakeArr[0].x===food.x){
        foodSound.play();
        score+=1;
        if(score>hiScore){
            hiScore=score; 
            localStorage.setItem("hiScore",JSON.stringify(hiScore));
            hiScoreBox.innerHTML="Highest Score: "+hiScore;
        }
        scoreBox.innerHTML="Score:  "+score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    //moving the snake
    for(let i=snakeArr.length-2;i>=0;i--){
        
        snakeArr[i+1]={...snakeArr[i]};
    }

    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    //part 2: Display the snake and food
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        // snakeElement.classList.add('snake');
        if(index===0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    });

    //Display the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement); 
}









//Main Logic here
let hiScore=localStorage.getItem("hiScore");
if(hiScore===null){
    hiScoreVal=0;
    localStorage.setItem("hiScore",JSON.stringify(hiScoreVal));
}
else{
    hiScoreVal=JSON.parse(hiScore);
    hiScoreBox.innerHTML="Highest Score: "+hiScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
inputDir={x:0,y:0}//start the game
moveSound.play();
switch(e.key){
    case "ArrowUp":
        console.log("ArrowUp");
        inputDir.x=0;
        inputDir.y=-1;
        break;
    case "ArrowDown":
        console.log("ArrowDown");
        inputDir.x=0;
        inputDir.y=1;
        break;
    case "ArrowLeft":
        console.log("ArrowLeft");
        inputDir.x=-1;
        inputDir.y=0;
        break;
    case "ArrowRight":
        console.log("ArrowRight");
        inputDir.x=1;
        inputDir.y=0;
        break;

    default:
        break;
    
}
});
