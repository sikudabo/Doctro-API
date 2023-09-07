const fs = require('fs');
const rdfStore = require('rdfstore');

rdfStore.create((err, store) => {
    if (err) {
        console.log('Error:', err.message);
        return;
    }

    const rdf = fs.readFileSync(__dirname + '/rdf-store/covid-19.ttl').toString();
    store.load('text/turtle', rdf, (s, d) => {
        store.execute("SELECT * WHERE { ?s ?p ?o } LIMIT 3", (success, results) => {
            console.log('THe results are:', results);
        });
    });
});
