// Author: Mitwa Patel, 000905034
// Date: 1st August, 2023
// This JavaScript file represents a "Cross The Road" game that allows player to cross the road while avoiding the cars.
// This file includes functions that handles random car generation, car movement (animation), player and car collision,
// game level increment. 
// It also allows user to start game and change the game theme. 

let level=1;
let gameOver = true;
let carSpeed = 100;

/**
 * Function Generate Random number between 0 and UpperBound Number inclusive
 * @param {UpperBound Number} n 
 * @returns random number between 0 and n inclusive
 */
function getRandomNumber(n) {
    return Math.ceil(Math.random()*n);
}


/**
 * create car object
 * @returns CarImage object
 */
function createHurdleCar(){
    let carImage = document.createElementNS("http://www.w3.org/2000/svg", "image");
    carImage.setAttribute("href", "images/car1.png");
    carImage.setAttribute("class", "carImage");
    carImage.setAttribute("x", "700");
    carImage.setAttribute("y", 50*getRandomNumber(6));
    let parent = document.querySelector(".road");
    parent.appendChild(carImage);
    return carImage;
}

/**
 * player move while pressing any key
 */
function movePlayer(){
    document.addEventListener('keypress', function(event){
            if(gameOver == false){
                let player=document.querySelector(".player");
                let yPosition=parseInt(player.getAttribute("y"));
                player.setAttribute("y", yPosition+50); 
                if(parseInt(player.getAttribute("y")) === 400){
                    player.setAttribute("y", "0");
                    levelUp();   
                };
            }
    })    
}


/**
 * Generate car at random position and animate car
 */
function generateRandomCar(){
    let carGenerateTime = setInterval(()=>{
        let car = createHurdleCar();
        let carMoveTime=setInterval(()=>{
            crash(car);
            if(gameOver == false){
                let xPosition=parseInt(car.getAttribute("x"))
                car.setAttribute("x", xPosition-10);
            }
            else{
                clearInterval(carGenerateTime);
                clearInterval(carMoveTime);
            }       
        }, carSpeed)
    }, 1000);
}

/**
 * check player and car object is crashed or not
 * @param {car object} car 
 */
function crash(car){
   let player=document.querySelector(".player");
   let playerX=player.getAttribute("x");
   let playerY=player.getAttribute("y");
   let carX=car.getAttribute("x");
   let carY=car.getAttribute("y");
   if(Math.abs(carX-playerX)<50 && Math.abs(carY-playerY)<10){
        level==0;
        gameOver = true;
        createGameOverText();
   }
}

/**
 * Level Up and increase difficulty
 */
function levelUp(){
   let score=document.querySelector(".score");
   level++;
   carSpeed-=20;
   score.textContent="LEVEL: "+level;
}


/**
 * remove all car elements from the screen
 */
function removeCars(){
    let allCars = document.querySelectorAll(".carImage");
    
    for(let i=0; i<allCars.length; i++){
        allCars[i].remove();
    }
}


/**
 * start Game while press start button
 */
function start(){
    let startButton=document.querySelector(".start");

    startButton.addEventListener("click", ()=>{
        gameOver = false;
        carSpeed=100;
        removeCars();
        let gameOverElement = document.querySelector(".gameOver");
        
        if(gameOverElement != null){
            console.log(gameOverElement);
            gameOverElement.remove();
        }
        generateRandomCar();
        document.querySelector(".player").setAttribute("y", "0");
    })
}


/**
 * create Gameover Element
 */
function createGameOverText(){
    let parent = document.querySelector(".road");
    let gameOverText = document.createElementNS("http://www.w3.org/2000/svg", 'text');
    gameOverText.setAttribute("x", "250");
    gameOverText.setAttribute("y", "200");
    gameOverText.setAttribute("class", "gameOver");
    gameOverText.setAttribute("fill", "white");
    gameOverText.textContent = "Game Over";
    parent.appendChild(gameOverText);
}


/**
 * Day Time theme activates while pressing Day button
 */
function dayTheme(){
    let dayButton=document.querySelector(".dayTheme");
    dayButton.addEventListener("click", ()=>{
        let sun = document.querySelector(".circle");
        sun.setAttribute("fill", "yellow");
        sun.setAttribute("cx", "100");
        document.querySelector("#sky").setAttribute("fill", "lightblue");
        
    } )
}


/**
 * Night Time theme activates while pressing Night button
 */
function nightTheme(){
    let nightButton=document.querySelector(".nightTheme");
    nightButton.addEventListener("click", ()=>{
        let moon = document.querySelector(".circle");
        moon.setAttribute("fill", "white");
        moon.setAttribute("cx", "550");
        document.querySelector("#sky").setAttribute("fill", "black");
    })
}


/**
 * execute when page is fully loaded
 */
window.addEventListener("load", function(event){   
    start();
    movePlayer();
    dayTheme();
    nightTheme();
})