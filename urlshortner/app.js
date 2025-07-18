const express= require('express');
const path = ("path");
const app = express();
// import path from "path";

// // static use
app.use(express.static("public"));

// // // router use
// app.use(rout);

// // get method
app.get("/", (req, res) => {
    res.send("HELLO");
})

// const staticPath = path.join(import.meta.dirname, "new");
// app.use(express.static(staticPath));

app.listen(process.env.PORT, () => {
    console.log(`server is running at port: ${process.env.PORT}`);
});