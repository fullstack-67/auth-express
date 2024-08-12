import "dotenv/config";
import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import sessionIns from "./session";
import passportIns from "./passport";

const app = express(); //Intializing the express app
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Extracts the entire body portion of an incoming request stream and exposes it on req.body.
app.use(express.static("public"));
app.use(morgan("dev"));
const scriptSources = ["'self'", "https://unpkg.com"];
const styleSources = ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"];
const connectSources = ["'self'"];
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: scriptSources,
        scriptSrcElem: scriptSources,
        styleSrc: styleSources,
        connectSrc: connectSources,
      },
      reportOnly: true,
    },
  })
);
app.use(
  cors({
    origin: false, // Disable CORS
    // origin: "*", // Allow all origins
  })
);
app.use(sessionIns); // Session
app.use(passportIns.initialize());
app.use(passportIns.session());

app.get("/", async (req, res, next) => {
  res.render("pages/index", {
    title: "Home",
  });
});

app.get("/login", function (req, res) {
  res.render("pages/login", {
    title: "Login",
  });
});

app.post("/login", passportIns.authenticate("local"), function (req, res) {
  console.log("here");
  console.log(req.body);
  res.setHeader("HX-Redirect", "/");
  res.send(`<div>OK</div>`);
});

// Running app
const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
