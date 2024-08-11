# Note

- I have to use `nanoid@3.X` because of the lack of commonjs support. I tried following this [post](https://stackoverflow.com/q/70800567), but it was not working.
- I cannot use `drizzle-kit` push.
  - I got `TypeError: This statement does not return data. Use run() instead.` error.
  - The solution is posted [here](https://github.com/drizzle-team/drizzle-orm/issues/2623#issuecomment-2233946827), but I will just do migration instead.
