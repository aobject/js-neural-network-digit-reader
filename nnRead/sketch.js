let nn;
let scribble;
let wihTable;
let whoTable; 
let wihArr; 
let whoArr;

// load classes start




class Matrix {
	constructor(rows, cols) {
		this.rows = rows;
		this.cols = cols;
		this.matrix = [];

		for (let i = 0; i < this.rows; i++) {
			this.matrix[i] = [];
			for (let j = 0; j < this.cols; j++) {
				this.matrix[i][j] = 0;
			}
		}
	}

	randomize() {
		let mean = 0; 
		let scale = Math.pow(this.cols, -0.5);
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				this.matrix[i][j] = randomGaussian(mean, scale);
			}
		}
	}

	add(n) {
		let result = new Matrix(this.rows, this.cols);
		if (n instanceof Matrix) {
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
					result.matrix[i][j] = this.matrix[i][j] + n.matrix[i][j];
				}
			}
		} else {
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
					result.matrix[i][j] = this.matrix[i][j] + n;
				}
			}	
		}
		return result; 
	} 

	subtract(n) {
		let result = new Matrix(this.rows, this.cols);
		if (n instanceof Matrix) {
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
					result.matrix[i][j] = this.matrix[i][j] - n.matrix[i][j];
				}
			}	
		} else {
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
					result.matrix[i][j] = this.matrix[i][j] - n;
				}
			}	
		}
		return result; 
	} 

	multiply(n) {
		let result = new Matrix(this.rows, this.cols);
		if (n instanceof Matrix) {
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
					result.matrix[i][j] = this.matrix[i][j] * n.matrix[i][j];
				}
			}	
		} else {
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
					result.matrix[i][j] = this.matrix[i][j] * n;
				}
			}	
		}
		return result; 
	} 

	dot(n) {
		if (n instanceof Matrix) {
			// Matrix product
			if (this.cols !== n.rows) {
				console.log('Cols of A must match rows of B');
				return undefined; 
			}
			let result = new Matrix(this.rows, n.cols);
			let a = this;
			let b = n; 

			for (let i = 0; i < result.rows; i++) {
				for (let j = 0; j < result.cols; j++) {
					// Dot product of values in col
					let sum = 0;
					for (let k =0; k < a.cols; k++) {
						sum += a.matrix[i][k] * b.matrix[k][j];
					}
					result.matrix[i][j] = sum; 
				}
			}
			return result; 
		} else {
			// Scalar product
			console.log("Must either use Matrix to do dot operation or use multiply for element wise operation.");
			return result;
		}
	}

	transpose() {
		let result = new Matrix(this.cols, this.rows);
		for (let i = 0; i < result.rows; i++) {
			for (let j = 0; j < result.cols; j++) {
				result.matrix[i][j] = this.matrix[j][i];
			}
		}
		return result; 
	}

  sigmoid() {
  	let result = new Matrix(this.rows,this.cols);
    for (let i = 0; i < this.rows; i++) {
      result.matrix[i][0] = 1 / (1 + Math.exp(-this.matrix[i][0]));
    } 
    return result;
  }

  stringToMatrix(){

  }
}

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
    // console.log(this.wih.matrix);
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
    // console.log(this.who.matrix);
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
  setWeights(wih, who) {
    // get 2d wih array
    // set values of this.wih.matrix
    for (let i = 0; i < this.wih.rows; i++) {
      for (let j = 0; j < this.wih.cols; j++) {
        this.wih.matrix[i][j] = wih[i][j];
      }
    }
    // console.log(this.wih.matrix);

    for (let i = 0; i < this.who.rows; i++) {
      for (let j = 0; j < this.who.cols; j++) {
        this.who.matrix[i][j] = who[i][j];
      }
    }
    // console.log(this.who.matrix);
  }
}




// load classes end

function loadfile() {
  whoTable = loadTable('who.csv', 'csv',loadwih );
  
}

function loadwih() {
  console.log('who loaded.');
  // console.log(whoTable);
  wihTable = loadTable('wih.csv','csv',fileloaded);
}

function fileloaded() {
  console.log('wih loaded.');
  // console.log(wihTable);
  whoArr = whoTable.getArray();
  wihArr = wihTable.getArray();
  // console.log(whoArr);
  nn = new NeuralNetwork(784, 100, 10, 0.01);

  // console.log(wihArr);
  // console.log(whoArr);
  nn.setWeights(wihArr, whoArr);
}



function drawButtons(text_input, x_center, y_center) {
  
  noFill();
  strokeWeight(2);
  stroke(255);
  rectMode(CENTER); // Set rectMode to CENTER
  rect(x_center, y_center, 100, 40);
  
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(32);
  text(text_input,x_center, y_center);
}

function drawText(text_input, x_center, y_center) {
  
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(32);
  text(text_input,x_center, y_center);
}

function mouseReleased() {
  active_pen = false;
}

function mouseClicked() {
  console.log("mouse click ", mouseX, mouseY);
  
  if (mouseY > 425 && mouseY < 475) {
    // clear
    // upper left corner   x:70   y:425
    // lower right corner  x:178  y:473
    if (mouseX >= 70 && mouseX <= 178) {
      // clear drawing
      clearDrawing();
    }
    
    // read
    // upper left corner   x:322      y:429
    // lower right corner  x:428      y:474
    if (mouseX >= 322 && mouseX <= 428) {
      // read drawing
      readDrawing(); 
    }
  }

}

function clearDrawing() {
  background(255);
  image(img, 0,0, 500,500);
  drawButtons("clear",width/4, height - 50);
  drawButtons("read",width/4 * 3, height - 50);
  drawText("Write a digit 0-9 and I'll guess!", width/2, 50 );
  noFill();
  strokeWeight(2);
  stroke(255);
  rectMode(CENTER); // Set rectMode to CENTER
  rect(width/2, height/2, 282, 282);
}

function penSettings() {
  stroke( 255 );
  strokeWeight(15);
}

function readDrawing() {

  
  loadPixels();
  
  let d = pixelDensity() ;
  pix_x = 110 + 280 ;
  pix_y = 110 + 280 ;
  cur_pix = (pix_x + pix_y * width) * 4;
  let r = pixels[cur_pix];
  let g = pixels[cur_pix + 1];
  let b = pixels[cur_pix + 2];
  let output_rgb = new Array(784);  
  let output_gradient = new Array(784);
  let out_count = 0;
  
  for (let y = 110 ; y < (110+280); y +=10) {
    for (let x = 110 ; x < (110+280) ; x +=10) {
      let totalcount = 0;
      let totalsum = 0;
      let subx;
      let suby;
      let index;
      
      for( suby = y * d; suby < (y*d+(10*d));suby++){
        for( subx = x * d; subx < (x*d+(10*d));subx++){
          index = (subx + suby * (width*d)) * 4;
          
          // add value
          // increment counter
          totalsum += pixels[index+1];
          totalcount++;
        }
      }
      let finalave = totalsum / totalcount;
      // out_count = x + y * 28;
      
      // check that format of the sample data. does it go through all columns, new row and repeat? 
      // If so format the reading of the drawing the same. 
      // not sure current reading. not sure current training data format. verify.
      
      output_rgb[out_count] = str(map(finalave, 21, 255, 0, 255));
      output_gradient[out_count] = map(finalave, 21, 255, 0.01, 1.0);
      out_count++;
      
    }
  }
  //console.log(output_rgb);
  //console.log(output_gradient);
  
  // query nn for number
  // console.log(output_rgb);
  // console.log(nn.query(output_rgb));
  let result = nn.query(output_rgb);
  let winner = 0;
  for (let i = 1; i < 10; i++) {
    if (result[winner] < result[i]) {
      winner = i;
    }
  }
  console.log('the digit is: ');
  console.log(winner);
  // find bounding box of drawing
  fill("#FF1574");
  noStroke();
  rectMode(CENTER); // Set rectMode to CENTER
  rect(width/2, 50, 450, 40);
  let message = "Hmmm... that looks like a ";
  message += str(winner);
  message += ".";
  drawText(message, width/2, 50 );
}

let prev_x = 0;
let prev_y = 0;
let cur_x = 0;
let cur_y = 0;
let active_pen = false;
let clear_screen = false; 
let img;
function preload() {
  img = loadImage('back.png');
}


function setup() {
  loadfile();
  scribble = new Scribble();              // global mode

  createCanvas(500, 500);
  background(255);
  penSettings() ;
  image(img, 0,0, 500,500);
  drawButtons("clear",width/4, height - 50);
  drawButtons("read",width/4 * 3, height - 50);
  drawText("Write a digit 0 to 9 and I'll guess!", width/2, 50 );
  clearDrawing();
}


function draw() {
  if(mouseIsPressed){
    if(!active_pen){
        prev_x = mouseX;
        prev_y = mouseY;
        cur_x = mouseX;
        cur_y = mouseY;
        active_pen = true;
    }
    if (cur_x != mouseX || cur_y != mouseY) {
      prev_x = cur_x;
      prev_y = cur_y;
      cur_x = mouseX;
      cur_y = mouseY;
      penSettings();
      scribble.scribbleLine( prev_x, prev_y, cur_x, cur_y );
    }
  }
  if(clear_screen) {
    active_pen = false;
  }


}
