const nlpModel = require('../constants/nlpModel');


const getNlpResponse = async (question) => {
    const answer = await nlpModel.cerebrumReplay(question);
    return answer;
}

module.exports = getNlpResponse;
