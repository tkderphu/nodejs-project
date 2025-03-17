const express = require('express')
const mongoose = require('mongoose')
const { Category } = require('./category')
const { Product } = require('./product')
const app = express()

app.use(express.json())

app.listen(3000, () => {
    console.log("start at port 3000")
})

app.post('/api/products', (req, res) => {
    const product = new Product({...req.body})
    product.save().then(resp => {
        console.log("d;")
        res.status(200).send(resp)
    }).catch(err => {
        
        res.status(500).send(err)
    })

})

app.get('/api/products', (req, res) => {
    Product.find({}).populate('category', 'name').then(resp => {
        res.status(200).send(resp)
    })
})
app.post('/api/categories', (req, res) => {
    const category = new Category({...req.body})
    category.save().then(resp => {
        res.status(200).send(resp)
    }).catch(err => {
        res.status(500).send(err)
    })
})



app.get('/', (req, res) => {
    res.send("hello world")
})

mongoose.connect('mongodb://localhost:27017/dcm', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(resp => {
    console.log('Connect mongodb successful')
}).catch(() => {
    console.log("connect failed")
})