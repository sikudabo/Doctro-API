const fs = require('fs');
const rdfStore = require('rdfstore');

const handleQuery = async (questionType, res) => {
    console.log('The question type is:', questionType);

    if (questionType === 'covid definition') {
       
        rdfStore.create(async (err, store) => {

            if (err) {
                console.log('Error:', err.message);
                res.status(200).json({ answer: 'There was an error retreiving that answer. Please try again', isSuccess: false });
            }

            const rdf = fs.readFileSync(__dirname + '/covid-19.ttl').toString();
            await store.load('text/turtle', rdf, async (s, d) => {
                const query = `PREFIX foaf: <http://xmlns.com/foaf/0.1/>
                               PREFIX dbo: <http://www.w3.org/1999/02/22-rdf-syntax-ns/>
                               PREFIX dbr: <http://purl.org/dc/elements/1.1/>
                               SELECT ?description WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:description ?description .
                               }
                `;
                await store.execute(query, async (success, results) => {
                    console.log('current answer is:', results[0].description.value);
                    answer = await results[0].description.value;
                    res.status(200).json({ answer: answer, isSuccess: true, });
                });
            });
        });
    }

    else if (questionType === 'covid discovered date') {
        rdfStore.create((err, store) => {
            if (err) {
                console.log('Error:', err.message);
                res.status(200).json({ answer: 'There was an error retreiving that answer. Please try again', isSuccess: false });
            }
        
            const rdf = fs.readFileSync(__dirname + '/covid-19.ttl').toString();
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
                    const answer = results[0].discoveredDate.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    }

    else if (questionType === 'covid symptoms') {
        rdfStore.create((err, store) => {
            if (err) {
                console.log('Error:', err.message);
                res.status(200).json({ answer: 'There was an error retreiving that answer. Please try again', isSuccess: false });
            }
        
            const rdf = fs.readFileSync(__dirname + '/covid-19.ttl').toString();
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
                    const currentRes = results[0].symptom.value.split('/');
                    let myStrings = [];
                    results.forEach((rest, index) => {
                        const currentRes = rest.symptom.value.split('/');
                        const myRes = currentRes[currentRes.length - 1].replaceAll('_', ' ');
                        myStrings.push(myRes);
                    });
                    const answer = myStrings.toString().replaceAll(',', ', ') + '.';
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    }

    else if (questionType === 'type of disease') {
        rdfStore.create((err, store) => {
            if (err) {
                console.log('Error:', err.message);
                res.status(200).json({ answer: 'There was an error retreiving that answer. Please try again', isSuccess: false });
            }
        
            const rdf = fs.readFileSync(__dirname + '/covid-19.ttl').toString();
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
                    const answer = 'Covid 19 is a ' + result[result.length - 1].replace('_', ' ') + ' within the Coronavirus family' + '.';
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    }

    else if (questionType === 'where did covid start') {
        rdfStore.create((err, store) => {
            if (err) {
                console.log('Error:', err.message);
                res.status(200).json({ answer: 'There was an error retreiving that answer. Please try again', isSuccess: false });
            }
        
            const rdf = fs.readFileSync(__dirname + '/covid-19.ttl').toString();
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
                    const answer = `Covid 19 started in ${results[0].origination.value} on ${results[0].discoveredDate.value}.`;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    }

    else if (questionType === 'death toll') {
        rdfStore.create((err, store) => {
            if (err) {
                console.log('Error:', err.message);
                res.status(200).json({ answer: 'There was an error retreiving that answer. Please try again', isSuccess: false });
            }
        
            const rdf = fs.readFileSync(__dirname + '/covid-19.ttl').toString();
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
                    const answer = `${stringNum} have died from Covid-19 since 2019.`;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    }

    else if (questionType === 'total cases') {
        rdfStore.create((err, store) => {
            if (err) {
                console.log('Error:', err.message);
                res.status(200).json({ answer: 'There was an error retreiving that answer. Please try again', isSuccess: false });
            }
        
            const rdf = fs.readFileSync(__dirname + '/covid-19.ttl').toString();
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
                    const answer = `There have been ${stringNum} total Covid-19 cases since 2019.`;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    }

    else if (questionType === 'continent most deaths') {
        rdfStore.create((err, store) => {
            if (err) {
                console.log('Error:', err.message);
                res.status(200).json({ answer: 'There was an error retreiving that answer. Please try again', isSuccess: false });
            }
        
            const rdf = fs.readFileSync(__dirname + '/covid-19.ttl').toString();
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
                    res.status(200).json({ answer: result, isSuccess: true });
                });
            });
        });
        return;
    }

    else if (questionType === 'continent least deaths') {
        rdfStore.create((err, store) => {
            if (err) {
                console.log('Error:', err.message);
                res.status(200).json({ answer: 'There was an error retreiving that answer. Please try again', isSuccess: false });
            }
        
            const rdf = fs.readFileSync(__dirname + '/covid-19.ttl').toString();
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
                    res.status(200).json({ answer: result, isSuccess: true });
                });
            });
        });
        return;
    }

    else if (questionType === 'other names') {
        rdfStore.create((err, store) => {
            if (err) {
                console.log('Error:', err.message);
                res.status(200).json({ answer: 'There was an error retreiving that answer. Please try again', isSuccess: false });
            }
        
            const rdf = fs.readFileSync(__dirname + '/covid-19.ttl').toString();
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

                    const answer = myStrings.toString().replaceAll(',', ', ');
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    }

    else if (questionType === 'mild illness') {
        rdfStore.create((err, store) => {
            if (err) {
                console.log('Error:', err.message);
                res.status(200).json({ answer: 'There was an error retreiving that answer. Please try again', isSuccess: false });
            }
        
            const rdf = fs.readFileSync(__dirname + '/covid-19.ttl').toString();
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
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    }

    else if (questionType === 'severe illness') {
        console.log('I am being hit');
        rdfStore.create((err, store) => {
            if (err) {
                console.log('Error:', err.message);
                res.status(200).json({ answer: 'There was an error retreiving that answer. Please try again', isSuccess: false });
            }
        
            const rdf = fs.readFileSync(__dirname + '/covid-19.ttl').toString();
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
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    }

    else if (questionType === 'critical illness') {
        console.log('I am being hit');
        rdfStore.create((err, store) => {
            if (err) {
                console.log('Error:', err.message);
                res.status(200).json({ answer: 'There was an error retreiving that answer. Please try again', isSuccess: false });
            }
        
            const rdf = fs.readFileSync(__dirname + '/covid-19.ttl').toString();
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
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    }

    else if (questionType === 'asymptomatic illness') {
        rdfStore.create((err, store) => {
            if (err) {
                console.log('Error:', err.message);
                res.status(200).json({ answer: 'There was an error retreiving that answer. Please try again', isSuccess: false });
            }
        
            const rdf = fs.readFileSync(__dirname + '/covid-19.ttl').toString();
            store.load('text/turtle', rdf, (s, d) => {
                const query = `PREFIX foaf: <http://xmlns.com/foaf/0.1/>
                               PREFIX dbd: <https://www.doctro.com/ontology/>
                               PREFIX dbo: <http://www.w3.org/1999/02/22-rdf-syntax-ns/>
                               PREFIX dbr: <http://purl.org/dc/elements/1.1/>
                               SELECT ?asymptomaticPercentage WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbo:asymptomaticPercentage ?asymptomaticPercentage .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = `Close to ${results[0].asymptomaticPercentage.value} or 1 out of 3 people are asymptomatic after being infected with Covid-19.`;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    }

    else {
        res.status(200).json({ answer: 'I could not find an answer to that question', isSuccess: true });
    }
}

module.exports = handleQuery;