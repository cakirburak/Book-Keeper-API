# Book Keeper API

## Table of Contents
1. [Introduction](#introduction)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Development](#development)
5. [Software Design Decisions](#software-design-decisions)
6. [License](#license)

## Introduction

This project is developed to demonstrate the functionality of a library management system to handle book cataloging, borrowing, returns using:
- Express.js v4.19.2
- PostgreSQL v10.14 ( DB )
- Sequalize v6 ( ORM )
- Validator.js v13.11.0 ( Validation of requests )

Here => [API Document](https://woolly-society-a2b.notion.site/Book-Keeper-API-Document-21eb6ac8d7ad47708cf2951a39607c31?pvs=4)

## Requirements

- [Node.js](https://nodejs.org/en/download/current) to install dependencies with npm
- [PostgreSQL](https://www.postgresql.org/download/) to create database

## Installation

```bash
# clone the repository
$ git clone https://github.com/cakirburak/Book-Keeper-API.git

# install dependencies
$ cd Book-Keeper-API && npm install
```

## Development
Make sure to created a database and provide its credentials in ```.env``` file in the root folder of the project which needs to be created by you;

```
PORT = <dev-port>
DB_USER = <your_db_username>
DB_PWD = <your_db_password>
DB_NAME= <your_db_name>
```

```bash
# run the application on local environment `http://localhost:<dev-port>/`
$ npm run dev
```

## Software Design Decisions

### API

- app -> router -> controller structure is implemented to handle different endpoints
- each route has a specific functionality which is defined in its controller
- controllers manages and makes desicions on what to do with recieved request

### DB

- Sequelize is used to help improve the data manipulation process
- Seeders located ```db/``` and are used for starting the application with provided schemas and dataset
- DB Schemas: ManyToMany relation is defined between user and book

![Schemas](https://imgtr.ee/images/2024/04/04/c5b34d68a58b664587ee9cb512776094.png)


## License

📄 This project is licensed under the [MIT License](LICENSE).
