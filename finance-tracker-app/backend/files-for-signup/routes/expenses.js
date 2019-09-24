import express from 'express';
const router = express.Router();
const Expenses = require('../models/expenses');

// Create a new expenses
router.post('/expenses/create', async (req, res, next) => {
    try{
        let exp = await Expenses.create(req.body);
        res.status(200).send(exp);
    }catch(e){
        next(e);
    };
});