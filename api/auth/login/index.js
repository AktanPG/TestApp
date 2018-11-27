const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const Users = require('../../../db/models/user');
const Validator = require('../Validator');
const { unexpectedError, createToken } = require('../helper');

// Login

router.post('/', async(req, res) => {
    const { email, password } = req.body;

    // Validation
    if(Validator.init(email).isEmail()) {
        if(Validator.init(password).LengthMore(5)) {
            // Handle errors with try - catch
            try {
                
                //Get user from DB
                const user = await Users.findOne({email});

                //Check for existence 
                if(email) {

                    // Compare hashed password with inputed password
                    const isMatch = bcrypt.compareSync(password, user.password);

                    //Check
                    if(isMatch) {

                        //Create token with payload
                        const token = createToken({id: user._id});

                        //Save to sessions
                        req.session.token = token;

                        res.status(200).json({login: true});
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

module.exports = router;