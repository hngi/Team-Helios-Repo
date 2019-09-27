const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expensesSchema = new Schema({
    items : String,
    amount : Number,
    description : String,
    user : {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, {timestamps: true});

module.exports = mongoose.model('Expenses', expensesSchema);