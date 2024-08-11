import "dotenv/config";
import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import helmet from "helmet";
import sessionIns from "./session";
import passportIns from "./passport";

const app = express(); //Intializing the express app
app.use(helmet());
app.use(
  cors({
    origin: false, // Disable CORS
    // origin: "*", // Allow all origins
  })
);
app.use(express.json()); // Extracts the entire body portion of an incoming request stream and exposes it on req.body.
app.use(sessionIns); // Session
app.use(passportIns.initialize());
app.use(passportIns.session());

app.get("/", async (req, res, next) => {
  console.log({ session: req.session });

  const count = req.session?.count ?? 0;
  req.session.count = count + 1;
  res.send("Hello");
});

app.post("/api/login", passportIns.authenticate("local"), function (req, res) {
  res.json(req.user);
});

// Running app
const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
