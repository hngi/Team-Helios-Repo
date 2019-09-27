const express = require('express');
const router = express.Router();
const Expenses = require('../models/expenses');

// Create a new expenses
router.post('/expenses/create', async (req, res, next) => {
    try{
        req.body.user = req.user.id;
        req.body.amount = parseInt(req.body.amount);
        await Expenses.create(req.body);
        req.flash('success_msg', 'Record has been created successfully');
        return res.redirect('back');
    }catch(e){
        next(e);
    };
});

// Edit an expense
router.post('/expenses/edit', async (req, res, next) => {
    await Expenses.updateOne({_id: req.body.expenseId}, req.body);
    req.flash('success_msg', 'Expense has been updated successfully');
    return res.redirect('back');
});

// Delete an expense
router.post('/expenses/delete', async (req, res, next) => {
    await Expenses.deleteOne({_id: req.body.expenseId});
    req.flash('success_msg', 'Expense has been deleted successfully');
    return res.redirect('back');
});

module.exports = router;