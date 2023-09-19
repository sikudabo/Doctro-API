const express = require('express');
const router = express.Router();
const getNlpResponse = require('./helpers/getNlpReponse');
const handleQuery = require('./helpers/handleQuery');
const punctuationParser = require('./helpers/punctuationParser');

async function askQuestion(question, res) {
    const response = await getNlpResponse(question);
    const answer = await handleQuery(response, res);
    return answer;
}

router.route('/api/answer-question').post(async (req, res) => {
    console.log('Ask question is being hit');
    const { question } = req.body;
    const answer = await askQuestion(punctuationParser(question), res).then(result => {
        console.log('The ask question answer is:', result);
        return result;
    })
});

module.exports = router;