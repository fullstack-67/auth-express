import "dotenv/config";

export const clientSecret = process.env.CLIENT_SECRET ?? "";
export const clientID = process.env.CLIENT_ID ?? "";
export const callbackURL = process.env.CALLBACK_URL ?? "";
export const tokenURL = process.env.TOKEN_URL ?? "";
export const authorizationURL = process.env.AUTHORIZATION_URL ?? "";

if (
  !clientID ||
  !clientSecret ||
  !callbackURL ||
  !tokenURL ||
  !authorizationURL
)
  throw new Error("Invalid ENV");
