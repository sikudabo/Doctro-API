const cerebrum = require('cerebrum.js');
const fs = require('fs');
const rdfStore = require('rdfstore');
const CoreNlp = require('corenlp');

const handleQuery = async (questionType) => {
    console.log('The question type is:', questionType);
    
    if (questionType === 'covid definition') {
        rdfStore.create((err, store) => {
            if (err) {
                console.log('Error:', err.message);
                return;
            }
        
            const rdf = fs.readFileSync(__dirname + '/rdf-store/covid-19.ttl').toString();
            store.load('text/turtle', rdf, (s, d) => {
                const query = `PREFIX foaf: <http://xmlns.com/foaf/0.1/>
                               PREFIX dbo: <http://www.w3.org/1999/02/22-rdf-syntax-ns/>
                               PREFIX dbr: <http://purl.org/dc/elements/1.1/>
                               SELECT ?description WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:description ?description .
                               }
                `;
                store.execute(query, (success, results) => {
                    console.log('The results are:', results[0].description.value);
                });
            });
        });
        return;
    }

    if (questionType === 'covid discovered date') {
        rdfStore.create((err, store) => {
            if (err) {
                console.log('Error:', err.message);
                return;
            }
        
            const rdf = fs.readFileSync(__dirname + '/rdf-store/covid-19.ttl').toString();
            store.load('text/turtle', rdf, (s, d) => {
                const query = `PREFIX foaf: <http://xmlns.com/foaf/0.1/>
                               PREFIX dbd: <https://www.doctro.com/ontology/>
                               PREFIX dbo: <http://www.w3.org/1999/02/22-rdf-syntax-ns/>
                               PREFIX dbr: <http://purl.org/dc/elements/1.1/>
                               SELECT ?discoveredDate WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbd:discoveredDate ?discoveredDate .
                               }
                `;
                store.execute(query, (success, results) => {
                    console.log('The results are:', results[0].discoveredDate.value);
                });
            });
        });
        return;
    }

    if (questionType === 'covid symptoms') {
        rdfStore.create((err, store) => {
            if (err) {
                console.log('Error:', err.message);
                return;
            }
        
            const rdf = fs.readFileSync(__dirname + '/rdf-store/covid-19.ttl').toString();
            store.load('text/turtle', rdf, (s, d) => {
                const query = `PREFIX foaf: <http://xmlns.com/foaf/0.1/>
                               PREFIX dbd: <https://www.doctro.com/ontology/>
                               PREFIX dbo: <http://www.w3.org/1999/02/22-rdf-syntax-ns/>
                               PREFIX dbr: <http://purl.org/dc/elements/1.1/>
                               SELECT ?symptom WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbo:symptom ?symptom .
                               }
                `;
                store.execute(query, (success, results) => {
                    const res = results[0].symptom.value.split('/');
                    let myStrings = [];
                    results.forEach((rest, index) => {
                        const currentRes = rest.symptom.value.split('/');
                        const myRes = currentRes[currentRes.length - 1].replaceAll('_', ' ');
                        myStrings.push(myRes);
                    });
                    console.log('Common Covid-19 symptoms are', myStrings.toString().replaceAll(',', ', ') + '.');
                    // console.log('The results are:', res[res.length - 1]);
                });
            });
        });
        return;
    }

    if (questionType === 'type of disease') {
        rdfStore.create((err, store) => {
            if (err) {
                console.log('Error:', err.message);
                return;
            }
        
            const rdf = fs.readFileSync(__dirname + '/rdf-store/covid-19.ttl').toString();
            store.load('text/turtle', rdf, (s, d) => {
                const query = `PREFIX foaf: <http://xmlns.com/foaf/0.1/>
                               PREFIX dbd: <https://www.doctro.com/ontology/>
                               PREFIX dbo: <http://www.w3.org/1999/02/22-rdf-syntax-ns/>
                               PREFIX dbr: <http://purl.org/dc/elements/1.1/>
                               SELECT ?type WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbo:type ?type .
                               }
                `;
                store.execute(query, (success, results) => {
                    const result = results[0].type.value.split('/');
                    const finalResult = 'Covid 19 is a ' + result[result.length - 1].replace('_', ' ') + ' within the Coronavirus family' + '.';
                    console.log('The result is:', finalResult);
                });
            });
        });
        return;
    }

    if (questionType === 'where did covid start') {
        rdfStore.create((err, store) => {
            if (err) {
                console.log('Error:', err.message);
                return;
            }
        
            const rdf = fs.readFileSync(__dirname + '/rdf-store/covid-19.ttl').toString();
            store.load('text/turtle', rdf, (s, d) => {
                const query = `PREFIX foaf: <http://xmlns.com/foaf/0.1/>
                               PREFIX dbd: <https://www.doctro.com/ontology/>
                               PREFIX dbo: <http://www.w3.org/1999/02/22-rdf-syntax-ns/>
                               PREFIX dbr: <http://purl.org/dc/elements/1.1/>
                               SELECT ?discoveredDate ?origination WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid foaf:origination ?origination .
                                 ?covid dbd:discoveredDate ?discoveredDate .
                               }
                `;
                store.execute(query, (success, results) => {
                    const response = `Covid 19 started in ${results[0].origination.value} on ${results[0].discoveredDate.value}.`;
                    console.log(response);
                });
            });
        });
        return;
    }
}

const newCerebrum = new cerebrum();

const dataset = [
    {
      intent: "bot.whatiscovid",
      utterances: ["what is covid", "what is covid-19", "define covid", "define covid-19", "covid definition", "what is the definition of covid", "how would you define covid-19", "what is sars cov-2", "how is sars cov-2 defined", "sars cov-2", "sarscov2", "sars cov 2"],
      answers: [
        "covid definition"
      ],
    },
    {
        intent: "bot.whenWasCovidDiscovered",
        utterances: ["when was covid-19 discovered", "when was covid discovered", "which date was covid discovered", "what time was covid-19 discovered", "when did we learn about covid-19", "when did we learn about covid", "on which date did we find out about covid"],
        answers: [
          "covid discovered date"
        ],
    },
    {
        intent: "bot.covidSymptoms",
        utterances: ["what are the symptoms of covid", "what are common covid-19 symptoms", "symptoms of covid-19", "covid symptoms",  "what are the main covid symptoms", "what are signs of i have covid", "signs i have covid-19"],
        answers: [
          "covid symptoms"
        ],
    },
    {
        intent: "bot.typeOfDisease",
        utterances: ["which category of disease is covid", "which category of diseases does covid fall within", "type of disease is covid", "kind of disease", "kind of disease is covid", "kind of disease is covid 19", "how would covid be classified", "what kind of disease is covid-19", "what type of disease if covid", "is covid-19 a respiratory disease", "covid-19 kind of disease", "how would we classify covid-19", "covid classification", "covid sars type of disease", "kind of disease", "what kind of disease"],
        answers: [
          "type of disease"
        ],
    },
    {
        intent: "bot.whereDidCovidStart",
        utterances: ['where did covid start', 'where did covid begin', 'which country did covid begin in', 'which country started covid 19', 'location covid start it', 'which city did covid start in', 'original city covid started in', 'covid city', 'covid-19 first city', 'which city did covid-19 start in', 'which city did covid-19 begin in', 'what city had the first case of covid-19', 'which city had the first covid case'],
        answers: [
          "where did covid start"
        ],
    },
];

const train = async () => {
    const response = await newCerebrum.trainCerebrum(dataset);
    return response;
};

train().then((v) => {
    if (v) {
       // console.log(v);
    }
});

const getResponse = async (question) => {
    const answer = await newCerebrum.cerebrumReplay(question);
    return answer;
}

const askQuestion = async () => {
    const response = await getResponse('where did covid 19 originate');
    await handleQuery(response);
}

setTimeout(askQuestion, 1000);


