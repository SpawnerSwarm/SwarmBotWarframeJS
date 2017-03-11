const WorldState = require('warframe-worldstate-parser');
const WorldStateData = require('warframe-worldstate-data');
const http = require('http');
var ws;

function get() {
    return new Promise((resolve, reject) => {
      const request = http.get(process.argv[2], (response) => {
        if (response.statusCode < 200 || response.statusCode > 299) {
          reject(new Error(`Failed to load page, status code: ${response.statusCode}`));
        }
        const body = [];
        response.on('data', chunk => body.push(chunk));
        response.on('end', () => resolve(body.join('')));
      });
      request.on('error', err => reject(err));
    });
}

get().then((data) => {
    ws = new WorldState(data);
    switch(process.argv[3]) {
        case "alerts": console.log(JSON.stringify(ws.alerts)); break;
        case "fissures": console.log(JSON.stringify(ws.fissures)); break;
    }
})