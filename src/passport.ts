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
      console.log(query);
      return done(null, query);
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
