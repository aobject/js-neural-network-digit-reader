# js-neural-network-digit-reader 

// APP DESCRIPTION // 
  Digit Reader is a web-based handwriting reader designed to read the digit drawn and returns an educated guess. 
  The app uses a custom JavaScript neural network algorithm. 
  Behind the scenes, the code creates a neural network object embedded with training knowledge. As a result, 
  the user can instantly query the network with no training required. 

  The neural network training is done beforehand and exported as a csv file that holds all the optimal neural 
  network link weights that load with the app. 

  The neural network algorithm uses three layers: there are 784 input nodes, 100 hidden nodes, and 10 output nodes. 
  The network is trained using the MNIST data set.
  
// LIVE DEMO ONLINE // 
  You can see an online demo at http://www.obj.nyc/#/neural-network-digit-reader/

// LIBRARIES // 
  The code uses the p5 and scribble libraries for the interface. The core of the JavaScript neural network code is 
  ported and addapted for the app from the Python code in the book Make Your Own Neural Network.
  p5 is online at https://p5js.org/
  scribble is at https://p5js.org/libraries/
  Make Your Own Neural Network can be purchased at https://www.amazon.com/Make-Your-Own-Neural-Network-ebook/dp/B01EER4Z4G

// FOLDER STRUCTURE // 
  The nnRead folder holds the JavaScript app for reading digits. 

  The nnLearn folder holds the JavaScript app for the neural network learning proccess. The network is setup to work 
  with the MNIST database, which is online at http://yann.lecun.com/exdb/mnist/
  The output is two csv files used by the Digit Reader app in the nnRead folder. 


