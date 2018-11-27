const router = require('express').Router();
const cloudinary = require('cloudinary');
const fs = require('fs');

const Users = require('../../db/models/user');
const { decodeJwt, multer } = require('../../helper');


//Route for send profile
router.post('/profile', async(req, res) => {

    // decode JWT and get payload
    const payload = decodeJwt(req.session.token);
    
    // check payload
    if(payload) {
       
        //Handle errors
        try {

            //Get profile from DB
            const profile = await Users.findById(payload.id);

            //Check for existence
            if(profile) {
                res.status(200).json({profile: {
                    name: profile.name,
                    email: profile.email,
                    avatar: profile.avatar,
                    id: profile._id
                }});
            } else {
                res.json({
                    profile: false, 
                    massage: 'Not found'
                });
            }
        
        } catch (error) {
            console.log(error);
            
            res.json({profile: false, error: true});
        }

    } else {
        res.json({profile: false, massage: 'Token expired'});
    }
    
});

//Route to change profile`s avatar
router.post('/avatar', multer.single('avatar'), (req, res) => {
    // Cloudinary config
    cloudinary.config({
        cloud_name: 'grami',
        api_key: '966272348285316',
        api_secret: 'gqvP_uCAQXVYf79PwcwXGrdr5yk'
    });

    //Connect and upload image to cloud
    cloudinary.v2.uploader.upload('public/uploads/' + req.file.filename, (err, result) => {
        if(err) {
            res.json({avatar: false});
        } else {
            //Remove image from public/uploads
            fs.unlinkSync('public/uploads/' + req.file.filename);

            //Decode and get id from payload
            const id = decodeJwt(req.session.token).id;

            //Update profile avatar`s src
            Users.findByIdAndUpdate(id, {$set: {avatar: result.secure_url}})
                .then(updated => {
                    res.status(200).json({avatar: result.secure_url});
                })
                .catch(error => {
                    res.json({avatar: false});
                });
        }
    });
});

module.exports = router;