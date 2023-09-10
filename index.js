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

    if (questionType === 'death toll') {
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
                               SELECT ?deathToll WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbo:deathToll ?deathToll .
                               }
                `;
                store.execute(query, (success, results) => {
                    const stringNum = results[0].deathToll.value;
                    const result = `${stringNum} have died from Covid-19 since 2019.`;
                    console.log(result);
                });
            });
        });
        return;
    }

    if (questionType === 'total cases') {
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
                               SELECT ?totalCases WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbo:totalCases ?totalCases .
                               }
                `;
                store.execute(query, (success, results) => {
                    const stringNum = results[0].totalCases.value;
                    const result = `There have been ${stringNum} total Covid-19 cases since 2019.`;
                    console.log(result);
                });
            });
        });
        return;
    }

    if (questionType === 'continent most deaths') {
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
                               SELECT ?regionMostDeaths WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbo:regionMostDeaths ?regionMostDeaths .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].regionMostDeaths.value;
                    const result = `${answer} is the region with the most Covid-19 deaths since the pandemic began.`;
                    console.log(result);
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
    {
        intent: "bot.totalDeaths",
        utterances: ["how many people have died from covid-19", "how many people have died from covid", "how many people have died from sars cov-2", "death toll", "what is the covid death toll", "total deaths from covid", "what is the amount of deaths from covid-19", "what is the amount of deaths from covid", "how many deaths from covid", "total deaths from covid", "covid-19 death toll", "covid-19 deaths total", "how many people have died from covid since the pandemic", "total number of covid deaths", "total number of deaths", "count of covid deaths", "how many have died from sars cov-2", "sars cov-2 death toll"],
        answers: [
          "death toll",
        ],
    },
    {
        intent: "bot.totalCases",
        utterances: ["how many times has covid-19 been diagnosed", "instances of covid", "instances of covid-19", "total cases", "how many covid-19 cases have their been", "total number of covid-19 cases", "covid 19 cases", "number of cases", "how many covid-19 cases have their been", "total number of sars cov-2 cases", "how many sars cov-2 cases", "total amount of confirmed cases", "how many covid-19 cases have their been", "total number of covid cases", "estimate of how many covid-19 cases there have been"],
        answers: [
          "total cases",
        ],
    },
    {
        intent: "bot.mostDeathsRegion",
        utterances: ["which region has the most covid deaths", "which content has the most covid deaths", "most covid deaths by region", "which region has the highest death toll", "highest death toll by region", "which continent has the most covid deaths", "most covid-19 deaths continent", "continent with most covid deaths", "highest covid deaths region", "continent with highest death toll"],
        answers: [
          "continent most deaths",
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
    const response = await getResponse('How many covid cases have their been since the pandemic began');
    await handleQuery(response);
}

setTimeout(askQuestion, 1000);


