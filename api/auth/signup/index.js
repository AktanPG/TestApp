const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Users = require('../../../db/models/user');
const Validator = require('../Validator');
const { unexpectedError } = require('../helper');

router.post('/', async(req, res) => {
    const { email, password, name } = req.body;

    // Validation
    if(Validator.init(email).isEmail()) {
        if(Validator.init(password).LengthMore(5)) {
            if(Validator.init(name).LengthMore(4)) {
                
                //Handle errors
                try {

                    //Get user for check
                    const user = await Users.findOne({email});
                
                    //Check for existence
                    if(user) {
                        return res.status(412).json({
                            signup: false, massage: "Email already exist"
                        }); 
                    }

                    // Hash password
                    const salt = bcrypt.genSaltSync(10);
                    const hashedPassword = bcrypt.hashSync(password, salt);

                    //Handle errors
                    try {
                        //Save new User
                        const newUser = await new Users({
                            name, email, password: hashedPassword
                        }).save();

                        res.status(200).json({
                            signup: true
                        });

                    } catch (error) {
                        unexpectedError(res, error);    
                    }

                } catch (error) {
                    unexpectedError(res, error);
                }

            } else {
                res.json({signup: false, massage: 'Name must be at least 5 characters'});
            }
        } else {
            res.json({signup: false, massage: 'Password must be at least 6 characters'});
        }
    } else {
        res.json({signup: false, massage: 'Invalid email address'})
    }
});

module.exports = router;