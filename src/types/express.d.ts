// https://blog.logrocket.com/extend-express-request-object-typescript?utm_source=pocket_shared

declare global {
  namespace Express {
    interface Request {
      test: string;
    }
    interface User {
      id: string;
      name: string;
    }
  }
}

export {};
