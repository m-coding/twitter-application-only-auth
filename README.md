# Twitter Application Only Authentication Demo

Twitter supports application-only authentication giving apps the ability to issue authenticated requests on behalf of the application itself without authenticating the specific user.

## Requirements

1. **npm** (node package manager) – the default package manager for the JavaScript runtime environment [**Node.js**](https://nodejs.org)
  * Check they are properly installed: `node -v` and `npm -v`
2. [**request**](https://www.npmjs.com/package/request) –  Simplified HTTP request client.

## Build
1. Navigate to the project directory and run the command: `npm install`
  * Check that `nodes_modules` folder was created.

## How To

### Step 1: Create a Twitter Application
1. Login into your Twitter account or create a new one.
2. Go to [apps.twitter.com](https://apps.twitter.com/).
3. Click [Create New App](https://apps.twitter.com/app/new).
4. Fill in the application details.
5. Make note of the **Consumer Key** and **Consumer Secret**.

### Step 2: Create a [Bearer](https://dev.twitter.com/oauth/application-only) token
```javascript
/*** create-twitter-bearer-token.js ***/
var request = require('request');
var consumer_key = 'CONSUMER_KEY';
var consumer_secret = 'CONSUMER_SECRET';
var encode_secret = new Buffer(consumer_key + ':' + consumer_secret).toString('base64');

var options = {
    url: 'https://api.twitter.com/oauth2/token',
    headers: {
        'Authorization': 'Basic ' + encode_secret,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    body: 'grant_type=client_credentials'
};

request.post(options, function(error, response, body) {
    console.log(body); // <<<< This is your BEARER TOKEN !!!
});
```
In your terminal, run the following command: `node create-twitter-bearer-token.js` or whatever file you named.

You now have a bearer token which allows you to make application-only API requests to many of the different REST resources that Twitter offers: https://dev.twitter.com/rest/public.

Once you got your bearer token, it will be valid for the life of your application unless you [invalidate](https://dev.twitter.com/oauth/reference/post/oauth2/invalidate/token) it.

### Step 3: Authenticate API requests with the Bearer token
Woo hoo! Now you can make Twitter API requests by using regular 'GET' calls. Also, be sure to check the [rate limits](https://dev.twitter.com/rest/public/rate-limits).

```javascript
/*** test-nodejs.js ***/
var request = require("request");
var twitter_api = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
var bearer_token = TWITTER_BEARER_TOKEN; // the token you got in the last step

var options = {
    method: 'GET',
    url: twitter_api,
    qs: {
        "screen_name": "twitterapi"
    },
    json: true,
    headers: {
        "Authorization": "Bearer " + bearer_token
    }
};

request(options, function(error, response, body) {
  console.dir(body);
});
```
