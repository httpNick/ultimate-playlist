var exp = require('express'),
    app = exp(),
    SpotifyApi = require('spotify-web-api-node'),
    secrets = require('./secrets.json'),
    passport = require('passport'),
    SpotifyStrat = require('passport-spotify').Strategy,
    clientid = secrets.clientid,
    clientsecret = secrets.clientsecret;


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

passport.use(new SpotifyStrat({
    clientID : clientid,
    clientSecret : clientsecret,
    callbackURL : "http://localhost:8080"
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(() => {
            return done(null, profile);
        });
    }
));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/spotify',
    passport.authenticate('spotify', {scope: ['user-read-private', 'user-read-email'], showDialog: true}),
    (req, res) => {}
);

app.get('/login', (req, res) => {
});

var server = app.listen(8080, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("listening on http://%s:%s", host, port);
});