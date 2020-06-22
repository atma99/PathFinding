class Population {
    constructor(maxPop, mutationRate, target, lifetime){
        this.target = target
        this.maxPop = maxPop
        this.lifetime = lifetime
        this.mutationRate = mutationRate
        this.population = []
        for(var i = 0; i < this.maxPop; i++){
            this.population.push(new DNA(this.lifetime, 10, 150))
        }
    }
    calcFitness(){
        for(var i = 0; i < this.maxPop; i++){
            this.population[i].fitnessDNA(this.target)
        }
    }
    generate(){
        var totalScore = 0
        for(var i = 0; i < this.maxPop; i++){
            totalScore += this.population[i].fitness
        }
        var newPop = []
        for(var i = 0; i < this.maxPop; i++){
            var partnerA = this.pickOne(totalScore)
            var partnerB = this.pickOne(totalScore)
            var child = partnerA.crossover(partnerB)
            child.mutate(this.mutationRate)
            newPop.push(child)
        }
        this.population = newPop
    }
    pickOne(totalScore){
        var r = Math.random()*totalScore
        var index = 0
        while(r > 0){
            r = r - this.population[index].fitness
            index += 1
        }
        index -= 1
        return this.population[index]
    }
   
}
class Target{
    constructor(x, y){
        this.x = x
        this.y = y
    }
}
class DNA {
    constructor(num, x , y){
        this.x = x
        this.y = y
        this.genes = []
        this.fitness = 0
        this.status = 0

        for(var i = 0; i < num; i++){
            this.genes.push(this.newVector())
        }
    }
    createVec(){
        var x;
        var r = Math.random()
        if(r < 0.333){
            x = 0
        }
        else if(r < 0.666){
            x = -1*Math.random()*10
        }
        else{
            x = Math.random()*10
        }
        return x
    }
    newVector(){
        var vec = []
        vec.push(this.createVec())
        vec.push(this.createVec())
        return vec
    }
    fitnessDNA(target){
        var score = 0
        var xdist = Math.pow(this.x - target.x, 2)
        var ydist = Math.pow(this.y - target.y, 2)
        if(this.status == 1){
            this.fitness = 0
        }
        if(xdist + ydist == 0){
            this.fitness = 1000000
        }
        else{
            var score = 1/Math.pow(xdist+ydist,0.5)
            this.fitness = Math.pow(score*1000, 2)
        }  
    }
    crossover(object){
        var child = new DNA(this.genes.length, 10, 150)
        var midpoint = Math.floor(Math.random()*this.genes.length)

        for(var i = 0; i < this.genes.length; i++){
            if(i < midpoint){
                child.genes[i] = this.genes[i]
            }
            else{
                child.genes[i] = object.genes[i]
            }
        }
        return child
    }
    mutate(rate){
        for(var i = 0; i < this.genes.length; i++){
            if(Math.random() < rate){
                this.genes[i] = this.newVector()
            }
        }
    }
}