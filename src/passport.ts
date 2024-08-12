import passportIns from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { dbClient } from "@db/client";
import { eq } from "drizzle-orm";
import { usersTable } from "@db/schema";

passportIns.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async function (email, password, done) {
      const query = await dbClient.query.usersTable.findFirst({
        where: eq(usersTable.email, email),
      });
      if (!query) done(new Error("No User"), false);
      console.log({ password, p: query });
      bcrypt.compare(password, query?.password ?? "", function (err, result) {
        console.log({ result });
        if (result) {
          return done(null, query);
        } else {
          return done(new Error("Wrong password"), false);
        }
      });
    }
  )
);
passportIns.serializeUser(function (user, done) {
  done(null, user.id);
});

passportIns.deserializeUser<string>(function (id, done) {
  done(null, { id, name: "" });
});

export default passportIns;
