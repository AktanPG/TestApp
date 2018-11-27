const router = require('express').Router();
const cloudinary = require('cloudinary');
const fs = require('fs');

const Users = require('../../db/models/user');
const { decodeJwt, multer } = require('../../helper');

router.post('/profile', async(req, res) => {

    const payload = decodeJwt(req.session.token);

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

router.post('/avatar', multer.single('avatar'), (req, res) => {
    cloudinary.config({
        cloud_name: 'grami',
        api_key: '966272348285316',
        api_secret: 'gqvP_uCAQXVYf79PwcwXGrdr5yk'
    });

    cloudinary.v2.uploader.upload('public/uploads/' + req.file.filename, (err, result) => {
        if(err) {
            res.status(500).json({avatar: false});
        } else {
            fs.unlinkSync('public/uploads/' + req.file.filename);

            const id = decodeJwt(req.session.token).id;

            Users.findByIdAndUpdate(id, {$set: {avatar: result.secure_url}})
                .then(updated => {
                    res.status(200).json({avatar: result.secure_url});
                })
                .catch(error => {
                    res.status(500).json({avatar: false});
                });
        }
    });
});

module.exports = router;