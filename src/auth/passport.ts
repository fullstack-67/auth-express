import passportIns from "passport";
import { dbClient } from "@db/client";
import { eq } from "drizzle-orm";
import { usersTable } from "@db/schema";
import { local } from "./passportLocal";
import { github } from "./passportOauthGithub";
import { google } from "./passportOauthGoogle";

passportIns.use(local);
passportIns.use("github", github);
passportIns.use("google", google);

passportIns.serializeUser(function (user, done) {
  done(null, user.id);
});

passportIns.deserializeUser<string>(async function (id, done) {
  const query = await dbClient.query.usersTable.findFirst({
    where: eq(usersTable.id, id),
  });
  if (!query) {
    done(null, false);
  } else {
    done(null, query);
  }
});

export default passportIns;
