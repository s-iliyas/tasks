# README: NestJS Server API Documentation

This README provides documentation for the NestJS Server API using a Postman collection exported JSON. This API allows you to manage events, clients, rooms, user registration, and login. You can use the provided endpoints to interact with the server. Below, you will find information on each API endpoint along with example requests.

## Table of Contents

1. [Integrated GraphQL API Server](#integrated-graphql-api-server)
   - [Get Events](#get-events)
   - [Create Event](#create-event)
   - [Update Event](#update-event)
   - [Delete Event](#delete-event)

2. [Clients](#clients)
   - [Get Clients](#get-clients)

3. [Rooms](#rooms)
   - [Create Room](#create-room)
   - [Get Rooms](#get-rooms)

4. [User Registration and Login](#user-registration-and-login)
   - [Register](#register)
   - [Login](#login)

---

## Integrated GraphQL API Server

### Get Events

- **Endpoint**: `GET /events`
- **Description**: Retrieve a list of events.
- **Request Headers**:
  - `Authorization`: Bearer token for authentication.
- **Example Request**:
  ```http
  GET http://localhost:8080/events
  Authorization: Bearer <your_token_here>
  ```
- **Response**: A list of events.

### Create Event

- **Endpoint**: `POST /events/create`
- **Description**: Create a new event.
- **Request Headers**:
  - `Authorization`: Bearer token for authentication.
- **Request Body**:
  ```json
  {
      "title": "One piece",
      "description": "Completed watching, let's try again."
  }
  ```
- **Example Request**:
  ```http
  POST http://localhost:8080/events/create
  Authorization: Bearer <your_token_here>
  Content-Type: application/json
  {
      "title": "One piece",
      "description": "Completed watching, let's try again."
  }
  ```
- **Response**: The created event details.

### Update Event

- **Endpoint**: `POST /events/update`
- **Description**: Update an existing event.
- **Request Headers**:
  - `Authorization`: Bearer token for authentication.
- **Request Body**:
  ```json
  {
      "eventId": "65106e87a78d2fbe5fda8cae",
      "title": "Zorooooooooo"
  }
  ```
- **Example Request**:
  ```http
  POST http://localhost:8080/events/update
  Authorization: Bearer <your_token_here>
  Content-Type: application/json
  {
      "eventId": "65106e87a78d2fbe5fda8cae",
      "title": "Zorooooooooo"
  }
  ```
- **Response**: The updated event details.

### Delete Event

- **Endpoint**: `DELETE /events`
- **Description**: Delete an event by providing its ID as a query parameter.
- **Request Headers**:
  - `Authorization`: Bearer token for authentication.
- **Request Query Parameters**:
  - `eventId`: The ID of the event to delete.
- **Example Request**:
  ```http
  DELETE http://localhost:8080/events?eventId=65106e87a78d2fbe5fda8cae
  Authorization: Bearer <your_token_here>
  ```
- **Response**: No content (204).

---

## Clients

### Get Clients

- **Endpoint**: `GET /user`
- **Description**: Retrieve a list of clients (users).
- **Example Request**:
  ```http
  GET http://localhost:8080/user
  ```
- **Response**: A list of client (user) details.

---

## Rooms

### Create Room

- **Endpoint**: `POST /rooms/create`
- **Description**: Create a new room.
- **Request Headers**:
  - `Authorization`: Bearer token for authentication.
- **Request Body**:
  ```json
  {
      "name": "Solo",
      "description": "Anime group chat"
  }
  ```
- **Example Request**:
  ```http
  POST http://localhost:8080/rooms/create
  Authorization: Bearer <your_token_here>
  Content-Type: application/json
  {
      "name": "Solo",
      "description": "Anime group chat"
  }
  ```
- **Response**: The created room details.

### Get Rooms

- **Endpoint**: `GET /rooms`
- **Description**: Retrieve a list of rooms.
- **Request Headers**:
  - `Authorization`: Bearer token for authentication.
- **Example Request**:
  ```http
  GET http://localhost:8080/rooms
  Authorization: Bearer <your_token_here>
  ```
- **Response**: A list of room details.

---

## User Registration and Login

### Register

- **Endpoint**: `POST /user/register`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
      "email": "b@a.com",
      "password": "Iliyas@123",
      "password2": "Iliyas@123"
  }
  ```
- **Example Request**:
  ```http
  POST http://localhost:8080/user/register
  Content-Type: application/json
  {
      "email": "b@a.com",
      "password": "Iliyas@123",
      "password2": "Iliyas@123"
  }
  ```
- **Response**: User registration confirmation.

### Login

- **Endpoint**: `POST /user/login`
- **Description**: Log in an existing user.
- **Request Body**:
  ```json
  {
      "email": "b@a.com",
      "password": "Iliyas@123"
  }
  ```
- **Example Request**:
  ```http
  POST http://localhost:8080/user/login
  Content-Type: application/json
  {
      "email": "b@a.com",
      "password": "Iliyas@123"
  }
  ```
- **Response**: User authentication token.
