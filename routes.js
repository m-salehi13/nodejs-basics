const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="m1"><button type="submit">Send</button></body>');
        res.write('</html>');
        return res.end();
    }
    
    if(url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedbody = Buffer.concat(body).toString();
            console.log(parsedbody);
            const message = parsedbody.split('=')[1];
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    
    }
    
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>my first page</title></head>');
    res.write('<body><h1>hello world</h1></body>');
    res.write('</html>');
    res.end();
};


// module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     sometext: 'Some hard coded text'
// }

// module.exports.handler = requestHandler;
// module.exports.sometext = 'Some hard coded text';

exports.handler = requestHandler;
exports.sometext = 'Some hard coded text';