
---

# Web Service README

## Introduction

This README provides information about the web service with an endpoint `/identify`, which allows you to add or update contact details based on email or phone number. The service is built using NestJS, utilizes a Mysql database via Prisma, and is hosted on Render.com.

## Getting Started

To use this web service, follow the steps below:

### Prerequisites

- Node.js (version X.X.X)
- npm or yarn
- PlanetScale database
- Render.com account (for deployment)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/s-iliyas/dealBergTask.git
   ```

2. Install dependencies:

   ```bash
   cd dealBergTask
   npm install
   ```

3. Set up your environment variables by creating a `.env` file and populating it with the necessary values:

   ```env
   DATABASE_URL=planetscale_url
   ```

### Database Setup

1. Create a Planetscale database and obtain the connection URL.

2. Configure Prisma to use this database by updating the `DATABASE_URL` variable in the `.env` file with your Planetscale URL.

3. Run Prisma migrations to create the database schema:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

### Running Locally

To run the service locally, use the following command:

```bash
npm run start:dev
```

The service will be available at `http://localhost:8000`.

## API Usage

### `/identify` Endpoint

This endpoint allows you to add or update contact details based on email or phone number.

- **Request:**

  Send a POST request to `/identify` with a JSON body containing either an email or a phone number. For example:

  ```json
  {
    "email": "john@example.com"
  }
  ```

  OR

  ```json
  {
    "phoneNumber": 1234567890
  }
  ```

  OR

  ```json
  {
    "email": "john@example.com",
    "phoneNumber": 1234567890
  }
  ```

- **Response:**

  If successful, the service will respond with an HTTP 200 status code and a JSON payload containing the consolidated contact information. For example:

  ```json
  {
    "contact": {
      "primaryContactId": 1,
      "emails": ["john@example.com"],
      "phoneNumbers": ["1234567890"],
      "secondaryContactIds": [2, 3]
    }
  }
  ```

## Deployment

This web service is deployed on Render.com. To deploy your own instance:

1. Create a Render.com account if you don't have one.

2. Create a new web service on Render.com, connect your GitHub repository, and configure the necessary environment variables.

3. Deploy the service.

## Contributing

If you'd like to contribute to this project, please follow the standard GitHub Fork and Pull Request workflow.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- NestJS - https://nestjs.com/
- Prisma - https://prisma.io/
- Render.com - https://render.com/

## Contact

If you have any questions or need further assistance, please contact [shaik.m.iliyas@gmail.com].

---
