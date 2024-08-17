import {
  Strategy as OAuthStrategy,
  type VerifyCallback,
} from "passport-oauth2";
import axios from "axios";
import { GithubEmail } from "@src/types/github";
import { eq } from "drizzle-orm";
import {
  clientID,
  callbackURL,
  clientSecret,
  tokenURL,
  authorizationURL,
} from "@src/env";
import { dbClient } from "@db/client";
import { accountsTable, usersTable } from "@db/schema";

export async function findUserByEmail(email: string) {
  // Check if user email exists
  const userQuery = await dbClient.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
    with: {
      accounts: true,
    },
  });

  return userQuery;
}

export async function findUserProviderAccount(
  email: string,
  provider: "GITHUB" | "DISCORD"
) {
  // Check if user email exists
  const userQuery = await dbClient.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
    with: {
      accounts: true,
    },
  });
  if (!userQuery) return null;

  const providerQuery = userQuery.accounts.find(
    (acc) => acc.provider === provider
  );

  return providerQuery ?? null;
}
