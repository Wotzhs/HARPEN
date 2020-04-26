import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import bodyParser from "body-parser";
import "regenerator-runtime/runtime";

import usersRouter from "./routes/users";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.use("/api/users", usersRouter);

app.get("*", (req,res) => res.sendFile(path.join(__dirname, "public", "index.html")));

export default app;