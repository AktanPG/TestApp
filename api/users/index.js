const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Users = require('../../db/models/user');
const { decodeJwt } = require('../../helper');

router.post('/profile', async(req, res) => {
    
    const payload = decodeJwt(req.body.token);

    if(payload) {
       
        try {

            const profile = await Users.findById(payload.id);

            if(profile) {
                res.status(200).json({profile: {
                    name: profile.name,
                    email: profile.email,
                    avatar: profile.avatar,
                    id: profile._id
                }});
            } else {
                res.status(404).json({
                    profile: false, 
                    massage: 'Not found'
                });
            }
        
        } catch (error) {
            console.log(error);
            
            res.status(500).json({profile: false, error: true});
        }

    } else {
        res.status(401).json({profile: false, massage: 'Token expired'});
    }
    
});

module.exports = router;