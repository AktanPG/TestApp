const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const Users = require('../../db/models/user');
const Validator = require('./Validator');
const { unexpectedError } = require('./helper');

router.post('/register', async(req, res) => {
    const { email, password, name } = req.body;

    if(Validator.init(email).isEmail().LengthMore(0)) {
        if(Validator.init(password).LengthMore(5)) {
            if(Validator.init(name).LengthMore(4)) {
                
                try {
                    const user = await Users.findOne({email});
                
                    if(user) {
                        return res.status(412).json({
                            signup: false, massage: "Email already exist"
                        }); 
                    }

                    const salt = bcrypt.genSaltSync(20);
                    const hashedPassword = bcrypt.hashSync(salt, password);

                    try {
                        
                    } catch (error) {
                        unexpectedError(res, error);    
                    }

                } catch (error) {
                    unexpectedError(res, error);
                }

            } else {
                res.status(401).json({signup: false, massage: 'Name must be at least 5 characters'});
            }
        } else {
            res.status(401).json({signup: false, massage: 'Password must be at least 6 characters'});
        }
    } else {
        res.status(401).json({signup: false, massage: 'Invalid email address'})
    }
});

module.exports = router;