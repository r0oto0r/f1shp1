import express from "express";
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
    return res.status(200).send({
        message: "Hello World!",
    });
});
try {
    app.listen(port, () => {
        console.log(`Connected successfully on port ${port}`);
    });
}
catch (error) {
    console.error(`Error occured: ${error.message}`);
}
