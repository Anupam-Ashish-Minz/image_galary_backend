import express from 'express';
import session from 'express-session';
import path from 'path';
import fs from 'fs';
import passport from 'passport';
import { passportConf } from './login';
import { router as loginRouter } from './routes/login';

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded());
app.use(session({
    saveUninitialized: false,
    secret: "aoeuaoeu"
}));

const imagePath = path.join(__dirname, "..", "public");
const listOfImages = fs.readdirSync(imagePath);
app.use("/api/images", express.static(imagePath));

app.use(passport.initialize());
app.use(passport.session());
passportConf();

app.use("/", loginRouter);

app.get("/", (_req, res) => {
    res.send("the server is running");
});

app.get("/api/images", (_req, res) => {
    res.send(listOfImages);
});

app.listen(port, ()=>console.log(`the server is running on http://localhost:${port}`));
