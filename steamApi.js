// Routes STEAM
router.get('/', (req, res) => {
    console.log("req.user " + JSON.stringify(req.user));
    res.send(req.user);
});
router.get('/api/auth/steam', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
    //res.redirect('/')
    res.redirect('http://localhost:8080');
});
router.get('/api/auth/steam/return', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
    //res.redirect('/')
    console.log("req.user " + JSON.stringify(req.user));
    console.log("req.body.token " + req.body.token);
    res.cookie('sessionIDsteam', req.sessionID,{httpOnly: true});
    res.redirect('http://localhost:8080');
});