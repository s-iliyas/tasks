# FastAPI PostgreSQL and Redis API

This project is a FastAPI-based RESTful API service that uses Docker containers for PostgreSQL and Redis databases. It provides several endpoints for managing TODOs, comments, user authentication, and user information.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [1. `/v1/hello`](#1-v1hello)
  - [2. `/v2/hello`](#2-v2hello)
  - [3. `/login`](#3-login)
  - [4. `/setName`](#4-setname)
  - [5. `/getName`](#5-getname)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

## Features

- Manage TODOs using `/v1/hello` API.
- Manage comments using `/v2/hello` API.
- User authentication with email and password using `/login` API.
- Secure password storage with hashing and UUID generation.
- User-specific data stored in Redis.
- Update user's name using `/setName` API.
- Retrieve user's name using `/getName` API.

## Prerequisites

Before running the application, ensure you have the following installed:

- Docker
- Docker Compose
- Python 3.8+
- Virtual environment (optional but recommended)

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/s-iliyas/jobTask.git
   cd jobTask/API
   ```

2. Create a virtual environment (optional but recommended):

   ```bash
   python -m venv env
   source env/bin/activate  # On Windows, use: venv\Scripts\activate
   ```

3. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Start Docker containers for PostgreSQL and Redis:

   ```bash
   docker compose -f compose.dev.yml up dev_db -d --build
   docker compose -f compose.dev.yml up dev_redis_cache -d --build
   ```

5. Run the FastAPI application:

   ```bash
   uvicorn main:server --host 0.0.0.0 --port 8000 --reload
   ```

## Usage

The FastAPI application is now running at `http://localhost:8000`.

## API Endpoints

### 1. `/v1/hello`

Description: Get test data for TODOs.

HTTP Method: GET

### 2. `/v2/hello`

Description: Get test data for comments.

HTTP Method: GET

### 3. `/login`

Description: User login with username and password. If the user is not in the database, they will be created. Passwords are hashed, and a uuid is generated and stored in Redis as key with value user's username.

HTTP Method: POST

Request Body:
```
{
    "username" : "onepiece",
    "password" : "luffy"
}
```

Response Body:
```
{
    "message" : "User logged in."
}

```

Response Header:
```
Authorization : Bearer <uuid>
```

### 4. `/setName`

Description: Update the user's name. Requires a valid token i.e uuid header. This token is searched in redis then find it's respective username, with this
username query user then update name field.

HTTP Method: POST

Request Body:
```
{
    "name" : "zoro"
}
```

Request Header:
```
Authorization : Bearer <uuid>
```

Response Body:
```
{
    "message" : "Name updated."
}
```

### 5. `/getName`

Description: Retrieve the user's name. Requires a valid token header.

HTTP Method: GET

Reponse Body:
```
{
    "name" : "zoro"
}
```

## Authentication

The `/setName`, and `/getName` endpoints require a valid token in the header. To obtain a token, authenticate using the `/login` endpoint. The token should be included in the header of subsequent requests. This token is validated by fetching it's value which is username of user from redis then query, update, so on...

Example header for requests requiring authentication:
```
Authorization: Bearer your-access-token(uuid)
```

## Deployment

- FastAPI server can be deployed using docker containers with respective environments
```
   docker compose -f compose.dev.yml up -d --build   # for development
   docker compose -f compose.prod.yml up -d --build  # for production
```

- Here, nginx is used for proxy so FastAPI server is listening at http://localhost/api and also at http://localhost:8000

## Contributing

Contributions are welcome! Please fork this repository and create a pull request with your improvements.
Env files are pushed to git as there are no secrets in them so can have more understanding.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README.md template according to your project's specific needs and add any additional information you think is relevant.