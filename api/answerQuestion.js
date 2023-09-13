const express = require('express');
const router = express.Router();
const getNlpResponse = require('./helpers/getNlpReponse');
const handleQuery = require('./helpers/handleQuery');

async function askQuestion(question) {
    const response = getNlpResponse(question);
    const answer = await handleQuery(response);
}

router.route('/api/answer-question').post(async (req, res) => {
    const { question } = req.body;
    console.log('The question is:', question);
    const answer = await askQuestion(question);
    console.log('The answer is:', answer);

    res.status(200).json({ answer: 'We processed that question', isSuccess: true });
});

module.exports = router;