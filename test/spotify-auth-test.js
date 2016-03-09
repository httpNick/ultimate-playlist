var SpotifyApi = require('spotify-web-api-node');
var secrets = require('../secrets.json');

var scopes = ['user-read-private', 'user-read-email']

var spotify = new SpotifyApi({
    redirectUri : 'http://localhost:8080/ex',
    clientId : secrets.clientid,
    clientSecret : secrets.clientsecret
});

var authorizeURL = spotify.createAuthorizeURL(scopes);

console.log(authorizeURL);