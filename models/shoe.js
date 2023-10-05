const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shoeSchema = new Schema({
    brand: {
        type: String,
        require: true
    },
    model: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: false
    },
});


const Shoe = mongoose.model('Shoe', shoeSchema);

module.exports = Shoe;