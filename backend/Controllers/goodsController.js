const db = require('../database')
const allProducts = ( req,res) => {
    // res.send('Hello')
    const itemsList = (db.items.list());
    res.json(db.items.list());
}
module.exports={allProducts}