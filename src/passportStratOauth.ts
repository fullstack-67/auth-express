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
import { accountsTable, usersTable, type UserData } from "@db/schema";
import { findUserByEmail, findUserProviderAccount } from "@db/repositories";

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

    const u = resUser.data;
    const emailQuery = resEmails.data.find((em) => em.primary) ?? null;
    if (!emailQuery) done("Cannot find email", false);
    const email = emailQuery?.email ?? "";
    //
    const userData: UserData = {};
    userData.email = email;
    userData.provider = "GITHUB";
    userData.providerAccountId = u.node_id ?? "";
    userData.avatarURL = u.avatar_url;
    userData.name = u.name;
    userData.accessToken = accessToken ?? "";
    userData.refreshToken = refreshToken ?? "";

    // Check if user email exists
    const userQuery = await findUserByEmail(email);
    if (userQuery) {
      userData.isUserExist = true;
      const providerQuery = await findUserProviderAccount(email, "GITHUB");
      if (providerQuery) {
        userData.isProviderAccountExist = true;
      } else {
        userData.isProviderAccountExist = false;
      }
    } else {
      userData.isUserExist = false;
      userData.isProviderAccountExist = false;
    }

    console.log(userData);
    // User.findOrCreate({ exampleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
);
