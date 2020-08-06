const express = require('express');

const router = express.Router();

router.get('/', function (req, res) {
    res.render('index');
});

router.get('/err', function (req, res) {
    throw new Error('generate error');
});

module.exports = router;