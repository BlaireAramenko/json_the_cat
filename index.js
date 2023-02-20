const { fetchBreedDescription } = require('./breedFetcher');

const breed = process.argv[2];

if (!breed) {
  console.error('Please specify a breed name.');
  process.exit(1);
}

fetchBreedDescription(breed, (error, description) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(`Description for ${breed}: ${description}`);
});
