const router = require('express').Router();
let Question = require('../../models/questions/question');

router.route('/add').post((req, res) => {
    const excercise_id = req.body.excercise_id;
    const question = req.body.question;
    const answer = req.body.answer;
    const correct_ans = req.body.correct_ans;
    const score = req.body.score;

    const newQ = new Question({ excercise_id, question, answer, correct_ans, score}); 

    newQ.save()
        .then((sub) => res.json(sub))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.route(`/:id`).post((req, res) => {
    Question.find(
        {excercise_id: req.params.id},   
    ).then((question) => {
        res.json(question);
    })
    .catch((err) => { res.json('Qustion not Found'); })
})


module.exports = router;