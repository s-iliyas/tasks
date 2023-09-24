import jwt from "jsonwebtoken";

import { GraphQLError } from "graphql";

import verifyToken from "../../helpers/verifyToken";
import Event from "../../models/event";
import User from "../../models/user";

interface CreateEvent {
  title: string;
  description?: string;
}

interface UpdateEvent {
  title?: string;
  description?: string;
  completed?: string;
  id: string;
}

export const createEvent = async (
  _: any,
  data: CreateEvent,
  context: { token: string }
) => {
  const decoded: string | jwt.JwtPayload = await verifyToken(context?.token);
  try {
    let userId = decoded?.userId;
    if (!userId) {
      const user = await User.find({ email: decoded?.email });
      userId = user[0]._id;
    }
    const eventData = {
      userId,
      title: data?.title,
      description: data?.description,
      completed: false,
    };
    const event = await Event.create(eventData);
    return event;
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
  try {
    await Event.updateOne({ _id: data?.id }, data);
    const event = await Event.find({ _id: data?.id });
    return event[0];
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

export const deleteEvent = async (
  _: any,
  data: { id: string },
  context: { token: string }
) => {
  try {
    const result = await Event.deleteOne({ _id: data?.id });
    if (result.deletedCount === 1) {
      return data?.id;
    } else {
      throw new GraphQLError("No such event.", {
        extensions: {
          code: "BAD_REQUEST",
          http: { status: 400 },
        },
      });
    }
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
