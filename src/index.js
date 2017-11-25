var config = require("./config");
var Twitter = require("twitter");

var client = new Twitter({
	consumer_key: config.twitter.CONSUMER_KEY,
	consumer_secret: config.twitter.CONSUMER_SECRET,
	access_token_key: config.twitter.ACCESS_TOKEN_KEY,
	access_token_secret: config.twitter.ACCESS_TOKEN_SECRET
});

let TWEET_EVERY_X_MINUTES = 30;

let months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
let days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

// create new date
var date = new Date();

if (date.getMinutes() % TWEET_EVERY_X_MINUTES === 0) {
	let time = (date.getHours() < 10 ? "0" : "") + date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
	let dayWord = days[date.getDay()];
	let day = (date.getDate() < 10 ? "0" : "") + date.getDate();
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
