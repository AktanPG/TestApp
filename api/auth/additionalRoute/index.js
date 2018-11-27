const router = require('express').Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');

const Users = require('../../../db/models/user');

router.post('/check', async(req, res) => {

    const key = JSON.parse(fs.readFileSync('private.key')).jwt;

    jwt.verify(req.session.token, key, (err, payload) => {
        if(err) {
            return res.status(401).json({auth: false});
        }

        res.status(200).json({auth: true})
    });

});

router.post('/logout', (req, res) => {
    req.session.token = null;
    res.status(200).json({logout: true});
});

module.exports = router;