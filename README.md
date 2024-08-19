# Auth-MPA - V1

- Multi-page app (using HTMX) to demonstrate authentical/authorization.

- Use `commonjs` module.

# Note

- I have to use `nanoid@3.X` because of the lack of commonjs support. I tried following this [post](https://stackoverflow.com/q/70800567), but it was not working.
- I cannot use `drizzle-kit` push.
  - I got `TypeError: This statement does not return data. Use run() instead.` error.
  - The solution is posted [here](https://github.com/drizzle-team/drizzle-orm/issues/2623#issuecomment-2233946827), but I will just do migration instead.
- During installation I ran into error with `better-sqlite3`. It has to do with `node-gyp` unable to find Visual Studio`
  - I solved it by running `choco install visualstudio2022-workload-vctools -y` [(Ref)](https://github.com/nodejs/node-gyp?tab=readme-ov-file#on-windows).
  - Also check out [troubleshooting](https://github.com/WiseLibs/better-sqlite3/blob/master/docs/troubleshooting.md) section of the package documentation.
