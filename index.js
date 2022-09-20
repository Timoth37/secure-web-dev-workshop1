// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict'

// https://opendata.paris.fr/explore/dataset/lieux-de-tournage-a-paris/information
const filmingLocations = require('./lieux-de-tournage-a-paris.json')

console.log('🚀 It Works!');

/**
 * 💅 Try to produce the most readable code, use meaningful variable names
 * Your intentions should be clear by just reading the code
 * Good luck, have fun !
 */

// 📝 TODO: Number of filming locations
// 1. Make the function return the number of filming locations
function getFilmingLocationsNumber () {
	return filmingLocations.length
}
console.log(`There is ${getFilmingLocationsNumber()} filming locations in Paris`)

// 📝 TODO: Filming locations sorted by start date, from most recent to oldest.
// 1. Implement the function
// 2. Log the first and last item in array
function sortFilmingLocationsByStartDate () {
	const test = filmingLocations.sort(function(a,b){return new Date(b.fields.date_debut)- new Date(a.fields.date_debut)})
	return test
}
console.log(sortFilmingLocationsByStartDate()[0],sortFilmingLocationsByStartDate()[sortFilmingLocationsByStartDate().length-1])


// 📝 TODO: Number of filming locations in 2020 only
// 1. Make the function return the number of filming locations in 2020 only
// 2. Log the result
function getFilmingLocationsNumber2020 () {
	const result = []
	for(let pas =0; pas<filmingLocations.length; pas++)
	{
		if(new Date(filmingLocations[pas].fields.date_debut).getFullYear() == new Date('2020-01-01').getFullYear())
			result.push(filmingLocations[pas])
	}
	return result
}
console.log(`There is ${getFilmingLocationsNumber2020().length} filming locations in Paris in 2020`)

// 📝 TODO: Number of filming locations per year
// 1. Implement the function, the expected result is an object with years as
// keys and filming locations number as value, e.g:
//    const filmingLocationsPerYear = {
//      '2020': 1234,
//      '2021': 1234,
//    }
// 2. Log the result
function getFilmingLocationsNumberPerYear () {
	const filmingLocationsPerYear = {'2021' : 0, '2020' : 0, '2019' : 0, '2018' :0, '2017': 0, '2016': 0}
	for(let pas =0; pas<filmingLocations.length; pas++)
	{
		const annee = new Date(filmingLocations[pas].fields.date_debut).getFullYear().toString()
		filmingLocationsPerYear[annee]++
	}
	return filmingLocationsPerYear
}
console.log("Here is the number of film locations in Paris by year !")
console.log(getFilmingLocationsNumberPerYear())

// 📝 TODO: Number of filming locations by district (arrondissement)
// 1. Implement the function, the expected result is an object with
// district as keys and filming locations number as value, e.g:
//    const filmingLocationsPerDistrict = {
//      '75013': 1234,
//      '75014': 1234,
//    }
// 2. Log the result
function getFilmingLocationsNumberPerDistrict () {
	const filmingLocationsPerDistrict = {}
	for(let pas =0; pas<filmingLocations.length; pas++) {
		if(filmingLocationsPerDistrict[filmingLocations[pas].fields.ardt_lieu] == undefined){filmingLocationsPerDistrict[filmingLocations[pas].fields.ardt_lieu]=1}
		else {filmingLocationsPerDistrict[filmingLocations[pas].fields.ardt_lieu]++}
	}
	return filmingLocationsPerDistrict
}
console.log("Here is the number of film locations in Paris by district !")
console.log(getFilmingLocationsNumberPerDistrict())

// 📝 TODO: Number of locations per film, sorted in descending order
// 1. Implement the function, result expected as an array of object like:
//    const result = [{film: 'LRDM - Patriot season 2', locations: 12}, {...}]
// 2. Log the first and last item of the array
function getFilmLocationsByFilm () {
	const tab =[]
	for(let step=0;step<filmingLocations.length;step++){
		let element = tab.find(film => film.film == filmingLocations[step].fields.nom_tournage)
		let index = tab.indexOf(element)
		if(element == undefined){
			tab.push({"film" : filmingLocations[step].fields.nom_tournage, "locations" :1})
		}
		else{
			tab[index].locations++
		}
	}
	return tab.sort(function(a,b){return b.locations - a.locations})
}
console.log("Film avec le plus de lieux de tournages :",getFilmLocationsByFilm()[0],"\nFilm avec le moins de lieux de tournages :",getFilmLocationsByFilm()[getFilmLocationsByFilm().length-1])


// 📝 TODO: Number of different films
// 1. Implement the function
// 2. Log the result
function getNumberOfFilms() {
	const set = new Set()
	for(let pas =0; pas<filmingLocations.length; pas++)
	{
		set.add(filmingLocations[pas].fields.nom_tournage)
	}
	return set
}
console.log(`There is ${getNumberOfFilms().size} different films`)

// 📝 TODO: All the filming locations of `LRDM - Patriot season 2`
// 1. Return an array with all filming locations of LRDM - Patriot season 2
// 2. Log the result
function getArseneFilmingLocations () {
	let spot = []
	for(let step =0; step<filmingLocations.length;step++){
		if(filmingLocations[step].fields.nom_tournage == 'LRDM - Patriot season 2'){spot.push(filmingLocations[step].fields.adresse_lieu)}
	}
	return spot
}
console.log('Toutes les adresses des lieux de tournages de LRDM :', getArseneFilmingLocations())

// 📝 TODO: Tous les arrondissement des lieux de tournage de nos films favoris
//  (favoriteFilms)
// 1. Return an array of all the districts of each favorite films given as a
//    parameter. e.g. :
//    const films = { 'LRDM - Patriot season 2': ['75013'] }
// 2. Log the result
function getFavoriteFilmsLocations (favoriteFilmsNames) {
	const districtbyFavFilm = {}
	for(let pas =0; pas<filmingLocations.length; pas++) {
		let filmName = filmingLocations[pas].fields.nom_tournage
		if(favoriteFilmsNames.indexOf(filmName)>-1){
			let district =filmingLocations[pas].fields.ardt_lieu
			if(districtbyFavFilm[filmName] == undefined){
				districtbyFavFilm[filmName]=[district]
			}
			else{
				if(districtbyFavFilm[filmName].indexOf(district)<0){
					districtbyFavFilm[filmName].push(district)
				}
			}
		}
	}
	return districtbyFavFilm
}
const favoriteFilms =
	[
		'LRDM - Patriot season 2',
		'Alice NEVERS',
		'Emily in Paris',
	]
console.log(getFavoriteFilmsLocations(favoriteFilms))

// 📝 TODO: All filming locations for each film
//     e.g. :
//     const films = {
//        'LRDM - Patriot season 2': [{...}],
//        'Une jeune fille qui va bien': [{...}]
//     }
function getFilmingLocationsPerFilm () {
	const films = {}
	for(let pas =0; pas<filmingLocations.length;pas++){
		let filmName = filmingLocations[pas].fields.nom_tournage
			if(films[filmName] == undefined){
				films[filmName]=[filmingLocations[pas]]
			}
			else{
				films[filmName].push(filmingLocations[pas])
			}
	}
	return films
}

console.log("LOCATIONS PER FILMS\n", getFilmingLocationsPerFilm()[Object.keys(getFilmingLocationsPerFilm())[0]])
// 📝 TODO: Count each type of film (Long métrage, Série TV, etc...)
// 1. Implement the function
// 2. Log the result
function countFilmingTypes () {
	const typeofFilms = {}
	for(let pas =0; pas<filmingLocations.length; pas++) {
		if(typeofFilms[filmingLocations[pas].fields.type_tournage] == undefined){typeofFilms[filmingLocations[pas].fields.type_tournage]= new Set(); typeofFilms[filmingLocations[pas].fields.type_tournage].add(filmingLocations[pas].fields.nom_tournage) }
		else {typeofFilms[filmingLocations[pas].fields.type_tournage].add(filmingLocations[pas].fields.nom_tournage)}
	}
	for (const typeofFilm of Object.keys(typeofFilms)) {
		typeofFilms[typeofFilm] = typeofFilms[typeofFilm].size
	}
	return typeofFilms
}
console.log(countFilmingTypes())
// 📝 TODO: Sort each type of filming by count, from highest to lowest
// 1. Implement the function. It should return a sorted array of objects like:
//    [{type: 'Long métrage', count: 1234}, {...}]
// 2. Log the result

function sortedCountFilmingTypes () {
	const filmingType = countFilmingTypes()
	let sortedFilmingType = Object.keys(filmingType).map(function(key) {
		return {type : key, count : filmingType[key]};
	});
	sortedFilmingType = sortedFilmingType.sort(function(a,b){return b.count-a.count})
	return sortedFilmingType
}
console.log(sortedCountFilmingTypes())
/**
 * This arrow functions takes a duration in milliseconds and returns a
 * human-readable string of the duration
 * @param ms
 * @returns string
 */
const duration = (ms) => `${(ms/(1000*60*60*24)).toFixed(0)} days, ${((ms/(1000*60*60))%24).toFixed(0)} hours and ${((ms/(1000*60))%60).toFixed(0)} minutes`

// 📝 TODO: Find the filming location with the longest duration
// 1. Implement the function
// 2. Log the filming location, and its computed duration

function longestFilmingLocations(){
	let max =0
	let maxfilmingLocations={}
	for(let step =0; step<filmingLocations.length;step++)
	{
		const time = new Date(filmingLocations[step].fields.date_fin)-new Date(filmingLocations[step].fields.date_debut)
		if(time>max){max =time; maxfilmingLocations = filmingLocations[step]}
	}
	return maxfilmingLocations
}

console.log("The longest filming locations is", longestFilmingLocations().fields.adresse_lieu," with a duration of", duration(new Date(longestFilmingLocations().fields.date_fin)-new Date(longestFilmingLocations().fields.date_debut)))
// 📝 TODO: Compute the average filming duration
// 1. Implement the function
// 2. Log the result


function averageDuration(){
	let sum =0
	for(let step =0; step<filmingLocations.length;step++) {
		sum += 	new Date(filmingLocations[step].fields.date_fin)-new Date(filmingLocations[step].fields.date_debut)
	}
	return duration(sum/filmingLocations.length)
}
console.log("La durée moyenne par lieu de tournage :",averageDuration())

