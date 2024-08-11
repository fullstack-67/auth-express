import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import * as nanoid from "nanoid";

export const usersTable = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid.nanoid()),
  name: text("name"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  isAdmin: integer("is_admin", { mode: "boolean" }).notNull().default(false),
});

export const sessionsTable = sqliteTable("sessions", {
  sid: text("sid").primaryKey(),
  expired: integer("expired"),
  sess: text("sess"),
});
