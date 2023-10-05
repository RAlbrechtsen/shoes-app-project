const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Shoe = require('./models/shoe')


const app = express();

// connect mongo db
const dbURI = 'mongodb+srv://ralbrechtsen93:xcXiwjQNmVi1dTAc@cluster0.z937adl.mongodb.net/shoeapp?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000), console.log('Connected to db'))
    .catch((err) => console.log(err))

// view engine
app.set('view engine', 'ejs');




// middleware and static files (css and such)

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))



app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

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

app.get('/add-shoe', (req, res) => {
    res.render('add-shoe', { title: 'Create a new shoe' });
  });

app.post('/all-shoes', (req, res) => {
    const shoe = new Shoe(req.body)

    shoe.save()
        .then((result) => {
            res.redirect('/all-shoes');
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/', (req, res) => {
    res.render('index', {title: 'Home'})
})