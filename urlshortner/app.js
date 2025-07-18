const express= require('express');
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();
// import path from "path";

// // // static use
// app.use(express.static("public"));

// // // router use
// app.use(rout);
app.use(express.json());

const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));
// // get method
app.get("/", (req, res) => {
    res.sendFile (path.resolve(__dirname,"public","URL.html"));
})

// const staticPath = path.join(import.meta.dirname, "new");
// app.use(express.static(staticPath));

app.listen(PORT, () => {
    console.log(`server is running at port: http://localhost:${PORT}`);
});