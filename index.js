const fs = require('fs');
const rdfStore = require('rdfstore');

rdfStore.create((err, store) => {
    if (err) {
        console.log('Error:', err.message);
        return;
    }

    const rdf = fs.readFileSync(__dirname + '/rdf-store/covid-19.ttl').toString();
    store.load('text/turtle', rdf, (s, d) => {
        const query = `PREFIX foaf: <http://xmlns.com/foaf/0.1/>
                       PREFIX dbo: <http://www.w3.org/1999/02/22-rdf-syntax-ns/>
                       SELECT ?type WHERE {
                         ?covid foaf:name "Covid-19"@en .
                         ?covid dbo:type ?type .
                       }
        `
        store.execute(query, (success, results) => {
            console.log('The results are:', results);
        });
    });
});
