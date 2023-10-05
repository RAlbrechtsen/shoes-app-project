const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Shoe = require('./models/shoe')


const app = express();

// connect mongo db
const dbURI = 'mongodb+srv://ralbrechtsen93:xcXiwjQNmVi1dTAc@cluster0.z937adl.mongodb.net/shoeapp?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(5000), console.log('Connected to db'))
    .catch((err) => console.log(err))

// view engine
app.set('view engine', 'ejs');




// middleware and static files (css and such)

app.use(express.static('public'));



app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

app.get('/add-shoe', (req, res) => {
    const shoe = new Shoe({
        brand: 'gregergre',
        model: 'test model 23',
        description: 'gejrioregiojreghij'
    });
    shoe.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/all-shoes', (req, res) => {
    Shoe.find()
        .then((result) => {
            res.render('all-shoes', {title: 'All shoes', shoes: result})
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/single-shoe', (req, res) => {
    Shoe.findById('651e0c23f436f32e01d27aaa')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })

})




app.get('/', (req, res) => {
    res.render('index', {title: 'Home'})
})



app.get('/create-shoes', (req, res) => {
    res.render('add-shoe', {title: 'Add a new shoe'})
})