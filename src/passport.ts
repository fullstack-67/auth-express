import passportIns from "passport";
import { Strategy as LocalStrategy } from "passport-local";

passportIns.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    function (email, password, done) {
      const user = { name: "nnnpooh", id: "12345" };
      return done(null, user);
    }
  )
);
passportIns.serializeUser(function (user, done) {
  done(null, user.id);
});

passportIns.deserializeUser<string>(function (id, done) {
  console.log({ id });
  done(null, { id, name: "" });
});

export default passportIns;
