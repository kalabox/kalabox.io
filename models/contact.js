// Init wrapper
var nimble = new Nimble({
    appId: '59fhxr68p7ydnpux2yz35ko7awbx2fv52dzq4',
    appSecret: '6syf4joh6vtpzv013ur'
});


// Init wrapper
var nimble = new Nimble({
    appId: 'your_app_id',
    appSecret: 'your_app_secret'
});


app.get('/nimble/authorization', function(req, res) {
    res.redirect(nimble.getAuthorizationUrl({redirect_uri: 'your_redirect_uri'}));
});


// You must make sure that the wrapper is using for requesting the access token the SAME
// redirect_uri provided for getAuthorizationUrl, either by using the same wrapper or by
// providing the redirect_uri in the wrapper constructor if you are using a new object for requestToken.

app.get('/nimble/authorization_callback', function(req, res) {
  if(!req.query.error) {
    nimble.requestToken(req.query.code, function(err, access_token, refresh_token, result) {
      res.send('You are now authenticated! -> ' + access_token);
    });
  } else {
    res.send('Error authenticating!!! -> ' + err);
  }
});

exports.create = function()