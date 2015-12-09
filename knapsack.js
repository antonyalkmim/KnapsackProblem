/**
 * Created by antonyalkmim on 28/11/15.
 */

var Knapsack = {};

Knapsack.items = []; //Itens da instancia

/**
 * Solutions
 * var solutions = [{
 *      fitness: 0,
 *      chromossome: [0,0,0,0,0]
 * }]
 * @type {Array}
 */
Knapsack.solutions = []; //Solucoes para o problema

Knapsack.maxGenerations = 40; //Condicao de parada, quantidade de geracoes
Knapsack.maxWeigth = 0; //Peso maximo que a mochila suporta
Knapsack.maxSolutions = 0; //Quantidade maxima da populacao: GERADO DINAMICAMENTE
Knapsack.penaltyCoefficient = 0; //Coeficiene de penalidade: GERADO DINAMICAMENTE baseado nos itens
Knapsack.mutationRate = 0.1; //Taxa de mutacao (0 <= mutationRate <= 1)


Knapsack.crossover = function(solutionsToCross){
    //cruzar os cromossomos pela metade
    var aux = parseInt(this.items.length/2);
    var son = [
        solutionsToCross[0].chromossome.slice(0, aux).concat(solutionsToCross[1].chromossome.slice(aux, this.items.length)),
        solutionsToCross[1].chromossome.slice(0, aux).concat(solutionsToCross[0].chromossome.slice(aux, this.items.length))
    ];

    return son;
};

Knapsack.mutate = function(sons){
    if(Math.random() < this.mutationRate) {
        var geneToMutation = Math.floor((Math.random() * this.items.length - 1) + 1);
        for (var i = 0; i < sons.length; i++) {
            sons[i][geneToMutation] = sons[i][geneToMutation] == 1 ? 0 : 1;
        }
        return sons;
    }
};

Knapsack.calculateFitness = function(solution){
    var fitness = 0;
    var weigth = 0;
    for(var i = 0; i < this.items.length; i++){
        fitness += (solution[i] * this.items[i].value);
        weigth += (solution[i] * this.items[i].weigth);
    }

    fitness = fitness - this.penaltyCoefficient * Math.max(0, weigth - this.maxWeigth);

    return fitness;
};

Knapsack.randNewSolution = function(){
    var chromossome = [];

    for(var i = 0; i < this.items.length; i++){
        chromossome[i] = (Math.random() >= 0.5) ? 1 : 0;
    }

    return {
        fitness     : Knapsack.calculateFitness(chromossome),
        chromossome : chromossome
    };
};

/**
 * Inicia populacao com todos os integrantes diferentes entre si
 */
Knapsack.initPopulation = function(){
    for(var i = 0; i < this.maxSolutions; i++) {
        this.solutions[i] = this.randNewSolution();
    }
};

Knapsack.getSolutionsToCross = function(){

    var solutionsToCross = [];

    for(var i=0; i<2; i++){
        //seleciona duas solutions aleatoriamente
        var a = Math.floor((Math.random() * this.solutions.length-1)+1);
        var b = Math.floor((Math.random() * this.solutions.length-1)+1);
        //b = (a==b ? b+1 : b)%3;

        //verifica qual a melhor entre as duas
        //console.log("Solutions:", this.solutions.length);
        //console.log("a:", a);
        //console.log("B:", b);
        //TODO: as vezes todas os individuos ficam invalidos e a populacao fica vazia
        var key = this.solutions[a].fitness > this.solutions[b].fitness ? a : b;

        solutionsToCross.push(this.solutions[key]);
    }

    return solutionsToCross;
};

Knapsack.getValidSolutions = function(){
    var solutions = new Array();
    solutions.concat(this.solutions);


    //remover valores invalidos que possuem fitness negativos
    for(var i=0; i<this.solutions.length; i++){
        if(this.solutions[i].fitness < 0){
            this.solutions.splice(i, 1);
            i--;
        }
    }

    //verifica se nao houver nenhum individuo valido, insere os invalidos
    if(this.solutions.length == 0){
        solutions.sort(function(a,b){
            return b.fitness - a.fitness;
        });
        return solutions.slice(0, this.maxSolutions);
    }

    return this.solutions.slice(0, this.maxSolutions);
};

Knapsack.generateFitness = function(){
    for(var i=0; i<this.solutions.length; i++){
        this.solutions[i].fitness = Knapsack.calculateFitness(this.solutions[i].chromossome);
    }
};

Knapsack.generatePenaltyCoefficient = function(){
    var cof = 0;
    for(var i=0; i < this.items.length; i++){
        cof += this.items[i].value;
    }
    this.penaltyCoefficient = cof;
};

Knapsack.getBestSolution = function(){
    //ordernar decrescente
    this.solutions.sort(function(a,b){
        return b.fitness - a.fitness;
    });
    //retorna a melhor solucao
    return this.solutions[0];
};

Knapsack.getChosenItems = function(solution){
    var it = [];
    var chromossome = solution.chromossome;

    for(var i=0; i < this.items.length; i++){
        chromossome[i] == 1 && it.push(this.items[i]);
    }

    return it;
};

Knapsack.findSolution = function(maxWeigth, items){

    //this.maxSolutions = parseInt(Math.pow(items.length,3)*0.3);
    //dobro da quantidade de items
    this.maxSolutions = items.length * 3;

    //peso maximo da mochila
    this.maxWeigth = maxWeigth;

    this.items = items;

    //gera o coeficiente de penalidade baseado nos items
    this.generatePenaltyCoefficient();

    //inicia a populacao aleatoriamente
    this.initPopulation();

    for(var i = 0; i < this.maxGenerations; i++){
        //seleciona as colucoes para cruzar
        var solutionsToCross = this.getSolutionsToCross();
        //cruza as solutionsToCross
        var sons = this.crossover(solutionsToCross);
        //realiza as mutacoes dos filhos gerados
        sons = this.mutate(sons);

        //insere os filhos gerados na populacao
        for(var i in sons){
            this.solutions.push({
                chromossome : sons[i],
                fitness     : Knapsack.calculateFitness(sons[i])
            });
        }

        //selecionar os melhores para a proxima populacao
        this.solutions = this.getValidSolutions();
    }

    var solution = this.getBestSolution();

    //console.log("Population:");
    //console.log(this.solutions);
    console.log("----------------------------------");
    console.log("Best Solution: " , solution);


    return this.getChosenItems(solution);
};


module.exports = Knapsack;

