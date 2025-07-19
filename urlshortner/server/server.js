
const http = require('http');
const PORT = process.env.PORT || 5000;

const app = require('../app.js');

const server = http.createServer(app);
// static path
// const staticPath = path.join(import.meta.dirname, "new");
// app.use(express.static(staticPath));

server.listen(PORT, () => {
    console.log(`server is running at port: http://localhost:${PORT}`);
});
