const router = require('express').Router();
const fs = require('fs');
const cloudinary = require('cloudinary');

const Offers = require('../../db/models/offer');
const Users = require('../../db/models/user');
const {decodeJwt, multer} = require('../../helper');

cloudinary.config({ 
    cloud_name: 'grami', 
    api_key: '966272348285316', 
    api_secret: 'gqvP_uCAQXVYf79PwcwXGrdr5yk' 
});

router.post('/all', async(req, res) => {
    try {
        const offers = await Offers.find({});
        res.json({offers});
    } catch (error) {
        console.log(error);
        res.json({offers: false, massage: 'Error, Try again later'});
    }
});

router.post('/', async(req, res) => {
    const {id} = helper.decodeJwt(res.cookie.mplaceToken);

    try {
        const offers = await Offers.find({creater: id});
        res.json({offers})
    } catch (error) {
        console.log(error);
        res.json({offers: false, massage: 'Error, Try again later'});
    }
    
});

router.post('/create', multer.array('images'), async(req, res) => {
    const {seller, cost, phone, description, includeEmail, title} = req.body;

    const tokenPayload = decodeJwt(res.cookie.mplaceToken);
    
    if(tokenPayload) {
        const {id, email, userName} = tokenPayload;
        const images = [];

        for(let i = 0; i < req.files.length; i++) {
            try {
                const result = await cloudinary.v2.uploader.upload(
                    req.files[i].path,
                    {
                        crop: "thumb", width: 320, height: 240
                    },
                );
    
                fs.unlinkSync(req.files[i].path, (err) => {
                    if(err) return console.log(err);
                });
    
                const image = {
                    src: result.secure_url,
                    publicId: result.public_id
                };
    
                images.push(image);
            } catch (error) {
                console.log(error);
                res.json({created: false, massage: 'Error, try again later'});
            }
        }
        
        try {
            const newOffer = await new Offers({
                images, creater: id, seller: userName, cost, phone, 
                description, email: includeEmail ? email : null,
                title
            }).save();
    
            res.json({created: true, offer: newOffer});
        } catch (error) {
            console.log(error);
            res.json({created: false, massage: 'Error, try again later'});
        }
    } else {
        res.json({created: false, massage: 'Token expired'})
    }
});

router.post('/remove', async(req, res) => {
    const {id} = req.body;
    
    try {
        const removedOffer = await Offers.findByIdAndRemove(id);

        for(let i = 0; i < removedOffer.images.length; i++) {
            cloudinary.api.delete_resources(removedOffer.images[i].publicId, (err, result) => {
                if(err) return console.log(err);
            });
        }

        res.json({removed: true});
    } catch (error) {
        console.log(error);
        res.json({removed: false, massage: "Something went wrong"});
    }
});

module.exports = router;