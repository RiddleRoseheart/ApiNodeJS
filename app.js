// Express documentatie

const express = require('express')
const mongoose = require('mongoose')
const Object = require('./models/object')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.get('/', (request, res)=>{
    res.send('Hello, welcome to the API!')
})

app.get('/objects/:id', async(req, res)=>{
    try{
const objects = await Object.find({});
res.status(200).json(objects);
    }catch(error){
        res.status(500).json({error: 'Internal Server Error',message: error.message})
    }
})






app.get('/objects/:id', async(req, res)=>{
    try{
        const {id}= req.params;
        const object = await Object.findById();
        if (!item) {
            return res.status(404).json({ error: 'Not Found', message: `No item with ID ${id}` });
        }
        res.status(200).json(item);
    }catch(error) {
        res.status(500).json({error: 'Internal Server Error',message: error});
}});

app.post('/objects', async(req, res)=>{
    try{

        const object = await Object.create(req.body)
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
            return res.status(404).json({ error: 'Not Found', message: `No item with ID ${id}` });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});


app.delete('/objects/:id', async(req, res)=>{
    try{
        const{id} = req.params;
        const deletedObject = await Object.findByIdAndDelete(id);
        if(!deletedObject){
            return res.status(404).json({error: 'Not Found',message:'cant find object with following id ${id}'})

    }res.status(200).json(deletedObject);
}
catch(error){
        res.status(500).json({error: 'Internal Server Error', message: error.message})
            
        }});



    
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