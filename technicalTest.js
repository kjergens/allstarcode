/*
 * Question 1
*/
var listA = [3,4,5,6,2,18]
var listB = [17,18,19,3]
var newList = []

for (var i = 0; i < listA.length; i++) {
	for (var j = 0; j < listB.length; j++)  {
		if (listA[i] === listB[j]) {
			newList.push(listA[i])
		}
	}
}

console.log(newList)



/*
 * Question 2
*/
var list = [7,4,3,12,8]
var target = 15
var numbersAddToTarget = false

for (var i = 0; i < list.length; i++) {
	for (var j = 0; j < list.length; j++)  {
		if (i != j && list[i] + list[j] === target) {
			numbersAddToTarget = true
		}
	}
}
console.log(numbersAddToTarget)


/*
 * Question 3
*/
function fizzBuzz(i) {
	if (i%3===0 && i%5===0) {
		console.log("Fizz Buzz");
	} else if (i%3===0) {
		console.log("Fizz")
	} else if (i%5===0) {
		console.log("Buzz")
	}
}

fizzBuzz(30)