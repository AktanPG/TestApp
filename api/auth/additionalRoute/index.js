const router = require('express').Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');

const Users = require('../../../db/models/user');

// Auth
router.post('/check', async(req, res) => {

    //Get jwt secret key from privet.key
    const key = JSON.parse(fs.readFileSync('private.key')).jwt;

    //Verify
    jwt.verify(req.session.token, key, (err, payload) => {
        if(err) {
            return res.json({auth: false});
        }

        res.status(200).json({auth: true})
    });

});

//Logout
router.post('/logout', (req, res) => {
    req.session.token = null;
    res.status(200).json({logout: true});
});

module.exports = router;