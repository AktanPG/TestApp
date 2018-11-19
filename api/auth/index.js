const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const helper = require('./authHelper');

const Users = require('../../db/models/user');

router.post('/register', async(req, res) => {
    const {userName, email, password} = req.body;

    if(helper.checkName(userName, res, true) && helper.checkEmail(email, res, true) && helper.checkPassword(password, res, true)) {
        try {
            const user = await Users.findOne({email});

            if(!user) {
                bcrypt.genSalt(10, (err, salt) => {
                    if(err) return console.log(err);

                    bcrypt.hash(password, salt, async function(err, hash) {
                        if(err) return console.log(err);

                        try {
                            const newUser = await new Users({userName, email, password: hash}).save();   

                            res.json({register: true});
                        } catch (error) {
                            console.log(error);
                            res.json({register: false, massage: "Something went wrong. Please try again later"});
                        }

                    });
                });
            } else {
                res.json({register: false, massage: "Email already exist"});
            }
        } catch (error) {
            console.log(error);
            res.json({register: false, massage: "Something went wrong. Please try again later"});
        }
    }
});

router.post('/login', async(req, res) => {
    const { email, password } = req.body;

    if(helper.checkEmail(email, res, false) && helper.checkPassword(password, res, false)) {
        try {
            const user = await Users.findOne({email});
        
            if(user) {
                const isMatch = bcrypt.compareSync(password, user.password);

                if(isMatch) {
                    jwt.sign(
                        {id: user._id, userName: user.userName},
                        require('../../config.json').jwtKey,
                        {expiresIn: 60 * 60 * (24 * 5)},
                        (err, token) => {
                            req.session.mplaceToken = token;
                            res.json({login: true});
                        }
                    );
                }
            } else {
                res.json({login: false, massage: "Email does not exist"});
            }
        } catch (error) {
            console.log(error);
            res.json({login: false, massage: "Something went wrong. Please try again later"});
        }
    } 
});

router.post('/check', (req, res) => {
    if(req.session.mplaceToken) {
        jwt.verify(req.session.mplaceToken, require('../../config.json').jwtKey, (err, payload) => {
            if(err) {
                res.json({auth: false});
            } else {
                res.json({auth: true});
            }
        });
    } else {
        res.json({auth: false});
    }
});

module.exports = router;