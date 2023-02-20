/* const request = require('request');
request('http://www.google.com', (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
}); */

const request = require('request');

const breed = process.argv[2];

if (!breed) {
  console.error('Please specify a breed name.');
  process.exit(1);
}

const options = {
  url: 'https://api.thecatapi.com/v1/breeds/search',
  qs: {
    q: breed
  }
};

request.get(options, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }
  
  if (response.statusCode !== 200) {
    console.error(`Unexpected status code: ${response.statusCode}`);
    return;
  }

  const data = JSON.parse(body);
  
  if (data.length === 0) {
    console.error(`Breed '${breed}' not found.`);
    return;
  }

  const firstEntry = data[0];
  console.log(`Description for ${firstEntry.name}: ${firstEntry.description}`);
});


/* const request = require('request');

const options = {
  url: 'https://api.thecatapi.com/v1/breeds/search',
  qs: {
    q: 'siberian'
  }
};

request.get(options, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }
  
  if (response.statusCode !== 200) {
    console.error(`Unexpected status code: ${response.statusCode}`);
    return;
  }

  /*const data = JSON.parse(body);
  console.log(data);
  console.log(typeof data);

  const data = JSON.parse(body);
  const firstEntry = data[0];
  console.log(`Description for ${firstEntry.name}: ${firstEntry.description}`);
}); */


