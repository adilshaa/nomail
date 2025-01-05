const express = require("express");
const { google } = require("googleapis");
const dotenv = require("dotenv");
const { checkgpt } = require("./MML/_openai.gpt.pretrained");
const { generateRequestMessage } = require("./MML/format.repsones");
const cors = require("cors");
const userRouter = require("./routers/userRouter");
const apiRouter = require("./routers/apiRouter");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();
const port = 4000;
app.use(express.json());

app.use(cors({ methods: ["GET", "POST"], origin: "*" }));


app.use("/", userRouter);
app.use("/api", apiRouter);
app.listen(port, () => {
	console.log(`App running on http://localhost:${port}`);
});
