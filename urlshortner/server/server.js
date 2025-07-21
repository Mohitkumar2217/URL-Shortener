
const http = require('http');
const { readFile } = require('fs/promises');
const PORT = process.env.PORT || 5000;
const path = require('path');
const app = require('../app.js');
const { read } = require('fs');

const serverFile = async (res, filePath, contentType) => {
    try {
        const data = await readFile(filePath);
        res.writeHead(200, { 'content-type': contentType });
        res.end(data);
    }
    catch (error) {
        res.writeHead(404, { 'Contenet-type': 'text/plain' });
        res.end('404 page not found');
    }
}

const server = http.createServer(async (req, res) => {
    console.log(req.url);

    if (req.method === 'GET') {
        if (req.url === '/') {
            serverFile(
                res,
                path.join('public', 'index.html'),
                'text/html'
            );
        }
        else if (req.url === '/style.css') {
            return serverFile(
                res,
                path.join('public', './css/style.css'),
                'text/css'
            );
        }
    }
});



// static path
// const staticPath = path.join(import.meta.dirname, "new");
// app.use(express.static(staticPath));

server.listen(PORT, () => {
    console.log(`server is running at port: http://localhost:${PORT}`);
});
