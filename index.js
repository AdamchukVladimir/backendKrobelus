import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import router from "./router.js";
import fileUpload from 'express-fileupload';
import cors from 'cors';

const PORT = 5000;
const DB_URL = `mongodb+srv://1virusafw1:Storm228322S@cluster1.wxnlurr.mongodb.net/?retryWrites=true&w=majority`;
const app = express();

app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));
app.use('/api', router);
app.use(cors());//Должно вклчить корс 07.04.2023


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