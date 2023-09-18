const cerebrum = require('cerebrum.js');
const dataset = require('./dataset');


const nlpModel = new cerebrum();

/* nlpModel.trainCerebrum(dataset).then(c => {
    console.log(c);
});*/


module.exports = nlpModel;