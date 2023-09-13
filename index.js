const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const http = require('http');
const logger = require('morgan');
const cerebrum = require('cerebrum.js');
const fs = require('fs');
const rdfStore = require('rdfstore');

app.set('appName', 'DoctroAPI');
app.set('port', process.env.PORT || 3001);

app.use(cookieParser());
app.use(logger('dev'));
app.use(errorHandler());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(({ extended: true })));
app.use(cors());

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

    if (questionType === 'continent least deaths') {
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
                               SELECT ?regionLeastDeaths WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbo:regionLeastDeaths ?regionLeastDeaths .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].regionLeastDeaths.value;
                    const result = `${answer} is the region with the least Covid-19 deaths since the pandemic began.`;
                    console.log(result);
                });
            });
        });
        return;
    }

    if (questionType === 'other names') {
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
                               SELECT ?otherName WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid foaf:otherName ?otherName .
                               }
                `;
                store.execute(query, (success, results) => {
                    let myStrings = [];

                    results.forEach((otherName) => {
                        myStrings.push(otherName.otherName.value);
                    });

                    console.log('Other names for covid-19 are', myStrings.toString().replaceAll(',', ', '));
                });
            });
        });
        return;
    }

    if (questionType === 'mild illness') {
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
                               SELECT ?mildSymptomsPercentage WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbo:mildSymptomsPercentage ?mildSymptomsPercentage .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = `Covid-19 symptoms are mild ${results[0].mildSymptomsPercentage.value} of the time.`;
                    console.log(answer);
                });
            });
        });
        return;
    }

    if (questionType === 'severe illness') {
        console.log('I am being hit');
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
                               SELECT ?severeSymptomsPercentage WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbo:severeSymptomsPercentage ?severeSymptomsPercentage .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = `Covid-19 symptoms are severe in ${results[0].severeSymptomsPercentage.value} of cases.`;
                    console.log(answer);
                });
            });
        });
        return;
    }

    if (questionType === 'critical illness') {
        console.log('I am being hit');
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
                               SELECT ?criticalSymptomsPercentage WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbo:criticalSymptomsPercentage ?criticalSymptomsPercentage .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = `Covid-19 symptoms are crtical in ${results[0].criticalSymptomsPercentage.value} of cases.`;
                    console.log(answer);
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
    {
        intent: "bot.leastDeathsByRegion",
        utterances: ["which contenent has the fewest deaths", "which area has the fewest deaths", "which reigion has the fewest covid-19 deaths", "which region has the least covid-19 deaths", "which country has the least covid-19 deaths", "who has the least covid-19 deaths", "does africa have the least covid-19 deaths", "where have their been the fewest covid deaths", "where have their beeen the fewest deaths from covid-19", "which continent has the least covid-19 deaths", "which country has the least covid-19 cases", "which area has the fewest covid-19 cases"],
        answers: [
          "continent least deaths",
        ],
    },
    {
        intent: "bot.otherNames",
        utterances: ["what are other names for covid-19", "what are other names for covid 19", "other names for covid", "what are other names for covid", "synonyms for covid-19", "alternative names for covid", "other names for sar-cov-2", "other names for sars cov-2", "other names for 2019-nCoV", "synonyms for sars cov-2", "what are other names for the wuhan virus", "is wuhan virus a name for covid-19", "nicknames for covid-19", "what nicknames does covid-19 have", "which other names does covid-19 have", "what are other names for covid", "what are other names for caronovirus"],
        answers: [
          "other names",
        ],
    },
    {
        intent: "bot.mildSymptomPercentage",
        utterances: ["what percentage of the time are covid cases minor", "how often is covid not that serious", "how common are mild cases of covid", "how often are cases not that serious", "what are the chances a covid case will not be serious", "what percentage of people develop mild symptoms", "what % of people develop minor symptoms", "what are the odds of having mild symptoms", "how many people only have mild symptoms", "how many people have mild symptoms", "how often are covid cases mild or minor", "is it common to only have mild symptoms from covid", "how likely is it to have mild symptoms", "how common is it to only have mild symptoms", "is it probable to only have mild symptoms", "what percentage of the population has mild symptoms", "how many patients have mild symptoms", "how often is covid-19 mild", "how likely is it symptoms are mild if you get sick", "what are the odds a covid-19 case will be mild", "what are the chances covid will be mild", "what are the odds a covid case will be mild", "likelihood of mild illness", "what is the likelihood of mild illness", "what is the probability of mild illness", "is it common for covid symptoms to not be serious"],
        answers: [
          "mild illness",
        ],
    },
    {
        intent: "bot.severeSymptomPercentage",
        utterances: ["what percentage of the time are covid cases severe", "how often is covid serious", "how common are severe cases of covid", "how often are cases serious", "what are the chances a covid case will be serious", "what percentage of people develop severe symptoms", "what % of people develop servere symptoms", "what are the odds of having servere symptoms", "how many people have servere symptoms", "how many people have servere symptoms", "how often are covid cases servere", "is it common to only have servere symptoms from covid", "how likely is it to have servere symptoms", "how common is it to have servere symptoms", "is it probable to severe symptoms", "what percentage of the population has servere symptoms", "how many patients have servere symptoms", "how often is covid-19 servere", "how likely is it symptoms are servere if you get sick", "what are the odds a covid-19 case will be severe", "what are the chances covid will be severe", "what are the odds a covid case will be severe", "likelihood of severe illness", "what is the likelihood of servere illness", "what is the probability of servere illness", "is it common for covid symptoms to be severe"],
        answers: [
          "severe illness",
        ],
    },
    {
        intent: "bot.criticalaSymptomPercentage",
        utterances: ["what percentage of the time are covid cases critical", "how often is covid critical", "how common are critical cases of covid", "how often are cases critical", "what are the chances a covid case will be critical", "what percentage of people develop critical symptoms", "what % of people develop critical symptoms", "what are the odds of having crtical symptoms", "how many people have critical symptoms", "how many people have critical symptoms", "how often are covid cases critical", "is it common to only have critical symptoms from covid", "how likely is it to have critical symptoms", "how common is it to have critical symptoms", "is it probable to crtical symptoms", "what percentage of the population has critical symptoms", "how many patients have critical symptoms", "how often is covid-19 critical", "how likely is it symptoms are critical if you get sick", "what are the odds a covid-19 case will be critical", "what are the chances covid will be crtical", "what are the odds a covid case will be crtical", "likelihood of crtical illness", "what is the likelihood of critical illness", "what is the probability of critical illness", "is it common for covid symptoms to be crtical"],
        answers: [
          "critical illness",
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
    const response = await getResponse('how often is covis critical');
    await handleQuery(response);
}

setTimeout(askQuestion, 1000);


