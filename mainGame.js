// setup the canvas
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")
const width = canvas.width = window.innerWidth
const height = canvas.height = window.innerHeight

// Shapes Class
class Shapes {
    constructor(x,y,velX,velY){
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
    }
}
// random number generator with min and max limit
function random(min,max) {
    const ran =  Math.floor(Math.random()*(max-min+1))+min
    return ran
}

// Balls inheriting from shapes
class Balls extends Shapes {
    constructor(x,y,velX,velY,size,color,exists){
        super(x,y,velX,velY)
        this.size = size
        this.color = color
        this.exists = exists
    }
}

Balls.prototype.draw = function () {
    
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    
}

Balls.prototype.update = function() {
    if((this.x-this.size <= 0)||(this.x+this.size>= width)){
        this.velX = -(this.velX)
    }
    if((this.y-this.size <= 0)||(this.y+this.size >= height)){
        this.velY = -(this.velY)
    }
    this.x += this.velX
    this.y += this.velY
}
Balls.prototype.collision = function() {
    for(j=0;j<Balls.length;++j){
        if(balls[j].exists && !(this === balls[j])) {
            const dx = this.x-balls[j].x
            const dy = this.y - balls[j].y
            const distance = Math.sqrt(dx*dx+dy*dy)
            if(distance <= this.size+balls[j].size){
                this.color = balls[j].color = 'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')'
            }
        }
    }
}
class Evil extends Shapes {
    constructor(x,y){
        super(x,y,5,5)
    }
}
Evil.prototype.draw = function() {
    ctx.beginPath()
    ctx.lineWidth = 4
    ctx.strokeStyle = "white"
    ctx.arc(this.x,this.y,20,0,2*Math.PI)
    ctx.stroke()
}
Evil.prototype.move = function() {
    let temp = this
   
   window.addEventListener("keydown", function(e) {
    if (e.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }
       switch(e.key) {
           case "ArrowDown": case "Down":
                if (temp.y+20 < height) {
                    temp.y += temp.velY
                    }
                break
            case "ArrowUp": case "Up":
                if(temp.y-20 > 0) {
                    temp.y -= temp.velY
                }
                break
            case "ArrowLeft": case "Left":
                if(temp.x-20 > 0) {
                    temp.x -= temp.velX
                }
                break
            case "ArrowRight": case "Right":
                if(temp.x+20 < width) {
                    temp.x += temp.velX
                }
                break
            default:
                return;
       }
       e.preventDefault();
  
   })
}


let userBall = new Evil(100,200)
let balls = []
for(i=0;i<30;++i)
{   
    const color = 'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')'
    let newBall = new Balls(random(0,width),random(0,height),random(-10,10),random(-10,10),random(10,30),color,true)
    balls.push(newBall)
}
function eatUp() {
    for(k=0;k<balls.length;++k) {
      if(balls[k].exists){
          let dx = balls[k].x - userBall.x
          let dy = balls[k].y - userBall.y
          let distance = Math.sqrt(dx*dx + dy*dy)
          if(distance < balls[k].size+20) {
              console.log("DNE")
              balls[k].exists = false
          } 
      }
   }
  }
function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0,1)';
    ctx.fillRect(0, 0, width, height);
  
    for (let i = 0; i < balls.length; i++) {
      if(balls[i].exists) {
        balls[i].draw();
        balls[i].update();
        balls[i].collision();
      }
    }
    userBall.draw()
    userBall.move()
    eatUp()
  
    requestAnimationFrame(loop);
  }
  loop();

    
