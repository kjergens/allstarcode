words = ["dare", "fail", "do", "live", "aspire", "hustle", "enjoy"]
var maxtSize = 52;
var tSize = 52;
var tFont = "Georgia";


function setup() {
  createCanvas(windowWidth, windowHeight-200);
  frameRate(7)
  noStroke();
  
}

function draw() {
  if (mouseIsPressed) {

	    if (tSize < 18) tSize = maxtSize;
	    textSize(tSize--);

	    var word = getWord();
	    var x = mouseX;
	    var y = mouseY;

	    // Draw a background to make text readable
	    fill (0,0,0,200)
	    rect(x-10, y-tSize+10, (tSize*(word.length/2))+10, tSize);

	    // Print the word or phrase over the rect
	    textFont(getFont());
	   	fill(Math.floor(Math.random() * 255)   // red
	    	, Math.floor(Math.random() * 255)  // green
	    	, Math.floor(Math.random() * 255)); // blue
	    text(word, mouseX, mouseY);
 }

}

function getFont() {
	fonts = ["Josefin+Sans", "Indie Flower", "Kurale", "Lobster"];

	return fonts[Math.floor(Math.random() * fonts.length)]
}

function getWord() {
	var r = Math.floor(Math.random() * words.length);
	return words[r];
}

function toggleWords() {
	if (words[0] === "dare") {
		words = ["Live your best", "There is no competition"
		, "Dare greatly", "Tell your story", "Celebrate failure", "Work hard"];
		maxtSize = 38;
		$('#toggleBtn').html("Words")
	} else {
		words = ["dare", "fail", "do", "live", "aspire", "hustle", "try", "work", "give", "receive"];
		maxtSize = 52
		$('#toggleBtn').html("Phrases")
	}
	tSize = maxtSize;

}