var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var generations = 0
var objective = new Target(500, 150)

var targetRadius = 10
var maxPop = 200
var mutationRate = 0.03
var lifetime = 600
var population = new Population(maxPop, mutationRate, objective, lifetime)

class Obstacle {
    constructor(x, y, w, h){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }
}
var obstacles = []
obstacles.push(new Obstacle(250, 0, 20, 150))
obstacles.push(new Obstacle(450, 150, 20, 150))

function drawObstacles() {
    for(var i = 0; i < obstacles.length; i++){
        ctx.beginPath();
        ctx.rect(obstacles[i].x, obstacles[i].y, obstacles[i].w, obstacles[i].h);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}
function drawTarget() {
    ctx.beginPath();
    ctx.arc(objective.x, objective.y, targetRadius, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}
function updatePosition(counter){
    for(var j = 0; j < maxPop; j++){
        population.population[j].x += population.population[j].genes[counter][0]
        population.population[j].y += population.population[j].genes[counter][1]

        for(var i = 0; i < obstacles.length; i++){

            if(population.population[j].x > obstacles[i].x && population.population[j].x < (obstacles[i].x+obstacles[i].w)){
                if(population.population[j].y > obstacles[i].y && population.population[j].y < (obstacles[i].y + obstacles[i].h)){
                    population.population[j].genes.fill([0,0])
                    population.population[j].status = 1
                }
            }
        }
            

    }
}
var counter = 0
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawTarget()
    drawObstacles()
    document.getElementById('generations').innerHTML = generations
    document.getElementById('cycles').innerHTML = lifetime - counter
    for(var i = 0; i < maxPop; i++){
        ctx.beginPath();
        ctx.rect(population.population[i].x, population.population[i].y, 5, 5)
        ctx.fillStyle = "white"
        ctx.fill();
        ctx.closePath();
    }
    if(counter == lifetime){
        counter = 0
        population.calcFitness()
        population.generate()
        generations++
    }
    else {
        updatePosition(counter)
    }
    counter++
}

setInterval(draw, 10)


// All code below is instead implemented in draw() function 
// function principle(){
//     for(var i = 0; i < lifetime; i++){
//         for(var j = 0; j < maxPop; j++){
//             population.population[j].x += population.population[j].genes[i][0]
//             population.population[j].y += population.population[j].genes[i][1]
//         }
        
//     }
//     draw()
    
// }

// function main(){
//     document.getElementById('generations').innerHTML = generations
//     principle()
//     population.calcFitness()
//     population.generate()
//     generations ++
//     setTimeout(main, 50)
// }



