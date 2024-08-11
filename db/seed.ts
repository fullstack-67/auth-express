import { dbClient, dbConn } from "@db/client";
import { usersTable } from "@db/schema";
async function insertData() {
  await dbClient.insert(usersTable).values([
    {
      name: "Admin User",
      isAdmin: true,
    },
    {
      name: "Regular User",
      isAdmin: false,
    },
  ]);
  dbConn.close();
}

insertData();
