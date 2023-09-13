const fs = require('fs');
const rdfStore = require('rdfstore');

const handleQuery = async (questionType) => {
    console.log('The question type is:', questionType);
    
    if (questionType === 'covid definition') {
        rdfStore.create((err, store) => {
            if (err) {
                console.log('Error:', err.message);
                return;
            }
        
            const rdf = fs.readFileSync(__dirname + '../../rdf-store/covid-19.ttl').toString();
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
                    return results[0].description.value;
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
        
            const rdf = fs.readFileSync(__dirname + '../../rdf-store/covid-19.ttl').toString();
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
                    return results[0].discoveredDate.value;
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
        
            const rdf = fs.readFileSync(__dirname + '../../rdf-store/covid-19.ttl').toString();
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
                    return myStrings.toString().replaceAll(',', ', ') + '.';
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
        
            const rdf = fs.readFileSync(__dirname + '../../rdf-store/covid-19.ttl').toString();
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
                    return finalResult;
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
        
            const rdf = fs.readFileSync(__dirname + '../../rdf-store/covid-19.ttl').toString();
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
                    return response;
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
        
            const rdf = fs.readFileSync(__dirname + '../../rdf-store/covid-19.ttl').toString();
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
                    return result;
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
        
            const rdf = fs.readFileSync(__dirname + '../../rdf-store/covid-19.ttl').toString();
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
                    return result;
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
        
            const rdf = fs.readFileSync(__dirname + '../../rdf-store/covid-19.ttl').toString();
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
                    return result;
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
        
            const rdf = fs.readFileSync(__dirname + '../../rdf-store/covid-19.ttl').toString();
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
                    return result;
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
        
            const rdf = fs.readFileSync(__dirname + '../../rdf-store/covid-19.ttl').toString();
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

                    return myStrings.toString().replaceAll(',', ', ');
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
        
            const rdf = fs.readFileSync(__dirname + '../../rdf-store/covid-19.ttl').toString();
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
                    return answer;
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
        
            const rdf = fs.readFileSync(__dirname + '../../rdf-store/covid-19.ttl').toString();
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
                    return answer;
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
        
            const rdf = fs.readFileSync(__dirname + '../../rdf-store/covid-19.ttl').toString();
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
                    return answer;
                });
            });
        });
        return;
    }

    return "no answer found";
}