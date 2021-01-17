const ToDo = require('./models/todomodel')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', async (req, res) => {
   const todos = await ToDo.findAll();
   res.json({data: todos});
});

app.post('/', async (req, res) => {
    // ToDo.sync({ force: true })
    let { name } = req.body;
    if(!name){
        res.status(400).json({text : 'name is empty'});
        return
    }
    const todo = await ToDo.create({ name: name, status: false });
    res.json(todo);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});

module.exports = app;