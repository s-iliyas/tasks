import {
  createEvent,
  updateEvent,
  deleteEvent,
} from "./mutations/events.mutation";
import { events, event } from "./queries/events.query";
import { user } from "./queries/user.query";
import { login, updateUser, deleteUser } from "./mutations/user.mutation";

const resolvers = {
  Query: {
    events,
    event,
    user,
  },
  Mutation: {
    login,
    updateUser,
    deleteUser,
    createEvent,
    updateEvent,
    deleteEvent,
  },
};

export default resolvers;
