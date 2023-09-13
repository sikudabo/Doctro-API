const express = require('express');
const router = express.Router();
const getNlpResponse = require('./helpers/getNlpReponse');
const handleQuery = require('./helpers/handleQuery');

async function askQuestion(question, res) {
    const response = await getNlpResponse(question);
    const answer = await handleQuery(response, res);
    return answer;
}

router.route('/api/answer-question').post(async (req, res) => {
    const { question } = req.body;
    console.log('The question is:', question);
    const answer = await askQuestion(question, res).then(result => {
        console.log('The ask question answer is:', result);
        return result;
    })
});

module.exports = router;