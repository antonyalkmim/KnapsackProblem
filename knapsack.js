/**
 * Created by antonyalkmim on 28/11/15.
 */


var Knapsack = {};

Knapsack.items = []; //Itens da instancia
Knapsack.solutions = []; //Solucoes para o problema

//DEVE SEMPRE SER UM NUMERO PAR
Knapsack.maxGenerations = 10; //Condicao de parada, quantidade de geracoes
Knapsack.initSolutions = 4; //quantidade inicial da populacao
Knapsack.maxWeigth = 0; //Peso maximo que a mochila suporta

Knapsack.setItems = function(items){
  this.items = items; //Items most be an array
};

Knapsack.crossover = function(ChromossomeA, ChromossomeB){
    //TODO: return a ChromossomeC result from crossover AB
};

Knapsack.calculateSolution = function(solution){

    var sum = {
        weigth:0,
        value:0
    };

    for(var i = 0; i < this.items.length; i++){
        if(solution[i]){
            sum.weigth += this.items[i].weigth;
            sum.value += this.items[i].value;
        }
    }

    return sum;
};

Knapsack.randNewSolution = function(){
    var chromossome = [];

    for(var i = 0; i < this.items.length; i++){
        chromossome[i] = (Math.random() >= 0.5);
    }
    return chromossome;
};

/**
 * Inicia populacao com todos os integrantes diferentes entre si
 */
Knapsack.initPopulation = function(){
    var self = this;
    var isValidSolution = function(solution){
        var calculateSolution = self.calculateSolution(solution);

        //verifica se solucao ja existe na populacao
        for(var i in self.solutions){
            if(self.solutions[i].join('') == solution.join(''))
                return false;
        }

        return calculateSolution.weigth <= self.maxWeigth && calculateSolution.value > 0;
    };

    for(var i = 0; i < this.initSolutions; i++) {
        var solution = null;
        do {
            solution = this.randNewSolution();
        }while(!isValidSolution(solution));
        this.solutions[i] = solution;
    }
};

Knapsack.findSolution = function(maxWeigth, items){

    this.maxWeigth = maxWeigth;
    this.items = items;

    this.initPopulation();

    for(var i = 0; i < this.maxGenerations; i++){

        //Cruza a populacao atual
        for(var j=0; j < this.solutions.length; j += 2){
            this.crossover(this.solutions[j], this.solutions[j+1]);
        }

        //TODO:Avalia a populacao gerada


    }

    console.log(this.solutions);

};


/**
 * Rolling in the deep
 */
(function(){

    var drinks = [
        {name: 'Beer', weigth: 40, value: 840},
        {name: 'Coke', weigth: 30, value: 600},
        {name: 'Wiskey', weigth: 20, value: 400}
    ];
    Knapsack.findSolution(50, drinks);

})();



