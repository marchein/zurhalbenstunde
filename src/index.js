var config = require("./config");
var Twitter = require("twitter");

var client = new Twitter({
	consumer_key: config.twitter.CONSUMER_KEY,
	consumer_secret: config.twitter.CONSUMER_SECRET,
	access_token_key: config.twitter.ACCESS_TOKEN_KEY,
	access_token_secret: config.twitter.ACCESS_TOKEN_SECRET
});

let months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
let days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

// create new date
var date = new Date();

if (date.getMinutes() === 0 || date.getMinutes() === 30) {
	let time = date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
	let dayWord = days[date.getDay()];
	let day = date.getDate();
	let year = date.getFullYear();
	let month = months[date.getMonth()];

	let newTweet = "Es ist jetzt " + time + " Uhr am " + dayWord + ", den " + day + ". " + month + " " + year + ".";

	client.post("statuses/update", {
		status: newTweet
	}, function (error, tweet, response) {
		if (error) {
			throw error;
		}
		console.log(tweet);
		console.log(response);
	});
}
