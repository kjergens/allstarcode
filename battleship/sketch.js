// Global variables
var rows = 4
var cols = 4
var squareSize = 160
var shipCol = Math.floor(Math.random()*cols) // pick random column
var shipRow = Math.floor(Math.random()*rows) // pick random row

function setup() {
	createCanvas(windowWidth, windowHeight)
	background(255, 90, 120)

	// Draw the grid
	fill('white')
	for (var i = 0; i<rows; i++) {
		for (var j = 0; j <cols; j++) {
			rect(j*squareSize, i*squareSize, squareSize, squareSize) 
		}
	}

	// For debugging, let me see the battleship spot
	  // fill('gray')
	  // rect(shipCol*squareSize, shipRow*squareSize, squareSize, squareSize) 
}

function mouseClicked() {
	var guessRow
	var guessCol

	// Determine the row they're in (TODO: there must be a more math-y way to do this)
	if (mouseY >= squareSize*3) {
		guessRow = 3
	} else if (mouseY >= squareSize*2) {
		guessRow = 2
	} else if (mouseY >= squareSize*1) {
		guessRow = 1
	} else {
		guessRow = 0
	}

	// Determine the column they're in
	if (mouseX >= squareSize*3) {
		guessCol = 3
	} else if (mouseX >= squareSize*2) {
		guessCol = 2
	} else if (mouseX >= squareSize*1) {
		guessCol = 1
	} else {
		guessCol = 0
	}

	// Check if they won
	if (guessCol == shipCol && guessRow == shipRow) {        
		fill('black')
		alert("You sunk my battleship!")
	} else {
		fill('lightgray')
	}

	// Fill the rect they clicked on
	rect(guessCol*squareSize, guessRow*squareSize, squareSize, squareSize) 
}