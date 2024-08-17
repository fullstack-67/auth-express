import {
  Strategy as OAuthStrategy,
  type VerifyCallback,
} from "passport-oauth2";
import axios from "axios";
import { GithubUser, GithubEmails } from "./types/github";
import { eq } from "drizzle-orm";
import {
  clientID,
  callbackURL,
  clientSecret,
  tokenURL,
  authorizationURL,
} from "./env";
import { dbClient } from "@db/client";
import { accountsTable, usersTable } from "@db/schema";

export const github = new OAuthStrategy(
  {
    authorizationURL: authorizationURL,
    tokenURL: tokenURL,
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: callbackURL,
    scope: "user,user:email",
    passReqToCallback: false,
  },
  // I have to manually annotate this from d.ts file. This should not be the case.
  async function (
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ) {
    // console.log({ accessToken, refreshToken, profile, done });

    const resUser = await axios.request<GithubUser>({
      method: "GET",
      url: "https://api.github.com/user",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const resEmails = await axios.request<GithubEmails>({
      method: "GET",
      url: "https://api.github.com/user/emails",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log({ resUser: resUser.data, resEmails: resEmails.data });

    const emailQuery = resEmails.data.find((em) => em.primary) ?? null;
    if (!emailQuery) done("Cannot find email", false);
    const email = emailQuery?.email ?? "";

    const u = resUser.data;
    const providerAccountId = u.node_id;
    const avatarURL = u.avatar_url;
    const name = u.name;

    // Check if user email exists
    const userQuery = await dbClient.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
      with: {
        accounts: true,
      },
    });
    if (userQuery) {
      // Check if user already has Github account registered
      const accountQuery = await dbClient.query.accountsTable.findFirst({
        where: eq(accountsTable.provider, "GITHUB"),
      });
      if (accountQuery) {
      } else {
        // Add Github account
      }
    } else {
      // Signup user and Github account
    }

    // User.findOrCreate({ exampleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
);
