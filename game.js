"use strict";
// global variables
var numberOfTries, 
	hasWon, 
	isPlaying, 
	city, 
	country, 
	cityUnderscored, 
	countryReversed;
	
$(document).ready(function(){
	
    $("#button-new-game").click(function(){
        // set new city
		var randomCityData = getRandomCityData();
		startNewGame(randomCityData["city"], randomCityData["country"]);
		updateView();
    });
	
    $("#button-guess").click(function(){
		if (isPlaying) {
			checkCity($("#city-input").val());
			updateView();
		}
    });
});

function updateView() {
	// clear input field
	$("#city-input").val("");
	
	if (isPlaying) {
		$("#game-text").html(cityUnderscored + "<br/>" + countryReversed);
		$("#result-text").html("Остават ти " + numberOfTries + " опита.");
	}
	else {
		// game over: show correct city and country
		$("#game-text").html(city + "<br/>" + country);
		if (hasWon) 
			$("#result-text").html("Спечели!");
		else 
			$("#result-text").html("Загуби!");
	}
}

function startNewGame(newCity, newCountry) {
	numberOfTries = 5;
	hasWon = false;
	isPlaying = true;
	
	city = newCity; 
	country = newCountry; 
	
	// нечетните букви трябва да са скрити, ако името на държавата започва с гласна
	cityUnderscored = replaceWithUnderscores(city, isVowel(country.charAt(0))); 
	countryReversed = country.split("").reverse().join("");
}

function checkCity(guessedCity) {
	
	numberOfTries--;
	
	if (numberOfTries > 0) { 
		// check if input is correct
		if (city.toLowerCase() == guessedCity.toLowerCase()) {
			// win game
			hasWon = true;
			isPlaying = false;
		}
	}
	else { 
		// no more tries: game over
		isPlaying = false;
	}
}

function getRandomCityData() {
	var CITIES = [{"city" : "Пловдив", "country" : "България"}, {"city" : "Будапеща", "country" : "Унгария"}, {"city" : "Барселона", "country" : "Испания"}, {"city" : "Москва", "country" : "Русия"}, {"city" : "Вашингтон", "country" : "САЩ"}];
	var index = Math.floor(Math.random() * CITIES.length);
	return CITIES[index];
}

/*
* Ако replaceOdd е true, заменя символите от str на нечетни позиции,
* ако е false - на четни.
*/
function replaceWithUnderscores(str, replaceOdd) {
	
	var charsArray = str.split("");
	for (var i = 0; i < charsArray.length; i++) {
		var isOdd = i % 2 == 1; // 1 - odd, 0 - even
		if (isOdd == replaceOdd) { // еквивалентно на if (isOdd ^ replaceOdd == 0)
			charsArray[i] = "_";
		}
	}
	return charsArray.join("");
}

function isVowel(char) {
	var vowels = "АЕИОУЪ";
	return vowels.indexOf(char.toUpperCase()) >= 0;
}
