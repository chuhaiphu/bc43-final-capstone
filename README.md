<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
  <div align="center">
  <h1>A Backend Application for Movie Ticket Booking Platform</h1>
  <h2>Using NestJS Framework</h2>
  <br>
  </div>
  
  ## Description
  This is a backend application for a movie ticket booking platform. It is built using NestJS framework and Prisma ORM. It is a RESTful API that provides endpoints for managing users,  movies, cinemas, showtimes, and ticket bookings.

## Main Features

- **Authentication:** Login, Register, Forgot Password, Reset Password using JWT and Passport library.

- **Authorization:** Role-based API access control. Three roles: Admin, Manager and User with different permissions.

  * Role Admin: Full access to all features, can add Manager

  To login with admin, use { "email": "admin@example.com", "password": "admin" }

  * Role Manager: Manage movies, cinemas, and showtimes

  * Role User: Book tickets and view personal information

- **CRUD:** Create, Read, Update, Delete movies, cinemas, showtimes and ticket bookings.

- **3rd party:** Cloudinary for image storage. Prisma for Database ORM.

 For further information, after starting the project, please visit <a href="[project-url]/swagger" target="_blank"><strong>[project-url]/swagger</strong></a> for API documentation.

## Getting Started
### Prerequisites
Here's what you need to be able to run this project:
- Node.js (version >= 20)
- Postgres Database or any other relational database that Prisma supports
- Cloudinary account
- Docker Desktop (optional - if you haven't had database install in your local machine yet)

### 1. Clone the repository
```shell
git clone https://github.com/chuhaiphu/bc43-final-capstone
```

### 2. Install dependencies

```shell
yarn install
```

### 3. Configure environment variables
Create a .env file in project root folder and fill in your configuration information
<br>
** Note: Mailer is for sending email to reset password. You can use any email service provider.
```shell
DATABASE_URL= your database url
JWT_ACCESS_TOKEN_SECRET_KEY= your jwt access token secret key
JWT_REFRESH_TOKEN_SECRET_KEY= your jwt refresh token secret key
CLOUDINARY_URL= your cloudinary url
MAILER_HOST= your mailer host
MAILER_PORT= your mailer port
MAILER_EMAIL= your mailer email
MAILER_NAME= your mailer name
MAILER_APP_PASSWORD= your mailer app password
```

### 4. Build and run
Start your Docker image Postgres Database or run your local database.
<br>
Run the app
```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
