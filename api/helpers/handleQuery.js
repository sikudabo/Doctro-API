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

    else if (questionType === 'can asymptomatic spread') {
        const answer = 'Yes, people who are asymptomatic can still spread Covid-19 to other individuals. Make sure to be safe around those you come in contact with including family, friends, schoolmates, co-workers, people with compromised immune systems and others.';
        res.status(200).json({ answer, isSuccess: true });
    } else if (questionType === 'onset period') {
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
                               SELECT ?diseaseOnset WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:diseaseOnset ?diseaseOnset .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].diseaseOnset.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    }

    else if (questionType === 'long covid defined') {
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
                               SELECT ?longCovidDescription WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:longCovidDescription ?longCovidDescription .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].longCovidDescription.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    }

    else if (questionType === 'pregnancy risk') {
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
                               SELECT ?pregnancyRisk WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:pregnancyRisk ?pregnancyRisk .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].pregnancyRisk.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    }

    else if (questionType === 'infection complications') {
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
                               SELECT ?complications WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:complications ?complications .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].complications.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } else if (questionType === 'liver risk') {
        const answer = '20 to 30% of people who are infected with Covid-19 have elevated Liver enzymes, reflecting liver injury';
        res.status(200).json({ answer, isSuccess: true });
    } 

    else if (questionType === 'covid cause') {
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
                               SELECT ?cause WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:cause ?cause .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].cause.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else if (questionType === 'transmission') {
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
                               SELECT ?transmission WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:transmission ?transmission .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].transmission.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else if (questionType === 'entry points') {
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
                               SELECT ?entryPoints WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:entryPoints ?entryPoints .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].entryPoints.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else if (questionType === 'infectiousness') {
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
                               SELECT ?infectiousness WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:infectiousness ?infectiousness .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].infectiousness.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else if (questionType === 'outside viral destruction') {
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
                               SELECT ?outsideViralDestruction WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:outsideViralDestruction ?outsideViralDestruction .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].outsideViralDestruction.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else if (questionType === 'covid bats') {
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
                               SELECT ?covidBats WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:covidBats ?covidBats .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].covidBats.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } else if (questionType === 'what is a variant') {
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
                               SELECT ?whatIsAVariant WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:whatIsAVariant ?whatIsAVariant .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].whatIsAVariant.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } else if (questionType === 'organ most effected') {
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
                               SELECT ?lungImpact WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:lungImpact ?lungImpact .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].lungImpact.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else if (questionType === 'organs impacted') {
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
                               SELECT ?organsImpacted WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:organsImpacted ?organsImpacted .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].organsImpacted.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else if (questionType === 'respiratory impact') {
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
                               SELECT ?respiratoryImpact WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:respiratoryImpact ?respiratoryImpact .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].respiratoryImpact.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else if (questionType === 'nervous system impact') {
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
                               SELECT ?nervousSystemImpact WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:nervousSystemImpact ?nervousSystemImpact .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].nervousSystemImpact.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else if (questionType === 'brain impact') {
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
                               SELECT ?brainImpact WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:brainImpact ?brainImpact .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].brainImpact.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else if (questionType === 'gastrointestinal impact') {
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
                               SELECT ?gastroIntestinalImpact WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:gastroIntestinalImpact ?gastroIntestinalImpact .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].gastroIntestinalImpact.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else if (questionType === 'spike protein defined') {
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
                               SELECT ?spikeProteinDefinition WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:spikeProteinDefinition ?spikeProteinDefinition .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].spikeProteinDefinition.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else if (questionType === 'diagnosing covid') {
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
                               SELECT ?covidDiagnosis WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:covidDiagnosis ?covidDiagnosis .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].covidDiagnosis.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else if (questionType === 'covid prevention') {
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
                               SELECT ?covidPrevention WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:covidPrevention ?covidPrevention .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].covidPrevention.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else if (questionType === 'vaccine question') {
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
                               SELECT ?vaccinatedQuestion WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:vaccinatedQuestion ?vaccinatedQuestion .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].vaccinatedQuestion.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else if (questionType === 'recommended vaccines') {
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
                               SELECT ?recommendedVaccines WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:recommendedVaccines ?recommendedVaccines .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].recommendedVaccines.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else if (questionType === 'vaccine deaths prevented') {
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
                               SELECT ?vaccineDeathsPrevented WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:vaccineDeathsPrevented ?vaccineDeathsPrevented .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].vaccineDeathsPrevented.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else if (questionType === 'total vaccine doses') {
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
                               SELECT ?totalVaccineDoses WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:totalVaccineDoses ?totalVaccineDoses .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].totalVaccineDoses.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else if (questionType === 'why mask') {
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
                               SELECT ?whyMask WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:whyMask ?whyMask .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].whyMask.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else if (questionType === 'j&j vaccine') {
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
                               SELECT ?jajRecommendation WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:jajRecommendation ?jajRecommendation .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].jajRecommendation.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else if (questionType === 'should not get vaccine') {
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
                               SELECT ?whoShouldAvoidVaccination WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:whoShouldAvoidVaccination ?whoShouldAvoidVaccination .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].whoShouldAvoidVaccination.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else if (questionType === 'covid treatments') {
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
                               SELECT ?covidTreatments WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:covidTreatments ?covidTreatments .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].covidTreatments.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else if (questionType === 'us death toll') {
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
                               SELECT ?usDeathToll WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbo:usDeathToll ?usDeathToll .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].usDeathToll.value + " have died from Covid-19 in the United States.";
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else if (questionType === 'covid risk factors') {
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
                               SELECT ?covidRiskFactors WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:covidRiskFactors ?covidRiskFactors .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].covidRiskFactors.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else if (questionType === 'covid children') {
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
                               SELECT ?covidChildren WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:covidChildren ?covidChildren .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].covidChildren.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else if (questionType === 'covid immunity') {
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
                               SELECT ?covidImmunity WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbr:covidImmunity ?covidImmunity .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = results[0].covidImmunity.value;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else if (questionType === 'us total cases') {
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
                               SELECT ?usTotalCases WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbo:usTotalCases ?usTotalCases .
                               }
                `;
                store.execute(query, (success, results) => {
                    const answer = "There have been " + results[0].usTotalCases.value + " total cases in the United States since Covid-19 began.";
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else if (questionType === 'mortality rate') {
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
                               SELECT ?usMortalityRate ?worldMortalityRate WHERE {
                                 ?covid foaf:name "Covid-19"@en .
                                 ?covid dbo:usMortalityRate ?usMortalityRate .
                                 ?covid dbo:worldMortalityRate ?worldMortalityRate .
                               }
                `;
                store.execute(query, (success, results) => {
                    console.log('The results are:', results);
                    const answer = `The mortality rate in the US is ${results[0].usMortalityRate.value}, and the global mortality rate is ${results[0].worldMortalityRate.value}%.`;
                    res.status(200).json({ answer, isSuccess: true });
                });
            });
        });
        return;
    } 

    else {
        res.status(200).json({ answer: 'I could not find an answer to that question. Please either ask another question or rephrase the question.', isSuccess: true });
    }
}

module.exports = handleQuery;