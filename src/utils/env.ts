import "dotenv/config";

export const githubClientSecret = process.env.GITHUB_CLIENT_SECRET ?? "";
export const githubClientID = process.env.GITHUB_CLIENT_ID ?? "";
export const githubCallbackURL = process.env.GITHUB_CALLBACK_URL ?? "";
export const githubTokenURL = process.env.GITHUB_TOKEN_URL ?? "";
export const githubAuthorizationURL =
  process.env.GITHUB_AUTHORIZATION_URL ?? "";

if (
  !githubClientID ||
  !githubClientSecret ||
  !githubCallbackURL ||
  !githubTokenURL ||
  !githubAuthorizationURL
)
  throw new Error("Invalid ENV");
