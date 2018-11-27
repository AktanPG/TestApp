const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const Users = require('../../../db/models/user');
const Validator = require('../Validator');
const { unexpectedError, createToken } = require('../helper');

router.post('/', async(req, res) => {
    const { email, password } = req.body;

    if(Validator.init(email).isEmail()) {
        if(Validator.init(password).LengthMore(5)) {
            
            try {
                
                const user = await Users.findOne({email});

                if(email) {

                    const isMatch = bcrypt.compareSync(password, user.password);

                    if(isMatch) {

                        const token = createToken({id: user._id});

                        res.status(200).json({login: true, token});

                    } else {
                        res.status(401).json({login: false, massage: "Incorrect password"});
                    }

                } else {
                    res.status(404).json({
                        login: false,
                        massage: 'Email does not exist'
                    });
                }

            } catch (error) {
                unexpectedError(res, error, false);
            }

        } else {
            res.status(401).json({login: false, massage: 'Password must be at least 6 characters'});
        }
    } else {
        res.status(401).json({login: false, massage: 'Invalid email address'})
    }
});

router.post('/check', async(req, res) => {

    const key = JSON.parse(fs.readFileSync('private.key')).jwt;

    jwt.verify(req.body.token, key, (err, payload) => {
        if(err) {
            return res.status(401).json({check: false});
        }

        res.status(200).json({check: true})
    });

});

module.exports = router;