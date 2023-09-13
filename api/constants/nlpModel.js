const cerebrum = require('cerebrum.js');
const dataset = require('./dataset');


const nlpModel = new cerebrum();

const train = async () => {
    const response = await nlpModel.trainCerebrum(dataset);
    return response;
};

train();

module.exports = nlpModel;