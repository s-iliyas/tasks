import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

import User from "../../models/user";
import verifyToken from "../../helpers/verifyToken";

export const user = async (
    _: any,
    __: any,
    context: { token: string }
  ) => {
    const decoded: string | jwt.JwtPayload = await verifyToken(context?.token);
    try {
      const user = await User.find({ _id: decoded?.userId });
      if (user.length < 1) {
        throw new GraphQLError("No such user.", {
          extensions: {
            code: "BAD_REQUEST",
            http: { status: 400 },
          },
        });
      } else {
        return user[0];
      }
    } catch (error) {
      console.log("[USER_QUERY_ERROR]", error.message);
      throw new GraphQLError(error.message, {
        extensions: {
          code: "BAD_REQUEST",
          http: { status: 400 },
        },
      });
    }
  };
