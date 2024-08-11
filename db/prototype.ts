import { eq } from "drizzle-orm";
import { dbClient, dbConn } from "db/client";
import { usersTable } from "db/schema";

async function insertData() {
  await dbClient.insert(usersTable).values({
    id: "1234",
  });
  dbConn.close();
}

insertData();
