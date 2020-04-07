const router = require('express').Router();
let EFAS = require('../../models/service-content/servicecontentEFA.model');


router.route('/add').post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const is_published = req.body.is_published;
    const date_to_publish = req.body.date_to_publish == null ? null : Date.parse(req.body.date_to_publish);
    const media = req.body.media;



    const newServiceContent = new EFAS({ title, content, is_published, date_to_publish, media });

    newServiceContent.save()
        .then(efas => res.json(efas))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/').get((req, res) => {
    EFAS.find().sort({ createdAt: -1 })
        .then(efa => res.json(efa))
        .catch(err => res.status(400).json('Error ' + err))
});

router.route('/notification').post((req, res) => {
    const lastLogin = req.body.lastLogin;
    EFAS.find({
        createdAt: {
            $gte: lastLogin
        }
    }).sort({ cratedAt: -1 })
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;