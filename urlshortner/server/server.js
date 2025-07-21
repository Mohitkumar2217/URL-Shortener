
const http = require('http');
const {readFile} = require('fs');
const PORT = process.env.PORT || 5000;
const path = require('path');
const app = require('../app.js');

const server = http.createServer(async (req, res) => {
    if(req.method === 'GET') {
        if(req.url === '/') {
            try {
                const data = await readFile(path.join('public', 'URL.html'));
                res.writeHead(200, {'content-type' : 'text/html'});
                res.end(data);
            }
            catch(error) {
                res.writeHead(404, {'Contenet-type':'text/html'});
                res.end('404 page not found');
            }
        }
    }
});
// static path
// const staticPath = path.join(import.meta.dirname, "new");
// app.use(express.static(staticPath));

server.listen(PORT, () => {
    console.log(`server is running at port: http://localhost:${PORT}`);
});
