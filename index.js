import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import router from "./router.js";
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import jwt from  'jsonwebtoken';
import secret from "./config.js";
import axios from 'axios';

//STEAM
import passport from 'passport';
import session from 'express-session';
import passportSteam from 'passport-steam';
const generateAccessToken = (steamid, favHeroes)=>{
    const payload = {
        steamid,
        favHeroes,
    }    
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

const PORT = 5000;
const PORT_8080 = 8080;
const DB_URL = `mongodb+srv://1virusafw1:Storm228322S@cluster1.wxnlurr.mongodb.net/?retryWrites=true&w=majority`;
const app = express();




//STEAM
var SteamStrategy = passportSteam.Strategy;

// Required to get data from user for sessions
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
done(null, user);
});
// Initiate Strategy
passport.use(new SteamStrategy({
returnURL: 'http://localhost:' + PORT + '/api/auth/steam/return',
realm: 'http://localhost:' + PORT + '/',
apiKey: 'D1893E0A93FA327C5D749D6B9303C05E'
}, function (identifier, profile, done) {
    console.log("identifier " + identifier);
    console.log("profile " + JSON.stringify(profile));
    console.log("done " + done);

    process.nextTick(function () {
    profile.identifier = identifier;
    return done(null, profile);
    });
}
));
app.use(session({
secret: 'Whatever_You_Want',
saveUninitialized: true,
resave: false,
cookie: {
    maxAge: 3600000
}
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

// CORS middleware
app.use(function(req, res, next) {
    //res.header("Access-Control-Allow-Origin", "http://localhost:8080"); 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));
app.use('/api', router);
// app.use(cors(corsOptions));//Должно вклчить корс 07.04.2023

app.post('/api/steam/user', (req, res) => {
    console.log("req.body " + JSON.stringify(req.body));
    console.log("req.body.token " + req.body.token);
    axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=D1893E0A93FA327C5D749D6B9303C05E&steamids=${req.body.token}`)
      .then((response) => {
        // Отправляйте ответ на клиент, содержащий информацию о пользователе
        res.send({ user: response.data.response.players[0] });
    });
});




// Routes STEAM
app.get('/', (req, res) => {
    console.log("req.user " + JSON.stringify(req.user));
    res.send(req.user);
});
app.get('/api/auth/steam', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
    //res.redirect('/')
    res.redirect('http://localhost:8080');
});
app.get('/api/auth/steam/return', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
    //res.redirect('/')
    //console.log("req.user " + JSON.stringify(req.user));
    //console.log("req.body.token " + req.body.token);
    //console.log("req.user.steamid " + req.user._json.steamid);
    const token = generateAccessToken(req.user._json.steamid, [1,2]);
    res.cookie('tokenSteam', token,{httpOnly: false});
    res.cookie('sessionIDsteam', req.sessionID,{httpOnly: true});
    res.redirect('http://localhost:8080');
});



app.get('/', (req, res) => {
    res.status(200).json('Сервер работает');    
})



async function startApp(){
    try{
        console.log("trying to connect");
        await mongoose.connect(DB_URL, {useUnifiedTopology:true, useNewUrlParser: true});
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));
    }
    catch(e){
        console.log(e);
    }
}

startApp();

//mongodb+srv://1virusafw1:<password>@cluster1.wxnlurr.mongodb.net/?retryWrites=true&w=majority