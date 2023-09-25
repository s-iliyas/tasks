# README: GraphQL API Documentation

This README provides documentation for the GraphQL API using a Postman collection exported JSON. The API allows you to perform various actions such as user authentication, user management, and event management. Below, you will find information on each API endpoint along with example requests.

## Table of Contents

1. [User Authentication](#user-authentication)
   - [Login and Get JWT Token](#login-and-get-jwt-token)

2. [User Management](#user-management)
   - [Update User](#update-user)
   - [Delete User](#delete-user)
   - [Get User Profile](#get-user-profile)

3. [Event Management](#event-management)
   - [Create Event](#create-event)
   - [Update Event](#update-event)
   - [Delete Event](#delete-event)
   - [Get Event](#get-event)
   - [Get Events](#get-events)

---

## User Authentication

### Login and Get JWT Token

- **Endpoint**: `POST /graphql`
- **Description**: Authenticate a user and retrieve a JWT token.
- **Request Body**:
  ```json
  {
      "query": "mutation {
          login(email: \"john@example.com\", password: \"password\") {
              token
          }
      }"
  }
  ```
- **Example Request**:
  ```http
  POST http://localhost:8000/graphql
  Content-Type: application/json
  {
      "query": "mutation {
          login(email: \"john@example.com\", password: \"password\") {
              token
          }
      }"
  }
  ```
- **Response**: The JWT token for authentication.

---

## User Management

### Update User

- **Endpoint**: `POST /graphql`
- **Description**: Update user information.
- **Request Headers**:
  - `Authorization`: Bearer token for authentication.
- **Request Body**:
  ```json
  {
      "query": "mutation {
          updateUser(email: \"john@gmail.com\") {
              id
              email
          }
      }"
  }
  ```
- **Example Request**:
  ```http
  POST http://localhost:8000/graphql
  Authorization: Bearer <your_token_here>
  Content-Type: application/json
  {
      "query": "mutation {
          updateUser(email: \"john@gmail.com\") {
              id
              email
          }
      }"
  }
  ```
- **Response**: The updated user details.

### Delete User

- **Endpoint**: `POST /graphql`
- **Description**: Delete the currently authenticated user.
- **Request Headers**:
  - `Authorization`: Bearer token for authentication.
- **Request Body**:
  ```json
  {
      "query": "mutation {
          deleteUser
      }"
  }
  ```
- **Example Request**:
  ```http
  POST http://localhost:8000/graphql
  Authorization: Bearer <your_token_here>
  Content-Type: application/json
  {
      "query": "mutation {
          deleteUser
      }"
  }
  ```
- **Response**: Confirmation of user deletion.

### Get User Profile

- **Endpoint**: `POST /graphql`
- **Description**: Retrieve the user's profile.
- **Request Headers**:
  - `Authorization`: Bearer token for authentication.
- **Request Body**:
  ```json
  {
      "query": "query {
          user {
              id
              email
          }
      }"
  }
  ```
- **Example Request**:
  ```http
  POST http://localhost:8000/graphql
  Authorization: Bearer <your_token_here>
  Content-Type: application/json
  {
      "query": "query {
          user {
              id
              email
          }
      }"
  }
  ```
- **Response**: The user's profile details.

---

## Event Management

### Create Event

- **Endpoint**: `POST /graphql`
- **Description**: Create a new event.
- **Request Headers**:
  - `Authorization`: Bearer token for authentication.
- **Request Body**:
  ```json
  {
      "query": "mutation {
          createEvent(title: \"Sample Event 1\", description: \"This is a sample event 2\") {
              id
              title
              description
              completed
              userId
          }
      }"
  }
  ```
- **Example Request**:
  ```http
  POST http://localhost:8000/graphql
  Authorization: Bearer <your_token_here>
  Content-Type: application/json
  {
      "query": "mutation {
          createEvent(title: \"Sample Event 1\", description: \"This is a sample event 2\") {
              id
              title
              description
              completed
              userId
          }
      }"
  }
  ```
- **Response**: The created event details.

### Update Event

- **Endpoint**: `POST /graphql`
- **Description**: Update an existing event.
- **Request Headers**:
  - `Authorization`: Bearer token for authentication.
- **Request Body**:
  ```json
  {
      "query": "mutation {
          updateEvent(id: \"651067f753ef45072c808d76\", title: \"Updated Event Title\") {
              id
              title
          }
      }"
  }
  ```
- **Example Request**:
  ```http
  POST http://localhost:8000

/graphql
  Authorization: Bearer <your_token_here>
  Content-Type: application/json
  {
      "query": "mutation {
          updateEvent(id: \"651067f753ef45072c808d76\", title: \"Updated Event Title\") {
              id
              title
          }
      }"
  }
  ```
- **Response**: The updated event details.

### Delete Event

- **Endpoint**: `POST /graphql`
- **Description**: Delete an event by providing its ID.
- **Request Headers**:
  - `Authorization`: Bearer token for authentication.
- **Request Body**:
  ```json
  {
      "query": "mutation {
          deleteEvent(id: \"651067f753ef45072c808d76\")
      }"
  }
  ```
- **Example Request**:
  ```http
  POST http://localhost:8000/graphql
  Authorization: Bearer <your_token_here>
  Content-Type: application/json
  {
      "query": "mutation {
          deleteEvent(id: \"651067f753ef45072c808d76\")
      }"
  }
  ```
- **Response**: Confirmation of event deletion.

### Get Event

- **Endpoint**: `POST /graphql`
- **Description**: Retrieve an event by its ID.
- **Request Headers**:
  - `Authorization`: Bearer token for authentication.
- **Request Body**:
  ```json
  {
      "query": "query {
          event(id: \"651068f453ef45072c808d7b\") {
              id
              title
              description
              completed
              userId
          }
      }"
  }
  ```
- **Example Request**:
  ```http
  POST http://localhost:8000/graphql
  Authorization: Bearer <your_token_here>
  Content-Type: application/json
  {
      "query": "query {
          event(id: \"651068f453ef45072c808d7b\") {
              id
              title
              description
              completed
              userId
          }
      }"
  }
  ```
- **Response**: The event details.

### Get Events

- **Endpoint**: `POST /graphql`
- **Description**: Retrieve a list of events.
- **Request Headers**:
  - `Authorization`: Bearer token for authentication.
- **Request Body**:
  ```json
  {
      "query": "query {
          events {
              id
              title
              description
              completed
              userId
          }
      }"
  }
  ```
- **Example Request**:
  ```http
  POST http://localhost:8000/graphql
  Authorization: Bearer <your_token_here>
  Content-Type: application/json
  {
      "query": "query {
          events {
              id
              title
              description
              completed
              userId
          }
      }"
  }
  ```
- **Response**: A list of event details.

