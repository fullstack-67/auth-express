import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const usersTable = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name"),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  isAdmin: integer("is_admin", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).$default(
    () => new Date()
  ),
});

export const sessionsTable = sqliteTable("sessions", {
  sid: text("sid").primaryKey(),
  expired: integer("expired"),
  sess: text("sess"),
});
