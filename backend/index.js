import express from 'express';
import {PORT} from'./config.js';
import mongoose from 'mongoose';
import {MONGODBURL} from './config.js';
import {Book} from './models/bookModel.js';
import bookRoutes from './routes/bookRoutes.js';
import cors from "cors";

const app= express();

app.use(express.json());
//middleware
// app.use(cors());
app.use(
    cors({
        origin: 'http://localhost:5555',
        methods: ['GET','POST','PUT','DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);
app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send('Welcome to MERN Stack')

});
// app.get('/books',async(request,response)=>{
//     try{
//         const books = await Book.find({})
//         return response.status(201).send({
//             count:books.length,
//             data:books
//         });
//     }
//     catch(error){
//         console.log(error.message);
//         response.status(500).send({message:error.message});
//     }
// });

app.use('/books',bookRoutes);

mongoose.connect('mongodb://127.0.0.1/test')
// mongoose.connect(MONGODBURL)
.then(()=>{
    console.log('Database connected succesfully!');
    // app.listen
    app.listen(PORT,()=>{
        console.log(`App is running on port : ${PORT}`);
    });
    
})
.catch((error)=>{
    console.log(error);
})

