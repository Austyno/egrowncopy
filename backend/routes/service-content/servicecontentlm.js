const router = require('express').Router();
let LMS = require('../../models/service-content/servicecontentLM.model');


router.route('/add').post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const is_published = req.body.is_published;
    const date_to_publish = Date.parse(req.body.date_to_publish);
    const media = req.body.media;
    const admin_id = req.body.admin_id

    const newServiceContent = new LMS({ title, content, is_published, date_to_publish,media,admin_id });

    newServiceContent.save()
        .then(lms => res.json(lms))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/').get((req, res) => { 
    LMS.find().sort({ createdAt: -1 })
        .then(lm => res.json(lm))
        .catch(err => res.status(400).json('Error '+ err))
});

router.route('/notification').post((req, res) => {
    const lastLogin = req.body.lastLogin;
    LMS.find({
        createdAt: {
            $gte: lastLogin
        }
    }).sort({ cratedAt: -1 })
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;