import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import router from "./router.js";
import fileUpload from 'express-fileupload';


const PORT = 5000;
const DB_URL = `mongodb+srv://1virusafw1:Storm228322S@cluster1.wxnlurr.mongodb.net/?retryWrites=true&w=majority`;
const app = express();

// CORS middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));
app.use('/api', router);
// app.use(cors(corsOptions));//Должно вклчить корс 07.04.2023




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