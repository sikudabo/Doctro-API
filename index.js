const cerebrum = require('cerebrum.js');
const fs = require('fs');
const rdfStore = require('rdfstore');
const CoreNlp = require('corenlp');

const handleQuery = async (questionType) => {
    
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
}

const newCerebrum = new cerebrum();

const dataset = [
    {
      intent: "bot.whatiscovid",
      utterances: ["what is covid", "what is covid-19", "define covid", "define covid-19", "covid definition", "what is the definition of covid", "how would you define covid-19"],
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
        utterances: ["what type of disease is covid 19", "what type of disease is covid-19", "what kind of disease is covid", "which category of disease is covid", "what kind of disease is covid-19", "what type of disease is a coronavirus"],
        answers: [
          "covid symptoms"
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
    const response = await getResponse('What are the symptoms of covid 19');
    await handleQuery(response);
}

setTimeout(askQuestion, 1000);


