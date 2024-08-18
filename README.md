# Note

- I have to use `nanoid@3.X` because of the lack of commonjs support. I tried following this [post](https://stackoverflow.com/q/70800567), but it was not working.
- I cannot use `drizzle-kit` push.
  - I got `TypeError: This statement does not return data. Use run() instead.` error.
  - The solution is posted [here](https://github.com/drizzle-team/drizzle-orm/issues/2623#issuecomment-2233946827), but I will just do migration instead.
- During installation I ran into error with `better-sqlite3`. It has to do with `node-gyp` unable to find Visual Studio`
  - I solved it by running `choco install visualstudio2022-workload-vctools -y` [(Ref)](https://github.com/nodejs/node-gyp?tab=readme-ov-file#on-windows).
  - Also check out [troubleshooting](https://github.com/WiseLibs/better-sqlite3/blob/master/docs/troubleshooting.md) section of the package documentation.

# Github

### Flow

https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#web-application-flow

### Login URL

- https://github.com/login/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URL&response_type=code&scope=user,user:email

### Resource

- https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user
- https://docs.github.com/en/rest/users/emails?apiVersion=2022-11-28#list-email-addresses-for-the-authenticated-user

# Google

### Flow

- https://developers.google.com/identity/protocols/oauth2/web-server#httprest_1

### Login

- https://accounts.google.com/o/oauth2/v2/auth?client_id=880822515646-8cjb1j0ofndgevojqt7o9gvnjqnpudn2.apps.googleusercontent.com&redirect_uri=http://localhost:5001/callback/google&response_type=code&scope=openid+https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile

### Resource

- https://developers.google.com/oauthplayground
- https://www.googleapis.com/oauth2/v2/userinfo
