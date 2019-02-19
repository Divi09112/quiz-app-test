const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

http.listen(3001);
app.get('/abc', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({ data: 'Hello' });
});

io.on('connection', (socket) => {
  socket.on('answer', (payload) => {
    console.log(payload.answer);
    // if(payload.answer == '1') {
    //   socket.emit('reply', {
	  //     reply: 'correct',
    //   });
    // }
    // else {
    //   socket.emit('reply', {
    //     reply: 'wrong',
    //   });
    // }
  });
});
