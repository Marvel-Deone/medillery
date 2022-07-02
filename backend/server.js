const express = require('express')
const db = require('./database')
const app = express()
require('dotenv').config()
const cors = require('cors');
const routes  = require('./Routes/routes');

app.use(cors());
app.use('/api', routes)

app.get('/items/:id', (req, res)=> {    
    let item = db.items.get(req.params.id);
    console.log(item);
    res.send(item)
})

//PORT
app.listen(process.env.PORT, ()=> {
    console.log(`You're listening on port ${process.env.PORT}`);
})