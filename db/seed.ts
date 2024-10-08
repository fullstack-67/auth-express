import { dbClient, dbConn } from "@db/client";
import { usersTable } from "@db/schema";
import bcrypt from "bcrypt";

const saltRounds = 10;
const password = "1234";

async function insertData() {
  bcrypt.hash(password, saltRounds, async function (err, hash) {
    await dbClient.insert(usersTable).values([
      {
        name: "Admin User",
        email: "admin@cmu.com",
        isAdmin: true,
        password: hash,
      },
      {
        name: "Regular User",
        email: "user@cmu.com",
        isAdmin: false,
        password: hash,
      },
    ]);
    dbConn.close();
  });
}

insertData();
