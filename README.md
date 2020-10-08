## Project Description

This is the Backend API server for BotB admin panel. Developed with Node Js for http server and Postgres for database. It can perform following operations -
1. Upload
2. Withdraw (this operation decreases the balance of user account by given amt).
3. Enquiry ( this operation returns the balance of user account etc).
4. Customer will receive emails on transactions.
5. The bank manager will be able to download excel of transaction histories for a specific time period for individual/a collection of customers.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine.

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* Postgres - Install the Postgres and setup the database server from the [Documentation](https://www.postgresql.org/docs/9.3/tutorial-install.html).

## Development tools 
- Postman
- VsCode (Editor)

## Installing
- `clone project or extract zip file in local machine`
- `npm i (to install all node modules)` 

## Configure app
Open `botb/config/config.json` then edit it with your settings.
```
    "username": "postgres",    (postgres username)
    "password": "root",    (postgres password)
    "database": "botb_dev",    (postgres database name)
    "host": "127.0.0.1",    (postgres host)
    "dialect": "postgres", 
    "server_port": 3000,    (port on which you want server to run)
    "secret": "shhhitsasecret",    (session secret)
    "logging": false,    (true/false, logs postgres query's)
    "domain": "localhost:3000",    (your site domain address)
    "email_host": "smtp.gmail.com",    (email host for sending mail)
    "email_from": "Botb",     (email name used while sending mail)
    "email_port": 587,    (email host smtp port)
    "email_service": "gmail",    (email service for sending mail)
    "email_secure": false,
    "email_id": "",    (email id used for sending mail)
    "email_pass": ""   (password for emailid given above)

```

## Before starting the server, run migrations to prepair the database
`npx sequelize db:migrate:all`

## Running the project
```
npm run dev
```