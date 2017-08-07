var getStuff = 	function(userdata) {
	let countryUrl = "https://restcountries.eu/rest/v2/alpha?codes="+userdata.results[0].nat

	$.ajax( {
		url: countryUrl,
		success: function(data) {
			let name = userdata.results[0].name.first+" "+userdata.results[0].name.last
			let image_url = userdata.results[0].picture.large
			
			$('body').append(`<h1>${name}</h1>`)
			$('body').append(`<img class="thumbnail profile_pic" src="${image_url}">`)
			$('body').append(`<img class="thumbnail flag" src="${data[0].flag}">`)
			$('body').append(`<p>${data[0].name}</p>`)
		}
	})		
}

function setup() {

		$.ajax( {
		url:"https://randomuser.me/api/"}).done(
		function(userdata) {
			getStuff(userdata)
		}
	)

	
	// $.ajax( {
	// 	url:"https://randomuser.me/api/",
	// 	success: function(userdata) {
	// 		let countryUrl = "https://restcountries.eu/rest/v2/alpha?codes="+userdata.results[0].nat

	// 		$.ajax( {
	// 			url: countryUrl,
	// 			success: function(data) {
	// 				let name = userdata.results[0].name.first+" "+userdata.results[0].name.last
	// 				let image_url = userdata.results[0].picture.large
					
	// 				$('body').append(`<h1>${name}</h1>`)
	// 				$('body').append(`<img class="thumbnail profile_pic" src="${image_url}">`)
	// 				$('body').append(`<img class="thumbnail flag" src="${data[0].flag}">`)
	// 				$('body').append(`<p>${data[0].name}</p>`)
	// 			}
	// 		})		
	// 	}
	// })

	// $.getJSON( "https://randomuser.me/api/",
	// 	function (userdata) {
	// 		let countryCode = userdata.results[0].nat

	// 		$.getJSON(`https://restcountries.eu/rest/v2/alpha?codes=${countryCode}`,
	// 			function (countrydata) {
	// 				let name = userdata.results[0].name.first+" "+userdata.results[0].name.last
	// 				let image_url = userdata.results[0].picture.large
					
	// 				$('body').append(`<h1>${name}</h1>`)
	// 				$('body').append(`<img class="thumbnail profile_pic" src="${image_url}">`)
	// 				$('body').append(`<img class="thumbnail flag" src="${countrydata[0].flag}">`)
	// 				$('body').append(`<p>${countrydata[0].name}</p>`)
	// 			} // end inner callback
	// 		) // end inner call to getJSON
	// 	} // end outer callback
	// ) // end outer getJSON
} // end setup 



$(document).ready(setup)
