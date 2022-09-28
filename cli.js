#!/usr/bin/env node

//help stuff
show_help () {
  printf -- "Usage: $0 [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE\n"
  printf -- "\n"
  printf -- "  -h\t\tShow this help message and exit.\n"
  printf -- "  -n, -s\tLatitude: N positive; S negative.\n"
  printf -- "  -e, -w\tLongitude: E positive; W negative.\n"
  printf -- "  -z\t\tTime zone: uses /etc/timezone by default.\n"
  printf -- "  -d 0-6\tDay to retrieve weather: 0 is today; defaults to 1.\n"
  printf -- "  -v\t\tVerbose output: returns full weather forecast.\n"
  printf -- "  -j\t\tEcho pretty JSON from open-meteo API and exit.\n"
	exit 0	
}

//require moment-timezone
const moment-timezone = require('moment-timezone');

//import moment from the package
const timezone = moment.tz.guest();

//URL builder
getdata () {
	  curl -s -G \
	    -d "latitude=${LAT}" \
	    -d "longitude=${LONG}" \
	    -d "daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_hours,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant" \
	    -d "current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch" \
	    -d "timezone=${TZ}" \
	    https://api.open-meteo.com/v1/forecast
}
//fetch API call
const tz = "America/New_York"

const latitude = "35.875"

const longitude = "-79"

const base_url = ''https://api.open-meteo.com/v1/forecast"

const data_string = "latitude=" + latitude + "&longitude=" + longitude +"&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_hours,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=" + tz

const url = base_url + "?" + data_string

const response = await fetch( url )

const data = await response.json()

console.log( url )

console.log( data )

//response text
const days = args.d

if (days == 0) {
	console/log("today.")
} else if (days > 1) {
	console.log("in " + days + " days.")
} else {
	console.log("tomorrow.")
}
