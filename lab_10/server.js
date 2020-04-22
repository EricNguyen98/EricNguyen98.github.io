// These are our required libraries to make the server work.

const express = require('express');
const fetch = require('node-fetch');
const sqlite3 = require('sqlite3').verbose(); // We're including a server-side version of SQLite, the in-memory SQL server.


const app = express();
const port = process.env.PORT || 3000;

const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error('err.message');
  }
  console.log('Connected to the in-memory SQL database');
});
db.run('CREATE TABLE responses(name text, zipcode text, interests text)');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



function processDataForFrontEnd(req, res) {
  const baseURL = db; // Enter the URL for the data you would like to retrieve here

  // Your Fetch API call starts here
  // Note that at no point do you "return" anything from this function -
  // it instead handles returning data to your front end at line 34.
  fetch(baseURL)
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
      res.send({ data: data }); // here's where we return data to the front end
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/error');
    });
}

function insertData(req, res) {
  const input = req.body;
  // pull the values of the response into varibles
  const { name, zip_code, interests } = input;
  // insert variables into database
  db.run('INSERT INTO responses (name, zipcode, interests) VALUES ("' + name + '","' + zip_code + '","' + interests +'")',
    (err) => {
      if (err) {
        console.log(err.message);
      }
      // response message if error is not thrown
      res.json({ message: 'Your submission has been recorded', form: req.body});
    });
}

function returnData(res) {
  // retrieves records
  const base = 'SELECT * FROM responses';
  // starts processing chanine
  db.all(base, [], (err, rows) => {
    if (err) { throw err; }
    // throws error if it exists
    // creates the response package
    const data = ({ 'records': [] });
    // adds responses to package
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      data.records.push({
        'name': row.name,
        'zip': row.zipcode,
        'interest': row.interests
      });
    }
    res.json(data);
  }
  );
}
// Syntax change - we don't want to repeat ourselves,
// or we'll end up with spelling errors in our endpoints.
//
app.route('/api')
  .get((req, res) => {
    // retrieves data and sends it back in package
    returnData(res);
  })
  .post((req, res) => {
    console.log('/api post request', req.body);
    res.send('your request was successful'); // simple mode
  })
  .put((req, res) => {
    // displays the received form
    console.log(req.body);
    // inserts data into database and sends back response
    insertData(req, res);
  });


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
