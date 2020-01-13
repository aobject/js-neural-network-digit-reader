class NeuralNetwork {
  
  // Initialize Network Object
  constructor(inputnodes, hiddennodes, outputnodes, learningrate){
    
  	// set number of nodes
    this.inodes = inputnodes;
    this.hnodes = hiddennodes;
    this.onodes = outputnodes;

    // set intial link weights
    // weights inside the arrays are w_i->j, where link is from node i to node j in the next layer
    // console.log(math.round(math.e, 3));

    // Create link weight matrices 
    this.wih = new Matrix(this.hnodes, this.inodes);
    this.who = new Matrix(this.onodes, this.hnodes);

    // Randomize values with mean 0, scale Math.pow(this.cols, -0.5)
    this.wih.randomize();
    this.who.randomize();
    // console.table(this.wih);
    // console.table(this.who);

    // Set the learning rate
    this.lr = learningrate; 

    // console.log("hello world!");
  }
  
  // Train Network and Export Weights

  // query the neural network
  query(inputs_arr) {
    // convert 1d array into 2d array
      // recieve simple array of inputs
      // insert inputs into matrix with 784 rows and 1 cols 
    let inputs = new Matrix(784, 1);
    for (let i = 0; i < 784; i++) {
      inputs.matrix[i][0] = map(float(inputs_arr[i]), 0, 255, 0.01, 1.0 );
    }
    // console.log(inputs.matrix);

    // // calculate the signals into hidden layer
    let hidden_inputs = this.wih.dot(inputs);
    // console.log(hidden_inputs);
    
    // calculate the signals emerging from hidden layer using sigmoid function
    let hidden_outputs = hidden_inputs.sigmoid();
    // console.log(hidden_outputs);


    // calculate the signals into the final output layer
    let final_inputs = this.who.dot(hidden_outputs);
    // console.log(final_inputs);

    // calculate the signals emerging from final output layer
    let final_outputs = final_inputs.sigmoid();
    // console.log(final_outputs);

    // return final_outputs
    let outputArr = [];
    for (let i = 0; i < 10; i++) {
      outputArr[i] = final_outputs.matrix[i][0];
    }
    return outputArr; 
  }
  
  // Load Network Weights and Answer Queries
  // inputs are actual results from nn // 10 values
  // targets are expected results from training data // 0.01 min and 0.99 max
  train(inputs_arr, targetsArr){

    // convert 1d targets array into 2d array matrix
    let targets = new Matrix(10, 1);
    for (let i = 0; i < 10; i++) {
      targets.matrix[i][0] = targetsArr[i];
    }

    // convert 1d array into 2d array
    // recieve simple array of inputs
    // insert inputs into matrix with 784 rows and 1 cols 
    let inputs = new Matrix(784, 1);
    for (let i = 0; i < 784; i++) {
      inputs.matrix[i][0] = map(float(inputs_arr[i]), 0, 255, 0.01, 1.0 );
    }
    // console.log(inputs.matrix);

    // // calculate the signals into hidden layer
    let hidden_inputs = this.wih.dot(inputs);
    // console.log(hidden_inputs);
    
    // calculate the signals emerging from hidden layer using sigmoid function
    let hidden_outputs = hidden_inputs.sigmoid();
    // console.log(hidden_outputs);


    // calculate the signals into the final output layer
    let final_inputs = this.who.dot(hidden_outputs);
    // console.log(final_inputs);

    // calculate the signals emerging from final output layer
    let final_outputs = final_inputs.sigmoid();
    // console.log(targets);
    // console.log(final_outputs);

    // error is the (target - actual)
    let output_errors = targets.subtract(final_outputs);
    // console.log(output_errors);

    // hidden layer error is the output_errors, split by weights, recombinded at hidden nodes
    let hidden_errors = this.who.transpose().dot(output_errors);
    // console.log(hidden_errors);

    // // update the weights for the links between the hidden and ouput layers
    // (1.0 - final_outputs)
    // let minus_fo = final_outputs.multiply(-1.0).add(1.0);

    // console.log(output_errors.dot(final_outputs)) ;
    // console.log(minus_fo);

    this.who = this.who.add(((output_errors.multiply(final_outputs).multiply(final_outputs.multiply(-1.0).add(1.0))).dot(hidden_outputs.transpose())).multiply(this.lr));
    // console.log(this.who);

    //self.who += self.lr * numpy.dot((output_errors * final_outputs * (1.0 - final_outputs)), numpy.transpose(hidden_outputs))

    // update the weights for the links between the input and hidden layers
    // console.log(this.wih);
    this.wih = this.wih.add(((hidden_errors.multiply(hidden_outputs).multiply(hidden_outputs.multiply(-1.0).add(1.0))).dot(inputs.transpose())).multiply(this.lr));

  }

  // save nn weights
  saveWeights() {
    let output = [];
    console.log(this.wih.matrix);
    for (let i = 0 ; i < this.hnodes; i++) {
      let wihOut = "";
      for (let j = 0 ; j < this.inodes; j++) {
        wihOut+=str(this.wih.matrix[i][j]);
        if (j < this.inodes - 1) {
          wihOut+=",";
        }
      }
      output[i] = wihOut;
    }
    save(output, 'wih.csv');

    output = [];
    console.log(this.who.matrix);
    for (let i = 0 ; i < this.onodes; i++) {
      let whoOut = "";
      for (let j = 0 ; j < this.hnodes; j++) {
        whoOut+=str(this.who.matrix[i][j]);
        if (j < this.hnodes - 1) {
          whoOut+=",";
        }
      }
      output[i] = whoOut;
    }
    save(output, 'who.csv');
  }
  
  // Load Test Data and Score Network


    
}

function print (value) {
  const precision = 14
  console.log(math.format(value, precision))
}