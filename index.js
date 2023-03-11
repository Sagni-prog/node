const fs = require('fs');
const http = require('http');
const url = require('url');

try {

//   const text = fs.readFileSync('./files/input.txt','utf-8');
	
	const server = http.createServer((req,res) => {
	    const path = req.url;
	    
	    switch(path){
	    case '/':
			res.writeHead(200,{
			  'Content-type': 'text/html'
			});
			res.end('this is root path');
		case '/posts': 
			res.writeHead(200,{
				'Content-type': 'text/html'
			  });
	        res.end('this is the posts');
	    default: 
			res.writeHead(404,{
				'Content-type': 'text/html'
			  });
	        res.end('<h1>404 page not found</h1>')
	    } 
	});
	
	server.listen(400,() => {
		console.log('server running on port 400');
	});
	
	
} catch (error) {
	console.log(error.message);
}

