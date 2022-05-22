const app = require('../app.js')
const port = process.env.PORT || 3000;
const http = require('http')
const server = http.createServer(app)

server.listen(port, (_) => {
  console.log(`This app is listening on port `, port)
});

module.exports = server