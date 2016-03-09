var exp = require('express');
var app = exp();
var SpotifyApi = require('spotify-web-api-node');
var secrets = require('./secrets.json');

app.get('/login', (req, res) => {

    var scopes = ['user-read-private', 'user-read-email'];
    var state = 'some-state';

    var spotify = new SpotifyApi({
        redirectUri : "http://localhost:8080",
        clientId : secrets.clientid,
        clientSecret : secrets.clientsecret
    });

    var authorizeURL = spotify.createAuthorizeURL(scopes, state);

    res.redirect(authorizeURL);
});

var server = app.listen(8080, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("listening on http://%s:%s", host, port);
});