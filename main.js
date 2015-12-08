/**
 * Created by antonyalkmim on 08/12/15.
 */


var knapsack = require('./knapsack');

//Test 1
//================================================
var drinks = [
    {name: 'Beer', weigth: 40, value: 840},
    {name: 'Coke', weigth: 30, value: 600},
    {name: 'Wiskey', weigth: 20, value: 400}
];
console.log(knapsack.findSolution(50, drinks));
console.log("----------------------------------");

//Test 2
//================================================
var drinks2 = [
    {name: 'Beer', weigth: 40, value: 840},
    {name: 'Coke', weigth: 30, value: 600},
    {name: 'Wiskey', weigth: 20, value: 400},
    {name: 'Tequila', weigth: 10, value: 100}
];
console.log(knapsack.findSolution(50, drinks2));
console.log("----------------------------------");

//Test 3
//================================================
var drinks3 = [
    {name: 'Beer', weigth: 8, value: 100},
    {name: 'Coke', weigth: 3, value: 60},
    {name: 'Wiskey', weigth: 6, value: 70},
    {name: 'Tequila', weigth: 4, value: 15},
    {name: 'Water', weigth: 2, value: 15}
];
console.log(knapsack.findSolution(10, drinks3));
console.log("----------------------------------");


//Test 4
//================================================
var drinks4 = [
    {name: 'Beer', weigth: 52, value: 100},
    {name: 'Coke', weigth: 23, value: 60},
    {name: 'Wiskey', weigth: 35, value: 70},
    {name: 'Tequila', weigth: 15, value: 15},
    {name: 'Water', weigth: 7, value: 15}
];
console.log(knapsack.findSolution(60, drinks4));
console.log("----------------------------------");

//Test 5
//================================================
var drinks5 = [
    {name: 'Beer', weigth: 20, value: 100},
    {name: 'Coke', weigth: 50, value: 20},
    {name: 'Wiskey', weigth: 80, value: 40},
    {name: 'Tequila', weigth: 10, value: 200},
    {name: 'Water', weigth: 30, value: 150},
    {name: 'Water', weigth: 40, value: 120},
    {name: 'Water', weigth: 60, value: 50}
];
console.log(knapsack.findSolution(100, drinks5));
console.log("----------------------------------");


//Test 6
//================================================
var drinks6 = [
    {name: 'Beer', weigth: 15, value: 5},
    {name: 'Coke', weigth: 18, value: 6},
    {name: 'Wiskey', weigth: 13, value: 7},
    {name: 'Tequila', weigth: 23, value: 10},
    {name: 'Water', weigth: 9, value: 8},
    {name: 'Water', weigth: 10, value: 3},
    {name: 'Water', weigth: 11, value: 4},
    {name: 'Water', weigth: 5, value: 1},
    {name: 'Water', weigth: 14, value: 7},
    {name: 'Water', weigth: 5, value: 3}
];
console.log(knapsack.findSolution(100, drinks6));
console.log("----------------------------------");

//Teste 7
console.log(knapsack.findSolution(47, drinks6));
console.log("----------------------------------");
//Teste 8
console.log(knapsack.findSolution(28, drinks6));
console.log("----------------------------------");
//Teste 9
console.log(knapsack.findSolution(42, drinks6));
console.log("----------------------------------");