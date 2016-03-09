var request = require("request");
var twitter_api = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
var bearer_token = TWITTER_BEARER_TOKEN; // the token you got in the last step

var options = {
    method: 'GET',
    url: twitter_api,
    qs: {
        "screen_name": "MGMGrand",
        "exclude_replies": true,
        "count": 1
    },
    json: true,
    headers: {
        "Authorization": "Bearer " + bearer_token
    }
};

request(options, function(error, response, body) {
  console.dir(body);
});

