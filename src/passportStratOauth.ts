import {
  Strategy as OAuthStrategy,
  type VerifyCallback,
} from "passport-oauth2";
import axios from "axios";
import { GithubUser, GithubEmails } from "./types/github";

import {
  clientID,
  callbackURL,
  clientSecret,
  tokenURL,
  authorizationURL,
} from "./env";

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

    const email = resEmails.data.find((em) => em.primary) ?? null;
    if (!email) done("Cannot find email", false);

    const u = resUser.data;
    const providerAccountId = u.node_id;
    const avatarURL = u.avatar_url;
    const name = u.name;

    // User.findOrCreate({ exampleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
);
