const typeDefs = `#graphql
  type User {
      id: ID!
      username: String!
      email: String!
      events: [Event!]!
    }

  type Event {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
    userId: ID!
  }

  type Query {
    user: User
    event(id: ID!): Event
    events: [Event]
  }

  type LoginResponse {
    token: String
  }

  input LoginInput {
    password: String!
    email: String!
  }

  input updateUserInput {
    email: String
  }

  input createEventInput {
    title: String!
    description: String
  }

  input updateEventInput {
    title: String
    description: String
    completed: Boolean
  }

  type Mutation {
    login(data: LoginInput!): LoginResponse
    updateUser(data: updateUserInput!): User
    deleteUser: ID
    createEvent(data: createEventInput!): Event
    updateEvent(
      id: ID!,
      data: updateEventInput
    ): Event
    deleteEvent(id: ID!): ID
  }

`;

export default typeDefs;
