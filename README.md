# PathFinding
Program uses a genetic algorithm, with DNA encoded as vectors to find path to target

Each member of the population has DNA that is encoded as a series of vectors that tells the member where to move. After each generation, the best members are chosen to reproduce. Reproduction and crossover is done simply by combining the vector array of two members from the population, after which a mutation may be applied. The mutation randomizes some vectors in the array to create variation and ensure population doesn't remain stagnant. 

Obstacles can be added to increase the difficulty for members.
