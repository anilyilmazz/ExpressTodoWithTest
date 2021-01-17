const ToDo = require('./models/todomodel')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({data: 'Hello world'});
});

app.get('/add', (req, res) => {
  res.json({Açıklama: 'send post'});
});

app.post('/', async (req, res) => {
    // ToDo.sync({ force: true })
    const jane = await ToDo.create({ name: "Jane", status: false });
    let { data } = req.body;
    res.json({text: jane});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});

module.exports = app;