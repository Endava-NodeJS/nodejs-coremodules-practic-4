const http = require('http');

const args = process.argv[2];

const url = `http://api.weatherstack.com/current?access_key=a0b5a0610fc1eb8fa3a870a7f8cba8e0&query=${args}`

const req = http.request(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        console.log(chunk.toString());
        data += chunk.toString();
    });
    res.on('end', () => {
        const parsedData = JSON.parse(data);
        console.log(parsedData);
        console.log(`It's currently ${parsedData.current.weather_descriptions[0]} in ${parsedData.location.name}, with ${parsedData.current.temperature} degrees Celsius.`)
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.end();