var name = prompt("What's your name?")
var favFood = prompt("What's your favorite food?")

// Store the new key: value
// var ref = firebase.database().ref(name)

// ref.set({
// 	food: favFood
// })


var oldFood = firebase.database().ref(name+"/food") // <-- TODO: get the old food(s)
console.log(newFood) // debug

// Append new food to old food
var newFood = oldFood + " and " + favFood


// Update db
firebase.database().ref(name).set({
	food:newFood
})


// Show data
var database = firebase.database().ref()

database.on("child_added",  function(rowData) {
	$("#all-foods").append("<div><em>"+rowData.key+" says</em> : "+rowData.val().food+"</div>");
})

