const nlpModel = require('../constants/nlpModel');
const dataset = require('../constants/dataset');

async function trainModel() {
    await nlpModel.trainCerebrum(dataset);
}

const getNlpResponse = async (question) => {
    console.log('Question');
    const answer = await nlpModel.cerebrumReplay(question);
    return answer;
}

setTimeout(trainModel, 1000);
module.exports = getNlpResponse;
