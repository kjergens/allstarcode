var inp; 
var sample = "la la la"

function setup() {
	createCanvas(windowWidth, windowHeight)

	background(255, 204, 0);
	textSize(72);
	intro = "Test Your Typing"
	intro_x = windowWidth/3-intro.length
	intro_y = windowHeight/3-20
	text(intro, intro_x, intro_y);

	// The sample sentence
	textSize(42);
	sample_x = intro_x+intro_x/2
	text(sample, sample_x, intro_y+95) 

	// Where the user types
	inp = createInput('', "text");
	inp.position(sample_x-20, intro_y+140);
  	inp.size(sample.length*20, 90);
  	inp.style("font-size:40px")
  	inp.elt.focus();
}

function keyTyped() {
  if (keyCode === ENTER) {
    if (inp.value() === sample) {
    	alert("you win")
    }
  } 
}