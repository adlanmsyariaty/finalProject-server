const io = require("socket.io-client");
const server = require("../socketConfig");

describe("Suite of unit tests", function () {
  server.attach(3010);
  let socket;

  beforeAll(function (done) {
    socket = io.connect('http://localhost:3010', {
      'reconnection delay': 0
      , 'reopen delay': 0
      , 'force new connection': true
    });

    socket.on('connect', function () {
      console.log('worked...');
      done();
    });
    socket.on('disconnect', function () {
      console.log('disconnected...');
    });
  });

  afterAll(function (done) {
    socket.close();
    done();
  });

  describe("Chat tests", function () {
    test('Sending message to the chat', (done) => {
    const data = {
      roomName: 'Teknologi Informasi',
      sender: 'Budi',
      message: 'test message',
      name: 'Irham'
    };

    socket.emit('send_message', data);

    socket.on('receive_message', dataRes => {
      expect(dataRes).toBeInstanceOf(Object);
      expect(dataRes).toHaveProperty('name');
      done();
    });
  });
  });
});