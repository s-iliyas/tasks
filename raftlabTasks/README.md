### For Real time chat application of task 2 , play with react ui which is integrated with sockets and other APIs from both servers for client chat or room chat and event handling. So first set up database, then create .env files in both servers and client, then run single parent script 'npm install && npm run start' in raftlabTasks folder. Go through all README.md files of all folders and apiDocuments. For other APIs besides sockets go through postman collection json or import them into your postman and play with them.

# Docker Compose Configuration for MongoDB

This Docker Compose configuration sets up a MongoDB service using version 6.0 of the MongoDB image. It exposes the MongoDB database on port 27017 and mounts a volume to persist data in the `../data` directory on the host machine.

## Prerequisites

Before using this Docker Compose configuration, ensure you have the following prerequisites installed on your system:

- Docker: [Docker Installation Guide](https://docs.docker.com/get-docker/)
- Docker Compose: [Docker Compose Installation Guide](https://docs.docker.com/compose/install/)

## Usage

To run the MongoDB service with this Docker Compose configuration, follow these steps:

1. Clone this repository (if not already done):

   ```shell
   git clone <repository_url>
   cd raftlabTasks
   ```

2. Navigate to the directory containing the `docker-compose.yml` file.

3. Open a terminal in the directory with the `docker-compose.yml` file.

4. Run the following command to build and start the MongoDB service in detached mode:

   ```shell
   docker-compose up -d --build
   ```

   - `-d`: Run the containers in the background (detached mode).
   - `--build`: Build images before starting containers, useful when changes are made to the configuration.

5. Wait for the MongoDB service to start. You can check the status of running containers with the following command:

   ```shell
   docker-compose ps
   ```

6. MongoDB should now be accessible on `localhost:27017` from your host machine or from within other Docker containers.

## Data Persistence

This configuration uses a volume named `data` to persist MongoDB data. Data will be stored in the `../data` directory relative to the location of your `docker-compose.yml` file. Make sure the directory exists and has the necessary permissions.

## Cleanup

To stop and remove the MongoDB service and associated containers, run the following command:

```shell
docker-compose down
```

This will stop and remove the containers while preserving the data stored in the `../data` directory.

# Task 1 and Task 2 Combined Script

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
  - [start](#start)
  - [server1](#server1)
  - [server2](#server2)
- [Author](#author)
- [License](#license)

## Installation

Before using the scripts in this project, you need to ensure that you have Node.js and npm installed on your system. You'll also need Docker Compose for running the RaftLab tasks using Docker containers. Follow these steps to get started:

1. **Clone the Repository**: Clone this repository to your local machine using Git:

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to Project Directory**: Change your current working directory to the RaftLabTasks project folder:

   ```bash
   cd raftlabtasks
   ```

3. **Install Dependencies**: Install the project dependencies by running the following command:

   ```bash
   npm install
   ```

## Usage

Once you have installed the dependencies, you can use the provided npm scripts to manage RaftLab tasks. These scripts help you start and manage the necessary server components. Below, you'll find information about the available scripts.

## Scripts

### start

The `start` script is the main entry point for starting the RaftLabTasks project. It runs multiple npm scripts concurrently to start the required components of the project.

To start the project, simply run:

```bash
npm start
```

This will run the following tasks concurrently:

- `npm run server1`: Starts the first server component for Task 1.
- `npm run server2`: Starts the second server component for Task 2.
- `npm run dev --prefix task2/client`: Starts the development server for the Task 2 client (assuming it's located in the `task2/client` directory).

### server1

The `server1` script is responsible for starting the server component for Task 1. It performs the following steps:

1. Changes the current working directory to `task1`.
2. Installs dependencies using `npm i`.
3. Builds the project using `npm run build`.
4. Starts the server using `npm start`.

You can start the Task 1 server individually by running:

```bash
npm run server1
```

### server2

The `server2` script starts the server component for Task 2. It performs the following steps:

1. Changes the current working directory to `task2/server`.
2. Installs dependencies using `npm i`.
3. Starts the server using `npm start`.

To start the Task 2 server individually, run:

```bash
npm run server2
```

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

## Task 1 and Task 2 Environment Variable

In order for Task 2 to work with the GraphQL server from Task 1, you must ensure that both projects share the same SECRET_KEY environment variable. This key is used for authentication and authorization.

1. Locate the `.env` file in Task 1's project directory.
2. Copy the SECRET_KEY value from Task 1's `.env` file.

   ```
   SECRET_KEY=your_secret_key_value

   NODE_ENV='development'

   MONGO_DB_URL="mongodb://localhost:27017/raftlabsTask"

   SECRET_KEY="SOMERANDOMSTRINGISDFBI21893Y52TGWEGVHWUIWP29Q3Y5RKSDBF71T023FBP0VBFG23ET45YT0VH"

   ```

3. In Task 2's server project directory, create or modify the `.env` file to set the SECRET_KEY to the same value as Task 1.

   ```

   SERVER_PORT=8080

   MONGO_DB_URL="mongodb://localhost:27017/raftlabsTask"

   FRONTEND_URL="http://localhost:3000"

   SECRET_KEY="SOMERANDOMSTRINGISDFBI21893Y52TGWEGVHWUIWP29Q3Y5RKSDBF71T023FBP0VBFG23ET45YT0VH"

   BACKEND_GRAPHQL_BASE_URL="http://localhost:8000"

   ```

4. In Task 2's client project directory, create or modify the `.env` file.

```
VITE_BACKEND_BASE_URL=http://localhost:8080
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
