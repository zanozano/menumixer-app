const express = require('express');
const router = express.Router();
const { verifyToken, validateAccount } = require('../../auth');

router.get('/', (req, res) => {
    try {
        res.render('Home', validateAccount);
    } catch (error) {
        handleError(res, error);
    }
});

router.get('/login', (req, res) => {
    try {
        res.render('Login', { layout: 'verify' });
    } catch (error) {
        handleError(res, error);
    }
});

router.get('/signup', (req, res) => {
    try {
        res.render('Signup', { layout: 'verify' });
    } catch (error) {
        handleError(res, error);
    }
});

router.get('/orders/new', verifyToken, (req, res) => {
    try {
        res.render('NewOrder', validateAccount);
    } catch (error) {
        handleError(res, error);
    }
});

router.get('/orders/:id', verifyToken, (req, res) => {
    try {
        res.render('Orders', validateAccount);
    } catch (error) {
        handleError(res, error);
    }
});

router.get('/orders/rectify/:id', verifyToken, (req, res) => {
    try {
        res.render('Rectify', validateAccount);
    } catch (error) {
        handleError(res, error);
    }
});

router.get('/orders/detail', (req, res) => {
    try {
        res.render('Detail', validateAccount);
    } catch (error) {
        handleError(res, error);
    }
});

router.get('/no_auth', (req, res) => {
    try {
        res.render('Auth', { layout: 'verify' });
    } catch (error) {
        handleError(res, error);
    }
});

router.get('*', (req, res) => {
    try {
        res.render('Error', { layout: 'verify' });
    } catch (error) {
        handleError(res, error);
    }
});

function handleError(res, error) {
    console.error(`Error: ${error}`);
    res.status(500).send({
        error: `Something went wrong... ${error}`,
        code: 500,
    });
}

module.exports = router;
