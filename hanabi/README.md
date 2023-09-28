# Web Application README

This web application is a simple user data management system built with Next.js for the frontend and Nest.js for the backend. Users can access a landing page, submit and update their information via a form, and have their data stored in a MongoDB database using Prisma.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Frontend](#frontend)
  - [Homepage](#homepage)
  - [Form Page](#form-page)
  - [Result Page](#result-page)
- [Backend](#backend)
  - [API Endpoints](#api-endpoints)
- [Usage](#usage)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js: Make sure you have Node.js installed (v14 or later).

### Installation

1. Clone this repository:

   ```bash
   git clone <repo-url>
   ```

2. Navigate to the project's root directory:

   ```bash
   cd hanabi
   ```

3. Install dependencies for both the frontend and backend:

   ```bash
   # Install frontend dependencies
   cd interface
   yarn

   # Install backend dependencies
   cd ../services
   yarn
   ```

## Frontend

The frontend of this application is built with Next.js. It consists of three main pages:

### Homepage

- **Description**: The landing page where users can enter their username to access the form.
- **URL**: `/`
- **Features**:
  - An input field for entering the username.
  - A submission button to access the form.
- **Functionality**:
  - When the user submits the form, a GET request is made to the backend API (`GET /user/:username`) to fetch user data. If data exists, it's used to pre-fill the form fields on the Form Page.

### Form Page

- **Description**: The page where users can fill out and submit the form.
- **URL**: `/form`
- **Features**:
  - Form inputs for phone number, email, name, and date of birth.
  - "Submit" and "Cancel" buttons.
- **Functionality**:
  - If the user has pre-existing data, the form fields are pre-filled.
  - Clicking "Submit" makes a POST request to the backend API (`POST /user/create` for new users or `POST /user/update` for existing users) to save or update the form data in MongoDB using Prisma.
  - Clicking "Cancel" returns the user to the Homepage.

### Result Page

- **Description**: The page displaying a congratulatory message upon successful form submission.
- **URL**: `/confirmation`
- **Features**:
  - A congratulatory message.
  - A button to return to the Homepage.

## Backend

The backend of this application is built with Nest.js and provides the following API endpoints:

### API Endpoints

### GET / (Homepage)
- **Description**: This endpoint is used to access the landing page of the application.
- **HTTP Method**: GET
- **URL**: `/`
- **Response**:
  - Status Code: 200
  - Body: "Server running..."

### GET /user/:username (Fetch User Data)
- **Description**: This endpoint fetches user data based on the provided username.
- **HTTP Method**: GET
- **URL**: `/user/:username`
- **Response**:
  - Status Code: 200
  - Body: JSON object containing user data if user not exists. For example:
    ```json
    {
      "username": "s-iliyas"
    }
    ```

### POST /user/create (Create User)
- **Description**: This endpoint is used to create a new user with the submitted form data.
- **HTTP Method**: POST
- **URL**: `/user/create`
- **Request Body**: JSON object with user data. For example:
  ```json
  {
    "name": "Shaik Mohammed Iliyas",
    "username": "s-iliyas",
    "email": "shaik@gmail.com",
    "phoneNumber": "+919182189384",
    "dob": "30-01-1999"
  }
  ```
- **Response**:
  - Status Code: 200
  - Body: JSON object containing the saved user data, which should match the submitted data.

### POST /user/update (Update User)
- **Description**: This endpoint is used to update an existing user's form data with the submitted data.
- **HTTP Method**: POST
- **URL**: `/user/update`
- **Request Body**: JSON object with updated user data. For example:
  ```json
  {
    "name": "Iliyas Shaik",
    "username": "s-iliyas",
    "email": "shaik@gmail.com",
    "phoneNumber": "+919182189384",
    "dob": "30-01-1999"
  }
  ```
- **Response**:
  - Status Code: 200
  - Body: JSON object containing the updated user data, which should match the submitted data.

### GET /user/:username (Fetch Updated User Data)
- **Description**: This endpoint fetches user data based on the provided username after an update.
- **HTTP Method**: GET
- **URL**: `/user/:username`
- **Response**:
  - Status Code: 200
  - Body: JSON object containing the updated user data, which should match the updated data submitted using the `/user/update` endpoint.

The backend connects to a MongoDB database using Prisma for data storage.

### Test Suites

- Backend NestJs server application has 2 test suites namely for UserService, User Controller. To test all cases present in them run below command to watch in services directory.
```
yarn run test:watch
```

### E2E Test

- Backend NestJs server application has a e2e test. To test all cases run below command to watch in services directory.
```
yarn run test:e2e
```

## Usage
- Before running backend server add .env file in services folder and add mongodb url in it.
```
## .env format

DATABASE_URL="mongodb+srv://username:password@********.********.mongodb.net/collectionName?retryWrites=true&w=majority"

```

1. Start the backend server `http://localhost:8000`:

   ```bash
   cd backend
   npm run start
   ```

2. Start the frontend server:

   ```bash
   cd frontend
   npm run dev
   ```

3. Access the application ui in your browser at `http://localhost:3000`.
