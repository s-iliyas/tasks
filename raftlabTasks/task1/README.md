# GraphQL API with Node.js, TypeScript, JWT Authentication, and Mongoose

This README.md file provides an overview of a GraphQL API implemented using Node.js with TypeScript, JWT (JSON Web Tokens) authentication, and Mongoose for interacting with a MongoDB database. The API allows users to manage events and user data, including authentication and authorization using JWT tokens.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Authentication](#authentication)
- [Database](#database)
- [GraphQL Schema](#graphql-schema)
- [Queries and Mutations](#queries-and-mutations)
- [Usage](#usage)
- [Sample Queries and Mutations](#sample-queries-and-mutations)
- [Cache Backends](#cache-backend)


## Getting Started

### Prerequisites

Before you start, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+)
- [npm](https://www.npmjs.com/) (v6+)
- [MongoDB](https://www.mongodb.com/) (v4+)

### Installation

1. Clone this repository:

   ```bash
   git clone <repo-link>
   cd raftlabTasks/task1
   ```

2. Install dependencies:

   ```bash
   yarn
   ```

3. Set up environment variables by creating a `.env` file in the project root and defining the following:

   ```env
   # node environment
   NODE_ENV='development'

   # node port where server need to run
   NODE_PORT=8000

   # JWT secret key
   SECRET_KEY=your-secret-key

   # MongoDB connection URI
   MONGO_DB_URL=mongodb://localhost:27017/raftlabs
   ```

4. Start the application:

   ```bash
   yarn run dev
   ```

By default, the server will run on port 8000. You can configure the port and other settings in the `.env` file.

## Configuration

You can configure the application in the `.env` file by setting environment variables for the JWT secret key and the MongoDB connection URI.

## Authentication

- JWTs (JSON Web Tokens) are used for authentication. When a user successfully logs in, a JWT token is generated and sent in the response. This token should be included in the `Authorization` header for protected queries and mutations.

## Database

- The application uses MongoDB as the database to store user and event data.
- Mongoose is used as the ODM (Object-Document Mapper) to define schemas and interact with the database.

## GraphQL Schema

The GraphQL schema is defined in the provided `schema.graphql` file. It includes types for User, Event, LoginResponse, and mutations and queries for user and event operations.

## Queries and Mutations

### User Queries and Mutations

- `user: User`: Get user details by token.
- `updateUser(email: String): User`: Update user email.
- `deleteUser: ID`: Delete user by token.

### Event Queries and Mutations

- `event(id: ID!): Event`: Get event details by ID.
- `events: [Event]`: Get a list of all events for user token.
- `createEvent(title: String!, description: String): Event`: Create a new event for user token.
- `updateEvent(id: ID!, title: String, description: String, completed: Boolean): Event`: Update event information.
- `deleteEvent(id: ID!): ID`: Delete an event.

### Authentication Mutation

- `login(password: String!, email: String!): LoginResponse`: Authenticate a user if exists or create then authenticate and generate a JWT token.

## Usage

Once the server is running, you can access the GraphQL API and play at `/graphql` endpoint.

Make sure to include the JWT token in the `Authorization` header for protected queries and mutations.

## Sample Queries and Mutations

Here are some sample queries and mutations you can use:

### Login and Get JWT Token

```graphql
mutation {
  login(email: "john@example.com", password: "password") {
    token
  }
}
```

### Update User (with JWT token in header)

```graphql
mutation {
  updateUser(email: "john@example.com") {
    id
    email
  }
}
```

### Delete User (with JWT token in header)

```graphql
mutation {
  deleteUser
}
```

### Get User Profile (with JWT token in header)

```graphql
query {
  user {
    id
    email
  }
}
```

### Create Event (with JWT token)

```graphql
mutation {
  createEvent(title: "Sample Event", description: "This is a sample event") {
    id
    title
    description
    completed
    userId
  }
}
```

### Update Event (with JWT token in header)

```graphql
mutation {
  updateEvent(id: "event-id", title: "Updated Event Title") {
    id
    title
  }
}
```

### Delete Event (with JWT token in header)

```graphql
mutation {
  deleteEvent(id: "event-id")
}
```

### Get Event (with JWT token in header)

```graphql
query(id: "event-id") {
    id
    title
    description
    completed
    userId
}
```

### Get Events (with JWT token in header)

```graphql
query {
  event {
    id
    title
    description
    completed
    userId
  }
}
```

## Cache Backend

- For more detailed information please visit [Cache Backend](https://www.apollographql.com/docs/apollo-server/performance/cache-backends)
- Here in this project I have used In memory cache which apollo server can be configured in default but We can use redis or memecached using keyV wrapper around server.
