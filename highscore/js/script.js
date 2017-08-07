var initials = '';
var playerWeapon = '';
var computerWeapon = '';
var weapons = ['rock','paper','scissors'];
var score = 0;
var database = firebase.database().ref();

function getInitials() {
	initials = $("#initialsInput").val();
	$("#welcome").text("Welcome "+initials+"!")
}

function rockSelected() {
	playerWeapon = 'rock';
	finishTurn();
}

function paperSelected() {
	playerWeapon = 'paper';
	finishTurn();
}

function scissorsSelected() {
	playerWeapon = 'scissors';
	finishTurn();
}

function setComputerWeapon() {
	computerWeapon = weapons[Math.floor(Math.random()*weapons.length)];
	$("#computer-weapon").text("Computer chooses "+computerWeapon)
}

function finishTurn() {
	$("#player-weapon").text("You choose "+playerWeapon)
	setComputerWeapon();
	determineWinner();
}


function determineWinner() {

	let oldScore = score;

	if(playerWeapon==='rock') {
		if(computerWeapon==='scissors') {
			score++;
		} 
	} else if (playerWeapon==='paper') {
		if (computerWeapon==='rock') {
			score++;
		}
	} else if (playerWeapon==='scissors') {
		if (computerWeapon==='paper') {
			score++;
		}
	}

	if (score>oldScore) {
		$("#who-won").text("You win!")
	} else {
		$("#who-won").text("")
	}

	$("#score").text("Your score: "+score);
}


//button executes this function
function save(){
    //Update database here
    var data = {
    	"INITIALS" : initials,
    	"SCORE" : score
    }
    database.push(data);

    // reset score
    score = 0; 
    $("#score").text("Your score: "+score);

}

database.orderByChild("SCORE").limitToLast(10).on("child_added", function(rowData) {
  		let line = rowData.val().INITIALS + " got " + rowData.val().SCORE + " points.";
  		//$("#leaderboard").append("<div>"+line+"</div>");

  		// Write top score at top
  		let board=`<div>${line}</div>`+$("#leaderboard").html();
  		$("#leaderboard").html(board);
});



// database.on("child_added",  function(rowData) {
// 	// row is same as object we pushed
// 	var row = rowData.val();

// 	console.log(row); // debugging

// 	$("#leaderboard").append("<div><em>"+row.INITIALS+' got</em> : '+row.SCORE+"</div>");

// })
