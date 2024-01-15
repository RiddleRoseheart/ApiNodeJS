// Express documentatie

const express = require('express')
const mongoose = require('mongoose')
const Object = require('./models/object')
const Author = require('./models/author');
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.get('/', (request, res)=>{
    res.send('Hello, welcome to the API!')
})

app.get('/objects', async(req, res)=>{
    try{
const objects = await Object.find({});
res.status(200).json(objects);
    }catch(error){
        res.status(500).json({error: 'Internal Server Error',message: error.message})
    }
})

app.get('/objects/search/:title', async(req, res)=>{
    try{
        const { title } = req.params;
        const objects = await Object.find({ title });
        res.status(200).json(objects);
    }catch(error){
        res.status(500).json({error: 'Internal Server Error',message: error.message})
    }
})


app.get('/objects/:id', async(req, res)=>{
    try{
        const {id}= req.params;
        const object = await Object.findById(id);
        if (!object) {
            return res.status(404).json({ error: 'Not Found', message: `No Book with ID ${id}` });
        }
        res.status(200).json(object);
    }catch(error) {
        res.status(500).json({error: 'Internal Server Error',message: error});
}});

app.post('/objects', async(req, res)=>{
    try{

        const object = await Object.create(req.body);
        res.status(201).json(object);
    }catch(error){
        console.log(error.message);
        res.status(500).json({error: 'Internal Server Error', message: error.message});
    }
});



app.put('/objects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedObject = await Object.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedObject) {
            return res.status(404).json({ error: 'Not Found', message: `No BOOK with ID ${id}` });
        }
        res.status(200).json(updatedObject);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});


app.delete('/objects/:id', async(req, res)=>{
    try{
        const{id} = req.params;
        const deletedObject = await Object.findByIdAndDelete(id);
        if(!deletedObject){
            return res.status(404).json({error: 'Not Found',message:'cant find book with following id ${id}'})

    }res.status(200).json(deletedObject);
}
catch(error){
        res.status(500).json({error: 'Internal Server Error', message: error.message})
            
        }});

//pagination
app.get('/objects', async(req, res)=>{
    try{
        const { limit = 10, offset = 0 } = req.query;
        const objects = await Object.find().skip(parseInt(offset)).limit(parseInt(limit));
        res.status(200).json(objects);
    }catch(error){
        res.status(500).json({error: 'Internal Server Error',message: error.message})
    }
});


app.get('/objects/search', async(req, res)=>{
    try{
        const { q} = req.query;
        const objects = await Object.find({ $or: [{ title: q }, { author: q }] });
        res.status(200).json(objects);
    }catch(error){
        res.status(500).json({error: 'Internal Server Error',message: error.message})
    }
 });
    ///////////////////////////////////////////////// 


    // HERE WE HAVE THE CRUD OPERATIONS FOR OUR AUTHORS!!!!!


    app.post('/authors', async (req, res) => {
        try {
            const author = await Author.create(req.body);
            res.status(201).json(author);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    });
    app.get('/authors', async (req, res) => {
        try {
            const authors = await Author.find({});
            res.status(200).json(authors);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    });

    
app.get('/authors/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const author = await Author.findById(id);
        if (!author) {
            return res.status(404).json({ error: 'Not Found', message: `No author with ID ${id}` });
        }
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

app.put('/authors/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAuthor = await Author.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedAuthor) {
            return res.status(404).json({ error: 'Not Found', message: `No author with ID ${id}` });
        }
        res.status(200).json(updatedAuthor);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

app.delete('/authors/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAuthor = await Author.findByIdAndDelete(id);
        if (!deletedAuthor) {
            return res.status(404).json({ error: 'Not Found', message: `No author with ID ${id}` });
        }
        res.status(200).json(deletedAuthor);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});








app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
   })

mongoose.connect('mongodb+srv://Koko:Lol123@cluster0.ksclk6k.mongodb.net/nodeJs?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('connected')
    app.listen(3000, ()=>{
        console.log('listening on port 3000')
        }); // we hear port 3000
}).catch((error)=>{
    console.error('Error connecting to MongoDB:', error);
});