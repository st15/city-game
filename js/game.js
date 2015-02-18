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
	onStartNewGame();
	
    $("#button-start-new-game").click(onStartNewGame);
	
    $("#button-guess").click(function(){
		if (isPlaying) {
			checkCity($("#city-input").val());
			updateView();
		}
    });
});

function onStartNewGame() {
	// set new city
	var randomCityData = getRandomCityData();
	initNewGame(randomCityData["city"], randomCityData["country"]);
	updateView();
}

function updateView() {
	// clear input field
	$("#city-input").val("");
	
	if (isPlaying) {
		$("#city-text").html(cityUnderscored);
		$("#country-text").html(countryReversed);
		$("#result-text").html("Остават ти " + numberOfTries + " опита.");
	}
	else {
		// game over: show correct city and country
		$("#city-text").html(city);
		$("#country-text").html(country);
		if (hasWon) 
			$("#result-text").html("Спечели!");
		else 
			$("#result-text").html("Загуби!");
	}
}

function initNewGame(newCity, newCountry) {
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
		if (isOdd == replaceOdd) { // if both are even or both are odd
			charsArray[i] = "_";
		}
	}
	return charsArray.join("");
}

function isVowel(char) {
	var vowels = "АЕИОУЪ";
	return vowels.indexOf(char.toUpperCase()) >= 0;
}
