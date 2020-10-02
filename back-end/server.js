const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/shows', {
  useUnifiedTopology:true,
  useNewUrlParser: true
});


// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  title: String,
  urlImage:String,
  description:String,
  urlTrailer:String,
  category:String,

});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);
/*

*/
// Create a new item
app.post('/api/items', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    urlImage:req.body.urlImage,
    description:req.body.description,
    urlTrailer:req.body.description,
    category:req.body.category
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    console.log("error de get")
  }
});

//Try to Get a show
app.get('/api/items/:id', async (req, res) => {
  try {
    let item = await Item.findOne({
      _id: req.params.id
      });
    return res.send({item});

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//delete show 
app.delete('/api/items/:id',async(req,res)=> {
  try{
    await Item.deleteOne({
    _id: req.params.id
  }); 
  res.sendStatus(200);
    } catch(error){
      console.log(error);
      res.sendStatus(500);
    }
});

//Edit a show
app.put('/api/items/:id',async(req,res)=> {
    try{
    let item = await Item.findOne({
    _id: req.params.id
  }); 
  await item.save();
  res.send(item);
  } catch(error){
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
