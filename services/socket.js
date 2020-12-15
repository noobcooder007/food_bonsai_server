const { io } = require('../index');

io.on('connection', client=>{
    console.log('Client conected');
    client.on('disconnect', () => {
        console.log('Client disconnected');
    });
});