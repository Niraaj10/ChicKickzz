const express = require('express');
const mongoose = require('mongoose');
const cookiePar = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookiePar());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("SERVER IS RUNNING.....")
})

app.get('/', (req,res) => {
    res.json({"msg" : "Exampleeeeeeeee testingggg"})
})


//Routes
app.use('/user',require('./routes/useRouter'))


//connect to mongoDb
const URI = process.env.MONGODB_URL;
// console.log(URI)

mongoose.connect(URI,{
    // useCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("MongoDB is connected....")
}).catch(err => {
    console.log(err)
})

