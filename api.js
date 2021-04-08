const http = require('http');

const options = {
    host: 'localhost',
    path: '/notes',
    port: '8089',
};

callback = function(response) {
    let str = ''
    response.on('data', function (chunk) {
        str += chunk;
    });

    response.on('end', function () {
        console.log(str);
    });
}

const req = http.request(options, callback);
req.end();