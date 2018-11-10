const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    res.send('All is ok');
});

module.exports = router;