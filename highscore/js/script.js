var initials = '';
var playerWeapon = '';
var computerWeapon = '';
var weapons = ['Kevin','Mahdi','Roger'];
var score = 0;
var database = firebase.database().ref();
var verbs = ['annihilates', 'destroys', 'embarrasses', 'teaches a lesson to', 'beats', 'wallops', 'overcomes']

function getInitials() {
	initials = $("#initialsInput").val();
	$("#welcome").text("Welcome "+initials+"!")
}

function rockSelected() {
	playerWeapon = 'Kevin';
	finishTurn();
}

function paperSelected() {
	playerWeapon = 'Mahdi';
	finishTurn();
}

function scissorsSelected() {
	playerWeapon = 'Roger';
	finishTurn();
}

function finishTurn() {
	$("#player-weapon").text("You chose "+playerWeapon+". ")
	setComputerWeapon();
	determineWinner();
}


function setComputerWeapon() {
	computerWeapon = weapons[Math.floor(Math.random()*weapons.length)];
	$("#computer-weapon").text("Computer chooses "+computerWeapon+". ")
}




function determineWinner() {

	let oldScore = score;

	if(playerWeapon==='Kevin') {
		if(computerWeapon==='Roger') {
			score++;
		} 
	} else if (playerWeapon==='Mahdi') {
		if (computerWeapon==='Kevin') {
			score++;
		}
	} else if (playerWeapon==='Roger') {
		if (computerWeapon==='Mahdi') {
			score++;
		}
	}

	if (score>oldScore) {
		$("#who-won").text("You win!")
		$("#description").text(playerWeapon+" "+verbs[Math.floor(Math.random()*verbs.length)]+" "+computerWeapon+"!")
		$("#result_container").css("background-color", "#d3f1d8")
		$("#result_container").css("color", "#435b46")
	} else if (playerWeapon !== computerWeapon){
		$("#description").text(computerWeapon+" "+verbs[Math.floor(Math.random()*verbs.length)]+" "+playerWeapon+"!")
		$("#who-won").text("Computer wins.")
		$("#result_container").css("background-color", "#e0b2b2")
		$("#result_container").css("color", "#990000")
	} else {
		$("#description").text('')
		$("#result_container").css("background-color", "#eee")
		$("#result_container").css("color", "#333")
		$("#who-won").text("Tie.")
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
  		let board=`<li class="list-group-item">${line}</li>`+$("#leaderboard").html();
  		$("#leaderboard").html(board);
});



// database.on("child_added",  function(rowData) {
// 	// row is same as object we pushed
// 	var row = rowData.val();

// 	console.log(row); // debugging

// 	$("#leaderboard").append("<div><em>"+row.INITIALS+' got</em> : '+row.SCORE+"</div>");

// })
