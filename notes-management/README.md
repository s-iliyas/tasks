# Project Setup and Deployment Guide

## Overview

This guide will help you set up, run, and test the NestJS application. It includes steps for decrypting environment variables, setting up and running Docker containers, installing dependencies, and running end-to-end (e2e) tests.

## Prerequisites

Ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/en/download/) (version 18.x or later recommended)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)

## Setup Instructions

### 1. Decrypt Environment Variables

The environment variables are encrypted and need to be decrypted using the `decrypt.sh` script.

1. **Navigate to the `scripts` folder:**

   ```bash
   cd scripts
   ```

2. **Run the decryption script:**

   ```bash
   ./decrypt.sh <password> development
   ```

### 2. Build and Run Docker Containers

The application uses Docker. Follow these steps to build and run the Docker containers:

1. **Navigate to the `deployments` folder:**

   ```bash
   cd deployments
   ```

2. **Build and run the Docker container:**

   ```bash
   docker compose -f docker-compose.yml up -d --build
   ```

   This command builds the Docker images and starts the containers.

### 3. Install Node Modules

If running the application outside Docker, install the necessary Node modules:

1. **Navigate to the project root directory:**

   ```bash
   cd ..
   ```

2. **Install the modules:**

   ```bash
   npm install
   ```

### 4. Run the NestJS Application

For local development (outside Docker), start the NestJS application:

```bash
npm run start:dev
```

The application will be available at `http://localhost:8000`.

### 5. Access Swagger API Documentation

The API documentation is available via Swagger. Open your web browser and go to:

```
http://localhost:8000/docs
```

Here you can explore the available endpoints and try out the API requests.

### 6. Run End-to-End (e2e) Tests

To verify the functionality of the application, run the end-to-end tests:

1. **Run the e2e tests:**

   ```bash
   npm run test:e2e
   ```

   This command executes the end-to-end tests defined for the application.

## Troubleshooting

- **Decryption Issues:** If decryption fails, verify that the password is correct and that the `decrypt.sh` script has execution permissions (`chmod +x decrypt.sh`).

- **Docker Issues:** If Docker commands fail, ensure Docker is properly installed and running. Check Docker logs for error messages.

- **Test Failures:** If e2e tests fail, review the test output for specific errors and ensure the application is running and accessible at the expected endpoints.
