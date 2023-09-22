import { GraphQLError } from "graphql";

import login from "./mutations/login.mutation";
import events from "./queries/events.query";
import { createEvent } from "./mutations/events.mutation";

const resolvers = {
  Query: {
    events,
  },
  Mutation: {
    login,
    createEvent,
  },
};

export default resolvers;
