const nlpModel = require('../constants/nlpModel');

const getNlpResponse = async (question) => {
    console.log('Question');
    const answer = await nlpModel.cerebrumReplay(question);
    return answer;
}

module.exports = getNlpResponse;
