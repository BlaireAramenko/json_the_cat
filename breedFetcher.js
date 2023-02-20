const request = require('request');

const fetchBreedDescription = function(breedName, callback) {
  const options = {
    url: 'https://api.thecatapi.com/v1/breeds/search',
    qs: {
      q: breedName
    }
  };
  
  request.get(options, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      callback(`Unexpected status code: ${response.statusCode}`, null);
      return;
    }
  
    const data = JSON.parse(body);
    
    if (data.length === 0) {
      callback(`Breed '${breedName}' not found.`, null);
      return;
    }
  
    const firstEntry = data[0];
    callback(null, firstEntry.description);
  });
};

module.exports = { fetchBreedDescription };




/* const request = require('request');

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
*/