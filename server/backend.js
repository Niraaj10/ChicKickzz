const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookiePar = require('cookie-parser');
require('dotenv').config();
const fileUpload = require('express-fileupload');

const app = express();

// app.use(cors({
//     origin: 'http://localhost:3000', // frontend URL
//     methods: 'GET,POST,PUT,DELETE',
//     credentials: true
// }));

app.use(cors({
    // origin: process.env.CLIENT_URL || 'http://localhost:3000',
    // origin: 'http://localhost:3000',
    origin: 'https://chickickzz.netlify.app',
    credentials: true
}));

app.use(express.json());
app.use(cookiePar());
// app.use(fileUpload())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("SERVER IS RUNNING.....")
})

app.get('/', (req,res) => {
    res.json({"msg" : "Exampleeeeeeeee testingggg"})
})


//Routes
app.use('/user',require('./routes/useRouter'))
app.use('/api',require('./routes/categoryRoutes'))
app.use('/api',require('./routes/productRoutes'))
app.use('/api',require('./routes/upload'))


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




// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const fileUpload = require('express-fileupload');
// const path = require('path');
// require('dotenv').config();

// const app = express();

// // Middleware
// console.log(process.env.CLIENT_URL);

// app.use(cors({
//     origin: process.env.CLIENT_URL || 'http://localhost:3000', // Frontend URL from environment variable
//     methods: 'GET,POST,PUT,DELETE',
//     credentials: true
// }));

// app.use(express.json());
// app.use(cookieParser());
// app.use(fileUpload({
//     useTempFiles: true,
//     tempFileDir: '/tmp/'
// }));

// // Routes
// // app.use('/api/user', require('./routes/useRouter')); // Updated to be under /api
// // app.use('/api/categories', require('./routes/categoryRoutes')); // More descriptive route
// // app.use('/api/products', require('./routes/productRoutes')); // More descriptive route
// // app.use('/api/upload', require('./routes/upload')); // More descriptive route
// app.use('/user',require('./routes/useRouter'))
// app.use('/api',require('./routes/categoryRoutes'))
// app.use('/api',require('./routes/productRoutes'))
// app.use('/api',require('./routes/upload'))



// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send({ message: 'Something went wrong!' });
// });

// // Connect to MongoDB
// const URI = process.env.MONGODB_URL;
// mongoose.connect(URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log("MongoDB is connected..."))
// .catch(err => console.error(err));

// // Start the server
// const PORT = process.env.PORT || 5000;
// if (process.env.NODE_ENV !== 'production') {
//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}...`);
//     });
// }


