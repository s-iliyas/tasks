import jwt from "jsonwebtoken";

import { GraphQLError } from "graphql";

import verifyToken from "../../helpers/verifyToken";
import Event from "../../models/event";

interface CreateEvent {
  title: string;
  description?: string;
}

interface UpdateEvent {
  title?: string;
  description?: string;
  completed?: string;
  eventId: number;
}

export const createEvent = async (
  _: any,
  data: CreateEvent,
  context: { token: string }
) => {
  const decoded: string | jwt.JwtPayload = await verifyToken(context?.token);
  try {
    const eventData = {
      userId: decoded?.userId,
      title: data?.title,
      description: data?.description,
      completed: false,
    };
    const event = await Event.create(eventData);
    return { event };
  } catch (error) {
    console.log("[CREATE_EVENT_ERROR]", error.message);
    throw new GraphQLError(error.message, {
      extensions: {
        code: "BAD_REQUEST",
        http: { status: 400 },
      },
    });
  }
};

export const updateEvent = async (
  _: any,
  data: UpdateEvent,
  context: { token: string }
) => {
  const decoded: string | jwt.JwtPayload = await verifyToken(context?.token);
  try {
    const event = await Event.updateOne({});
    return { event };
  } catch (error) {
    console.log("[CREATE_EVENT_ERROR]", error.message);
    throw new GraphQLError(error.message, {
      extensions: {
        code: "BAD_REQUEST",
        http: { status: 400 },
      },
    });
  }
};
export const deleteEvent = () => {};
