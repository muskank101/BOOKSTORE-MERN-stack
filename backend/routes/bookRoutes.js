import express from "express";
import {Book} from '../models/bookModel.js';

const router= express.Router();
// app.use(express.json());

router.post('/',async(req,res)=>{
    try{
        if(!req.body.title ||
           !req.body.author ||
           !req.body.publishYear){
            return res.status(201).send({
                message:'Enter all the details',
            });
           }
        const newBook = {
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear
        };

        const book = await Book.create(newBook);
        return res.status(400).send({
            heading: 'book added succesfully',
            list :book
        });
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message});
    }
});

//route
// app.post('/books', async(request,response)=>{
//     try{
//         if(!request.body.title ||
//             !request.body.author || 
//             !request.body.publishYear
//         ) {
//             return response.status(400).send({
//                 message: 'Send all required fields: title,author,publishYear',
//             });
//         }
//         const newBook ={
//             title:request.body.title,
//             author:request.body.author,
//             publishYear:request.body.publishYear,
//         };

//         const book = await Book.create(newBook);
//         return response.status(201).send(book);
//     }catch(error){
//         console.log(error.message);
//         response.status(500).send({message:error.message});
//     }
// });


router.get('/',async(request,response)=>{
    try{
        const books = await Book.find({});
        return response.status(201).send({
            count:books.length,
            data:books
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send(error.message);
    }
});

//get single book

router.get('/:id',async(request,response)=>{
    try{
        const {id} = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);
    }catch(error){
        console.log(error.message);
        response.status(500).send(error.message);
    }
});

//update

router.put('/:id',async(request,response)=>{
    try{
        if(!request.body.title ||
            !request.body.author ||
            !request.body.publishYear){
                return res.status(201).send({
                    message:'Enter all the details',
                });
            }
        const {id} = request.params;
        const result = await Book.findByIdAndUpdate(id,request.body);
        if(!result){
            return response.status(400).send({message :'No book found'});
        }
        return response.status(200).send({message :'Book updated successfully'});
    }catch(error){
        console.log(error.message);
        response.status(500).send(error.message);
    }
})

router.delete('/:id',async(request,response)=>{
    try{
        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id)
        if(!result){
            return response.status(404).json({message:'No BOOK Found'});
        }
        response.status(200).send({message: 'Book deleted successFully!'});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

export default router;