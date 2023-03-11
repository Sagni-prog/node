const fs = require('fs');
const http = require('http');
const url = require('url');
const templates = require('./modules/templates')

const slugify = require('slugify');

try {

	const data =fs.readFileSync(`${__dirname}/files/data.json`,'utf-8');
	
	const temp = fs.readFileSync(`${__dirname}/temp.html`,'utf-8');
	const card = fs.readFileSync(`${__dirname}/index.html`,'utf-8');
	
	const postData = JSON.parse(data);
	
	const slug = postData.map(slug => slugify(slug.title,{ lower: true}));
	
	console.log(slug);
	
	const server = http.createServer((req,res) => {
	    const path = req.url;
	    
	    switch(path){
	    case '/':
			res.writeHead(200,{
			'Content-type' : 'text/html'
			});
			
			const postHtml = postData.map(el => templates(card,el)).join('');
			
			res.end(postHtml);
			
			
		case '/posts': 
			res.writeHead(200,{
				'Content-type': 'application/json'
			  });
			  res.end(data);
	    default: 
			res.writeHead(404,{
				'Content-type': 'text/html'
			  });
	        res.end('<h1>404 page not found</h1>')
	    }
	});
	
	server.listen(2000,() => {
		console.log('server running on port 2000');
	});
	
	
} catch (error) {
	console.log(error.message);
}

