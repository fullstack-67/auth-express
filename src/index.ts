import "dotenv/config";
import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import session from "express-session";
import { Strategy as LocalStrategy } from "passport-local";
//Intializing the express app
const app = express();

//Middleware
app.use(helmet());
app.use(
  cors({
    origin: false, // Disable CORS
    // origin: "*", // Allow all origins
  })
);
app.use(
  session({
    secret: "123456",
    saveUninitialized: false,
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// Extracts the entire body portion of an incoming request stream and exposes it on req.body.
app.use(express.json());

passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    function (username, password, done) {
      return done(null, true);
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log({ user });
  done(null, { name: "sdfd" });
});

app.get("/", async (req, res, next) => {
  console.log({ req: req.user });
  res.send("Hello");
});

app.post("/api/login", passport.authenticate("local"), function (req, res) {
  res.json(req.user);
});

// Running app
const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
