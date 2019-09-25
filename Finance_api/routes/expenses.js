import express from 'express';
const router = express.Router();
import Expenses from '../models/expenses';

// Create a new expenses
router.post('/expenses/create', async (req, res, next) => {
    try{
        let exp = await Expenses.create(req.body);
        res.status(200).send(exp);
    }catch(e){
        next(e);
    };
});

module.exports = router;