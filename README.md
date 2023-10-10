# School Menu App

![School Menu App](/public/images/favicon.png)

## Description

The School Menu App is a user-friendly web application designed to streamline the management of school menus based on the choices made by administrators. This application is built using HTML, CSS, SCSS, and JavaScript. It leverages Express.js to create a server and define various CRUD routes. Additionally, it utilizes Express Handlebars to manage partial components, enhancing scalability. The application uses PostgreSQL as its database to store information about different menus. As a framework, Bootstrap is employed, along with other dependencies like SweetAlerts.

## Table of Contents

- [School Menu App](#school-menu-app)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
    - [Prerequisites](#prerequisites)
    - [Clone the Repository](#clone-the-repository)
    - [Install Dependencies](#install-dependencies)
    - [Compile SCSS to CSS](#compile-scss-to-css)
    - [Start the Application](#start-the-application)
  - [Features](#features)
  - [Dependencies](#dependencies)
  - [Contributions](#contributions)
  - [Author](#author)
  - [Repository](#repository)
  - [Live Example](#live-example)

## Usage

### Prerequisites

Before getting started, make sure you have the following tools installed on your system:

- Node.js: The application is built using Node.js.
- PostgreSQL: PostgreSQL is used as the database for storing school menu data.
- Git: Git is required for cloning the repository.

### Clone the Repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/zanozano/school-menu-app.git
```

### Install Dependencies

Once you have cloned the repository, navigate to the project folder and install the necessary dependencies:

```bash
cd school-menu-app
npm install
```

### Compile SCSS to CSS

To compile SCSS to CSS in real-time, use the provided script:

```bash
npm run scss
```

This script watches for changes in the SCSS files located in `public/scss/style.scss` and compiles them into CSS files located in `public/css/style.css`.

### Start the Application

To run the application, use the provided start script:

```bash
npm start
```

This script starts the server using Nodemon, which allows for automatic server restarts while you work on the project.

## Features

- **Menu Management**: Administrators can easily manage school menus based on their preferences.
- **Express.js**: The application uses Express.js to create a server and define CRUD routes.
- **Express Handlebars**: Handlebars templates are used for rendering, allowing for scalable and reusable components.
- **PostgreSQL Database**: PostgreSQL is employed to store and manage data related to school menus.
- **Bootstrap**: Bootstrap is used for creating a responsive and user-friendly interface.
- **SweetAlert2**: SweetAlert2 enhances user experience with customizable pop-up alerts.

## Dependencies

Here are some of the key dependencies used in this application:

- **body-parser**: Parse incoming request bodies in Express.js.
- **bootstrap**: The Bootstrap framework for styling and responsiveness.
- **cors**: Enable CORS (Cross-Origin Resource Sharing) in Express.js.
- **dotenv**: Load environment variables from a `.env` file.
- **express**: Web application framework for Node.js.
- **express-handlebars**: Handlebars view engine for Express.js.
- **jsonwebtoken**: Generate JSON Web Tokens (JWT) for user authentication.
- **moment**: A JavaScript library for parsing, validating, and formatting dates and times.
- **nodemon**: Automatically restart the server during development.
- **pg**: PostgreSQL client for Node.js.
- **scss**: SCSS compiler for stylesheets.
- **sweetalert2**: Create beautiful and customizable pop-up alerts.

## Contributions

We welcome contributions to the School Menu App project. To get involved, please follow our guidelines for reporting issues, requesting features, or submitting pull requests in the GitHub repository.

## Author

Author: Cristobal Manzano

## Repository

- Type: Git
- URL: [https://github.com/zanozano/school-menu-app](https://github.com/zanozano/school-menu-app)

## Live Example

See the School Menu App in action by visiting the following hosted link:

[Live School Menu App](link-to-live-example.com)
