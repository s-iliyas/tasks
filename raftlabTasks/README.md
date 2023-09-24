# Task 1 Setup Guide

- Follow README.md present in task1 dir.

# Task 2 Setup Guide-1

- Task 2 Setup Guide-2 persent in task2 dir.

Task 2 is dependent on the GraphQL server from Task 1. This README will guide you through the setup process to ensure Task 2 works seamlessly with Task 1. Follow these steps to get started:

## Prerequisites

Before you begin, make sure you have the following prerequisites installed:

- Node.js
- npm (Node Package Manager)
- Task 1 GraphQL Server setup and running as per its README.md

## Task 1 SECRET_KEY Environment Variable

In order for Task 2 to work with the GraphQL server from Task 1, you must ensure that both projects share the same SECRET_KEY environment variable. This key is used for authentication and authorization.

1. Locate the `.env` file in Task 1's project directory.
2. Copy the SECRET_KEY value from Task 1's `.env` file.

   ```
   SECRET_KEY=your_secret_key_value
   ```

3. In Task 2's project directory, create or modify the `.env` file to set the SECRET_KEY to the same value as Task 1.

   ```
   SECRET_KEY=your_secret_key_value
   ```

## Running Task 2

To experience Task 2 in real-time, follow these steps to run both the React client app and the NestJS backend server:

### Running the React Client App (Task2/client)

1. Open a terminal and navigate to the `Task2/client` directory.
2. Install dependencies by running:

   ```
   yarn
   ```

3. Start the React app by running:

   ```
   yarn dev --port 3000
   ```

   This will launch the client application, and you can access it in your web browser at `http://localhost:3000`.

### Running the NestJS Backend Server (Task2/server)

- Follow README.md Guide present in task2.