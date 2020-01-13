
let inputsTraining;
let inputsTesting; 
let nn;


function preload() {
  // load all data
  inputsTraining = loadStrings('mnist_data/mnist_train_small.csv');
  inputsTesting = loadStrings('mnist_data/mnist_test_10.csv');
  
}

function setup() {
  
  nn = new NeuralNetwork(784, 100, 10, 0.01);
  //trainNN();
  //testNN();
  //saveNN();

}


function draw() {

}


function trainNN() {
  
  
  
  // train network
  let splitString;
  let inputArr = [];
  let expectedResult;
  // read all training values
  for (let i = 0; i < inputsTraining.length; i++) {
    splitString = split(inputsTraining[i], ',');
    expectedResult = parseFloat(splitString[0]);
    let target = [];
    for (let j = 0; j < 10; j++) {
      if (expectedResult === j) {
        target[j] = 0.99;
      } else {
        target[j] = 0.01; 
      }
      
    }
    for (let j = 1; j < splitString.length; j++) {
      inputArr[j - 1] = parseFloat(splitString[j]);
    }
    // query current input
    //let output = nn.query(inputArr);
    
    // train nn with output 
     nn.train(inputArr, target);
  }
  console.log("Training Complete"); 
}

function testNN() {
  
  // test network
  let splitString;
  let inputArr = [];
  let expectedResult;
  let scorecard = [];
  for (let i = 0; i < inputsTesting.length; i++) {
    splitString = split(inputsTesting[i], ',');
    expectedResult = parseFloat(splitString[0]);
    for (let j = 1; j < splitString.length; j++) {
      inputArr[j - 1] = parseFloat(splitString[j]);
    }
    let output = nn.query(inputArr);
    let winner = 0;
    for (let j = 1; j < output.length; j++) {
      if(output[winner] < output[j]) {
        winner = j; 
      }
    }
    if (expectedResult === winner) {
      scorecard[i] = 1;
    } else {
      scorecard[i] = 0;
    }
  }
  
  let sum = 0;
  for (let i = 0; i < scorecard.length; i++) {
    sum += scorecard[i];
  }
  console.log("Testing Complete.");
  console.log("final result is: ");
  console.log(sum / scorecard.length);

}

function saveNN() {
  nn.saveWeights();

}
