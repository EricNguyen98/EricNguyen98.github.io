// These are our required libraries to make the server work.
// We're including a server-side version of Fetch to build on your client-side work
const express = require('express');
const fetch = require('node-fetch');

// Here we instantiate the server we're going to turn on
const app = express();

// Servers are often subject to the whims of their environment.
// Here, if our server has a PORT defined in its environment, it will use that.
// Otherwise, it will default to port 3000
const port = process.env.PORT || 3000;

// Our server needs certain features - like the ability to send and read JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// And the ability to serve some files publicly, like our HTML.
app.use(express.static('public'));

function processDataForFrontEnd(req, res) {
  const baseURL = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  // Enter the URL for the data you would like to retrieve here

  // Your Fetch API call starts here
  // Note that at no point do you "return" anything from this function -
  // it instead handles returning data to your front end at line 34.
  fetch(baseURL)
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
      function groupBy(objectArray, category) {
        // params
        return objectArray.reduce((acc, obj) => {
          // returns array after passing through reducer function
          const key = obj[category];
          // defines the key value
          if (!acc[key]) {
            // if key is not found in accumulator, then make a new array for that key
            acc[key] = [];
          }
          acc[key].push(obj);
          // else add the establishment to the key/category array
          return acc;
          // return the accumulator ie. now grouped establishments
        }, {});
      }
      function sortData(grouped, keys) {
        const keyLen = [];
        keys.forEach((y) => {
          // eslint-disable-next-line no-use-before-define
          keyLen.push([y, groupedData[y].length]);
        });
        // https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
        keyLen.sort((a, b) => b[1] - a[1]);
        return keyLen;
      }

      const groupedData = groupBy(data, 'category');
      const dataKeys = Object.keys(groupedData);
      const points = [];
      const sorted = sortData(groupedData, dataKeys);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < sorted.length; i++) {
        points.push({
          y: sorted[i][1],
          label: sorted[i][0]
        });
      }
      res.send({ points: points });
      // here's where we return data to the front end
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/error');
    });
}

// This is our first route on our server.
// To access it, we can use a "GET" request on the front end
// by typing in: localhost:3000/api or 127.0.0.1:3000/api
app.get('/api', (req, res) => {
  processDataForFrontEnd(req, res);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
