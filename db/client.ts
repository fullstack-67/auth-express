import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "db/schema";
import Database from "better-sqlite3";

export const dbConn = new Database("db.sqlite");
export const dbClient = drizzle(dbConn, { schema: schema, logger: true });
