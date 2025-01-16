const io = require('./server.js');
const fs = require('fs'); 
const getLastNLines = require('./src/readFileInChunks.js');

fs.watch("./sample.log", async (eventType, filename) => { 
    if(eventType === 'change') {
        const lastLine = await getLastNLines('sample.log', 1);
        console.log(lastLine);
        io.emit('fileEvent', lastLine);
    }
}); 

