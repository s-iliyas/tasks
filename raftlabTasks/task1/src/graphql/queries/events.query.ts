import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

import Event from "../../models/event";
import verifyToken from "../../helpers/verifyToken";

export const events = async (_: any, __: any, context: { token: string }) => {
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

export const event = async (
  _: any,
  data: { id: string },
  context: { token: string }
) => {
  const decoded: string | jwt.JwtPayload = await verifyToken(context?.token);
  try {
    const event = await Event.find({ _id: data?.id });
    if (event.length < 1) {
      throw new GraphQLError("No such event.", {
        extensions: {
          code: "BAD_REQUEST",
          http: { status: 400 },
        },
      });
    } else {
      return event[0];
    }
  } catch (error) {
    console.log("[EVENT_QUERY_ERROR]", error.message);
    throw new GraphQLError(error.message, {
      extensions: {
        code: "BAD_REQUEST",
        http: { status: 400 },
      },
    });
  }
};
