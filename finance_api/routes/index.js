import express from 'express';
const router = express.Router();

// Get index page
router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/register', (req, res, next) => {
    res.render('sign-up');
});

router.get('/faq', (req, res, next) => {
    res.render('faq');
});

router.get('/home', (req, res, next) => {
    res.render('home');
})

module.exports = router;