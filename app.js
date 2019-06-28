const axios = require('axios');
const prompt = require('prompt');
const dotenv = require('dotenv');

dotenv.config();

// Geolocation API
const locationAPI = process.env.GEOLOCATION_API_KEY;
// Weather API
const tempratureAPI = process.env.TEMPRATURE_API_KEY;

const darkSkyUrl = (lat, long) => {
  return `https://api.darksky.net/forecast/${tempratureAPI}/${lat},${long}`;
};

const openCageUrl = placename => {
  return `https://api.opencagedata.com/geocode/v1/json?q=${placename}&key=${locationAPI}`;
};

async function getStuff(city) {
  // gets coordinates
  const { data } = await axios.get(openCageUrl(city));
  const { lat, lng } = data.results[0].geometry;
  // get tempratrue
  const result = await axios.get(darkSkyUrl(lat, lng));
  f = result.data.currently.temperature;
  // fahrenheit to celcius
  c = Math.round((f - 32) * (5 / 9));
  console.log(`${c} Celsius`);
}

prompt.start();

prompt.get('city', (err, res) => {
  getStuff(res.city);
});
