var initials = '';
var playerWeapon = '';
var computerWeapon = '';
var weapons = ['Kevin','Mahdi','Roger'];
var score = 0;
var database = firebase.database().ref();
var activeVerbs = ['annihilates', 'destroys', 'embarrasses', 'teaches a lesson to', 'beats', 'wallops', 'overcomes']
var passiveVerbs = ['annihilated', 'destroyed', 'embarrassed', 'taught', 'beaten', 'wallopped']

function getInitials() {
	initials = $("#initialsInput").val();
	$("#welcome").text("Welcome "+initials+"!")
}

function rockSelected() {
	resetBtns()
	playerWeapon = 'Kevin';
	$("#rock-btn").css("border", "12px solid #5b5b5b")
	//$("#rock-btn").css("opacity", ".8")
	finishTurn();
}

function paperSelected() {
	resetBtns()
	playerWeapon = 'Mahdi';
	$("#paper-btn").css("border", "12px solid #5b5b5b")
	//$("#paper-btn").css("opacity", ".8")
	finishTurn();
}

function scissorsSelected() {
	resetBtns()
	playerWeapon = 'Roger';
	$("#scissors-btn").css("border", "12px solid #5b5b5b")
	//$("#scissors-btn").css("opacity", ".8")
	finishTurn();
}

function resetBtns () {
	$(".btn-weapon").css("border", "10px solid #fefefe")
	//$(".btn-weapon").css("opacity", "1")
}

function finishTurn() {
	$("#player-weapon").text("You chose "+playerWeapon+". ")
	setComputerWeapon();
	determineWinner();
}


function setComputerWeapon() {
	computerWeapon = weapons[Math.floor(Math.random()*weapons.length)];
	while (computerWeapon === playerWeapon) {
		computerWeapon = weapons[Math.floor(Math.random()*weapons.length)];
	}

	$("#computer-weapon").text("Computer chooses "+computerWeapon+". ")

	if (computerWeapon === 'Kevin') {
		$("#rock-btn").css("border", "12px solid #3a3a3a")
		$("#rock-btn").css("opacity", ".9")
	} else if (computerWeapon === 'Mahdi') {
		$("#paper-btn").css("border", "12px solid #3a3a3a")
		$("#paper-btn").css("opacity", ".9")
	} else {
		$("#scissors-btn").css("border", "12px solid #3a3a3a")
		$("#scissors-btn").css("opacity", ".9")
	}
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
		$("#description").text(playerWeapon+" "+activeVerbs[Math.floor(Math.random()*activeVerbs.length)]+" "+computerWeapon+"!")
		$("#result_container").css("background-color", "#d3f1d8")
		$("#result_container").css("color", "#435b46")
	} else if (playerWeapon !== computerWeapon){
		$("#description").text(playerWeapon+" got "+passiveVerbs[Math.floor(Math.random()*passiveVerbs.length)]+" by "+computerWeapon+"!")
		$("#who-won").text("You lose.")
		$("#result_container").css("background-color", "#e0b2b2")
		$("#result_container").css("color", "#990000")
	} else {
		$("#description").text('')
		$("#result_container").css("background-color", "#eee")
		$("#result_container").css("color", "#333")
		$("#who-won").text("Tie.")
	}

	$("#score").text("Your score: "+score);

};


//button executes this function
function save(){

	getInitials();

	if (initials.length === 0) {
		$("#save-info").text("Please enter your initials.")
	} else {
	    //Update database here
	    var data = {
	    	"INITIALS" : initials,
	    	"SCORE" : score
	    }
	    database.push(data);

	    // reset score
	    score = 0; 
	    $("#score").text("Your score: "+score);
	    $("#save-info").text("Results saved. (Refresh to see new order.)")
	    resetBtns();
	}

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
