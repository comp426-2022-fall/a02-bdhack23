#!/usr/bin/env node

//imports
import moment from "moment-timezone";
import fetch from "node-fetch";

//help stuff
const argv = process.argv.slice(2);

if(argv[0] == -h){
	console.log("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE")
	console.log( "-h           Show this help message and exit.")
	console.log("-n, -s        Latitude: N positive; S negative.")
	console.log("-e, -w        Longitude: E positive; W negative.")
	console.log("-z            Time zone: uses tz.guess() from moment-timezone by default.")
	console.log("-d 0-6        Day to retrieve weather: 0 is today; defaults to 1.")
	console.log("-j            Echo pretty JSON from open-meteo API and exit.")
	process.exit(0)
}

//timezone constant
const timezone = moment.tz.guest();

//fetch API call and URL Building
const tz = "America/New_York"

const latitude = "35"

const longitude = "-79"

const url = "https://api.open-meteo.com/v1/forecast?" + "latitude=" + latitude + "&longitude=" + longitude +"&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_hours,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=" + tz 

const response = await fetch( url )

const data = await response.json()

console.log( url )

console.log( data )

//response text
const days = 1

if (process.argv.indexOf('-d') > -1) {
	days = argv[process.argv.indexOf('-d') - 1];
}

if (days == 0) {
	if (data.daily.precipitation_hours[days] == 0) {
		console.log('You will not need your galoshes')
	} else {
		console.log('You might need your galoshes')
	}
	console.log(' today.')
	process.exit(0)
} else if (days > 1) {
	if (data.daily.precipitation_hours[days] == 0) {
		console.log('You will not need your galoshes')
	} else {
		console.log('You might need your galoshes')
	}
	console.log(' in' + days + ' days')
	process.exit(0)
} else if (days == 1) {
	if (data.daily.precipitation_hours[days] == 0) {
		console.log('You will not need your galoshes')
	} else {
		console.log('You might need your galoshes')
	}
	console.log(' tomorrow.')
	process.exit(0)
}
	
