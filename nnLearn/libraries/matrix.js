


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