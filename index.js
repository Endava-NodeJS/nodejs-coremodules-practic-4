const http = require('http')

const url = 'http://api.weatherstack.com/current?access_key=a0b5a0610fc1eb8fa3a870a7f8cba8e0&query=Chisinau';

const processData = (data) => {
  const { current: { weather_descriptions, temperature }, location: { name } } = data
  console.log(`It's currently ${weather_descriptions[0]} in ${name},  with ${temperature > 0 ? '+' : '-'}${temperature}.`)
}

const req = http.request(url, (res) => {
  let data = "";
  let parsed;

  res.on('data', (chunk) => {
    data += chunk;
  })

  res.on('end', () => {
    parsed = JSON.parse(data);
    processData(parsed);
  })


})

req.on('error', e => console.error(e));

req.end();
