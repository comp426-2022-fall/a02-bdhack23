#!/usr/bin/env node

//imports
import moment from "moment-timezone";
import fetch from "node-fetch";

//help stuff
const args = process.argv.slice(2);

if(args[0] == '-h'){
	console.log("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE")
	console.log( "-h           Show this help message and exit.")
	console.log("-n, -s        Latitude: N positive; S negative.")
	console.log("-e, -w        Longitude: E positive; W negative.")
	console.log("-z            Time zone: uses tz.guess() from moment-timezone by default.")
	console.log("-d 0-6        Day to retrieve weather: 0 is today; defaults to 1.")
	console.log("-j            Echo pretty JSON from open-meteo API and exit.")
	process.exit(0)
}

//fetch API call and URL Building
//const tz = args.z 
//moment.tz.guess()
let tz = args.z; 
if(tz == null){
	tz = moment.tz.guess();
}

const latitude = "35"

const longitude = "-79"

// const url = "https://api.open-meteo.com/v1/forecast?" + "latitude=" + latitude + "&longitude=" + longitude +"&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_hours,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=" + tz 
const url = "https://api.open-meteo.com/v1/forecast?" + "latitude=" + latitude + "&longitude=" + longitude + "&daily=precipitation_sum&timezone=" + tz;
      
const response = await fetch( url )

const data = await response.json()

console.log( url )

console.log( data )

//response text
const days = args.d || 1;
//data.daily.precipitation_hours[days] == 0
if (days == 0) {
	if (data.daily.precipitation_sum[0] > 0) {
		process.stdout.write("You will not need your galoshes")
	} else {
		process.stdout.write("You might need your galoshes")
	}
	process.stdout.write(" today.")
	process.exit(0)
} else if (days > 1) {
	if (data.daily.precipitation_sum[days] > 0) {
		process.stdout.write("You will not need your galoshes")
	} else {
		process.stdout.write("You might need your galoshes")
	}
	process.stdout.write(" in" + days + " days")
	process.exit(0)
} else {
	if (data.daily.precipitation_sum[1] > 0) {
		process.stdout.write("You will not need your galoshes")
	} else {
		process.stdout.write("You might need your galoshes")
	}
	process.stdout.write(" tomorrow.")
	process.exit(0)
}
	
