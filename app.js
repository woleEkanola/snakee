const canvas = document.getElementById('canv')
let wiw = window.innerWidth
canvas.width = wiw > 750 ? 600 : 320
canvas.height = 520
const gameSpeed = 500

function reset(){
   snake= []
 snake[0]= {x:0, y:0}
 snake[1]= {x:1, y:0}
 snake[2]= {x:2, y:0}
 


 score = 0

 scores= []
}

let snake= []
 snake[0]= {x:0, y:0}
 snake[1]= {x:1, y:0}
 snake[2]= {x:2, y:0}
 
const pixel = 40

let score = 0
let highScore = 0
let scores= [0, 1,2]
let highScoreInfo = ''
function putScore(){
    score += 10

   
    document.querySelector('.score').innerHTML = score
}

function highScores(){
   let x = scores.reduce(function(a, b){
        return Math.max(a, b)
   }, 0)
if(score > x){
    highScore = score
highScoreInfo = 'Hurray!!! You have pushed your Limit you have a new High Score'
    
}
document.querySelector('.highScore').innerHTML= highScore

}

const xPixels = canvas.width/ pixel
const yPixels = canvas.height/pixel
const randomNumber= function(x){
    
    return Math.floor(Math.random() * x)
}
const target = function(){
   
    return{
    x: randomNumber(xPixels-2),
    y: randomNumber(yPixels-2)
}}
let targetLoc = {}

let game
let axis = 'x'
let a =0  // horizontal start point
let b=0
let d = 1  // horizontal direction
let f = 1

let start =  document.getElementById('start')

let stop =  document.getElementById('stop')

c= canvas.getContext('2d')

function drawTarget(){
    c.fillStyle = 'purple'
 
    c.fillRect(pixel*targetLoc.x, pixel*targetLoc.y, pixel, pixel)
}

function drawLine(startX, startY, toX, toY,){
c.beginPath()
c.moveTo(startX, startY)
c.lineTo(toX, toY)
c.strokeStyle = 'rgba(0,0,0,0)'
c.stroke()

c.closePath()
}

function setUpStage(){
    let x = pixel 
    let y = pixel
    for(let i = 0; i<= yPixels; i++){

    
        drawLine(x, 0, x, canvas.height )
x += pixel
    }

    for(let i = 0; i<= xPixels; i++){

      
        drawLine(0, y, canvas.width, y )
y += pixel
    }

}


function drawBox(  color){

let cc= snake.length

c.strokeStyle = '#ccc'
for(let i =0; i< cc; i++){
c.fillStyle = color
if (i==cc-1){
    c.fillStyle = 'green';
}
c.fillRect(pixel*snake[i].x, pixel*snake[i].y, pixel, pixel)
c.stroke()
}





}
setUpStage()

function moveBoxX(x, y){
   
    c.clearRect(0, 0, canvas.width, canvas.height)
setUpStage()
if(axis == 'x'){


    drawBox(a, b, 'green')
a = a + 1*x
if(a<0){
    a = xPixels + 1
}else if(a> xPixels + 1 ){
    a=0
}
}else if(axis == 'y'){
     drawBox(a, b, 'green')
b = b + 1*y
if(b<0){
    b = yPixels -2
}else if(b> yPixels -2){
    b=0
}
}
    
}



function moveSnake(){
       c.clearRect(0, 0, canvas.width, canvas.height)
      
       snake.shift()
       let x= snake.length -1
    let oldHead = snake[x]
 
  if(axis == 'x'){
 X = oldHead.x + 1 * d 
  Y = oldHead.y 
  }else{
        X = oldHead.x 
 Y = oldHead.y + 1 * f
  }

  if(X > xPixels -1){
      X = 0
  }else if(X < 0){
      X = xPixels  -1
  }
      if(Y > yPixels -1){
      Y = 0
  }else if(Y < 0){
      Y = yPixels  -1
  }
 
    let newHead = {
        x: X ,
        y: Y
    }
   
    snake.push(newHead)
   
setUpStage()
drawBox('red')
}

function checkFood(){
      let x= snake.length -1
    for(let i = 0; i<x; i++){

        if (targetLoc.x == snake[i].x && targetLoc.y == snake[i].y ){
 putScore()
    targetLoc = target()
    let newTail = {
        x: snake[x].x-1,
        y: snake[x].y
    }
    snake.unshift(newTail)
    console.log(snake)
}



    }

}


function endChecker(){
      let x= snake.length -1
    for(let i = 0; i<=x; i++){



let zz = snake.filter(function(z){
    return( z.x == snake[0].x && z.y == snake[0].y)
})
if(zz.length >1){
    clearInterval(game)
    highScores()
    document.querySelector('.info').style.display= 'block'
    document.querySelector('.info').innerHTML = `<h3>Game Over</h3> <p> Your Score is ${score}</p> <p>${highScoreInfo}</p>`
     
    stop.style.display = 'none'
    start.style.display = 'inline-block'
     scores.push(score)
  
   reset()
}


    }

}


// monitor user input
function left(){
    
     axis = 'x'
              d = -1
}
function right(){
 axis = 'x'
                d = 1
}
function up(){
      axis = 'y'
              f = -1
}
function down(){
     axis = 'y'
              f = 1
}
            function test(d){
let o = `${d}()`
        if(d=='left' && axis == 'y' || d=='right'&& axis == 'y' || d == 'up' && axis == 'x' || d == 'down' && axis == 'x'){
   eval(o)
        }
     
            }
            let directions= ['left', 'right', 'up', 'down']
            var getButton = function(x){
x.map(dd =>{

    document.getElementById(dd).addEventListener('click', function(e){
        
test(dd)
    })
})
            }


  document.addEventListener('keydown', function(e){
      
     
          if(e.keyCode == 37 && axis=='y'){
              e.preventDefault()                                            
             left()
             
          }else if(e.keyCode == 39 && axis=='y'){
              e.preventDefault()                                            
              right()
          }else if(e.keyCode == 38 && axis=='x'){
              e.preventDefault()                                            
            
up()
          }else if(e.keyCode == 40 && axis=='x'){
              e.preventDefault()                                            
             down()
          }
           
    })
      
        document.addEventListener('keydown', function(e){
          if(e.keyCode == 97 ||e.keyCode ==100 || e.keyCode == 119 || e.keyCode == 120 ){
              gameSpeed = 200
          }
        })

// start Game
    start.addEventListener('click', function(){
           reset()
           targetLoc = target()
           document.querySelector('.info').style.display= 'none'
           getButton(directions)
     game = setInterval(function(){
      
         drawBox('red')
 moveSnake()
 endChecker()
  drawTarget()
  checkFood()
 
}, gameSpeed)
start.style.display = 'none'
stop.style.display = 'inline-block'
    })


// stop Game
stop.addEventListener('click', function(){

    clearInterval(game)
    c.clearRect(0, 0, canvas.width, canvas.height)
    setUpStage()
    highScores()
    document.querySelector('.info').style.display= 'block'
    document.querySelector('.info').innerHTML = `<h3>Game Over</h3> <p> Your Score is ${score}</p> <p>${highScoreInfo}</p>`
    
   reset()
    stop.style.display = 'none'
    start.style.display = 'inline-block'
 })

