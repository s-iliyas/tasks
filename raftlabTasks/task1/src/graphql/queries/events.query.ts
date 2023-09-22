import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

import verifyToken from "../../helpers/verifyToken";
import Event from "../../models/event";

const events = async (_: any, __: any, context: { token: string }) => {
  const decoded: string | jwt.JwtPayload = await verifyToken(context?.token);
  try {
    const events = await Event.find({ userId: decoded?.userId });
    return events;
  } catch (error) {
    console.log("[EVENTS_QUERY_ERROR]", error.message);
    throw new GraphQLError(error.message, {
      extensions: {
        code: "BAD_REQUEST",
        http: { status: 400 },
      },
    });
  }
};

export default events;
