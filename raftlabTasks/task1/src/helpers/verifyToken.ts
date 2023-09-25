import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

import config from "../config";

const verifyToken = (token: string) =>
  new Promise((resolve, _) => {
    if (!token) {
      throw new GraphQLError("User should login, token is required.", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    } else {
      try {
        resolve(jwt.verify(token, config.SECRET_KEY));
      } catch (err) {
        console.log("[VERIFY_TOKEN_ERROR]", err.message);
        throw new GraphQLError(
          "Invalid Token or Token is expired. Login again.",
          {
            extensions: {
              code: "UNAUTHENTICATED",
              http: { status: 401 },
            },
          }
        );
      }
    }
  });

export default verifyToken;
