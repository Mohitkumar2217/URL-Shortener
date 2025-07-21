
const PORT = process.env.PORT || 5000;
const app = require('../app.js');

const crypto = require('crypto');
const http = require('http');
const path = require("path");

const { readFile } = require('fs/promises');
const { json } = require('stream/consumers');
const { writeFile } = require('fs');

const DATA_FILE = path.join('data' , "links.json");

const serverFile = async (res, filePath, contentType) => {
    try {
        const data = await readFile(filePath);
        res.writeHead(200, { 'Content-type': contentType });
        res.end(data);
    }
    catch (error) {
        res.writeHead(400, { 'Contenet-type': 'text/plain' });
        res.end('404 page not found');
    }
}


const loadLinks = async () => {
    try {
        const data = await readFile(DATA_FILE, "utf-8");
        return json.parse(data);
    }
    catch(error) {
        if(error.code === "ENOENT") {
            await writeFile(DATA_FILE, JSON.stringify({}));
            return {};
        }
    }
}

const saveLinks = () => {
    
}
const server = http.createServer(async (req, res) => {
    console.log(req.url);
    if (req.method === 'GET') {
        if (req.url === '/') {
            serverFile(
                res,
                path.join('public', 'URL.html'),
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
    if(req.method === 'POST' && req.url === "/shorten") {

        const links = await loadLinks();
        const body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async ()=> {
            console.log(body);
            const {url, shortCode} = json.parse(body);
            console.log(url, shortCode);

            if(!url) {
                res.writeHead(400, {"Content-type" : "text/plain" });
                return res.end("URL is required");
            }

            const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

            if(links[finalShortCode]) {
                res.writeHead(400, {"Content-type" : "text/plain" });
                return res.end("this shorturl already taken please choose another one");
            }
            links[finalShortCode] = url;
            await saveLinks(links);
        });
    }
});


// static path
// const staticPath = path.join(import.meta.dirname, "new");
// app.use(express.static(staticPath));

server.listen(PORT, () => {
    console.log(`server is running at port: http://localhost:${PORT}`);
});
