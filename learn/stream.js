const fs = require('fs');
const server = require('http').createServer();
 
server.on('request',(req,res) => {

    const readable = fs.createReadStream(`C:/Users/Segni/Desktop/Jonas node/04 How Node.js Works_ A Look Behind the Scenes/003 Processes, Threads and the Thread Pool.en.srt`);
    
    readable.on('data',chunk => {
         res.write(chunk);
    });
    
    readable.on('end',() => {
         res.end();
    });
    
    readable.on('error',err => {
        console.log(err);
        res.statusCode(500);
        res.end("File not found!");
    });
});



server.listen(8000,() => {
    console.log("server running on port: 8000");
});