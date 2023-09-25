# React-NestJS Chat Application

Welcome to the React-NestJS Chat Application! This application allows users to authenticate, chat in rooms, communicate with clients, and manage events. It uses React for the front end and NestJS for the backend.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [Rooms](#rooms)
- [Clients](#clients)
- [Events](#events)

### Prerequisites

Before you begin, make sure you have the following installed:

- Node.js
- npm or yarn
- MongoDB (for NestJS backend)
- Another server with a GraphQL API endpoint for Events operations (referenced in the backend)

### Getting Started

1. Clone the repository:

   ```bash
   git clone <repo-link>
   ```

2. Navigate to the project directory:

   ```bash
   cd raftlabTasks
   ```

3. Install dependencies for both the React app and NestJS backend:

   ```bash
   # Install React app dependencies
   cd client
   yarn

   # Install NestJS backend dependencies
   cd ../server
   yarn
   ```

4. Configure your backend settings by creating & updating the `.env` file in the `server` directory and frontend settings by creating & updating the `.env` file in the `client` directory.

```
# frontend .env

VITE_BACKEND_BASE_URL=http://localhost:8080

# backend .env

SERVER_PORT=8080

MONGO_DB_URL=mongodb://localhost:27017/raftlabs

FRONTEND_URL="http://localhost:3000"

SECRET_KEY="come-string" should be same as in GraphQL API server that is in task1 directory's .env.

BACKEND_GRAPHQL_BASE_URL="http://localhost:8000"
```

5. Start the NestJS backend:

   ```bash
   cd server
   yarn run start:dev
   ```

6. Start the React app:

   ```bash
   cd ../client
   yarn dev --port 3000
   ```

7. Open your web browser and navigate to `http://localhost:3000` to access the UI of application.

### Authentication

- On the homepage, you will find "Login" and "Register" buttons.
- Click "Login" or "Register" to access the respective authentication forms.
- After successful authentication, you will be redirected to the homepage.
- On the homepage, you will find "Logout" to log out of the application.

### Rooms (need token)

- On the homepage, click the "Rooms" button to access the Rooms page.
- You can see a list of rooms and select any to start chatting using Socket.IO but if no rooms then create one.
- Use the "Create Room" button to create a new chat room.

### Clients (need token)

- On the homepage, click the "Clients" button to access the Clients page.
- You will see a list of users (clients) and can initiate chats with them using Socket.IO but if no clients then register with other account and play with them here.

### Events (need token)
- Before we begin with events make sure your GraphQL API server is up and running i.e 'BACKEND_GRAPHQL_BASE_URL' from .env of NestJs server.
- On the homepage, click the "Events" button to access the Events page.
- Here, you can view a list of events with "Edit" and "Delete" buttons for each event.
- Use the "Create Event" button to create new events. Note that this operation calls a GraphQL API on another server from NestJS server which the react app is connected .
---


