# Community Events Website

## Database Setup

To set up the database, you will need to install MongoDB Compass. Download it from the following link:
[https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass)

After installation, start a new connection in MongoDB Compass using the following connection string:
`mongodb://localhost:27017/blog`

## Commands to Run

Follow these steps to run the application components:

1.  **Start Client:**
    *   Navigate to the `client` folder.
    *   Run the command: `yarn start`

2.  **Start API (Nodemon):**
    *   Navigate to the `api` folder.
    *   Run the command: `nodemon`
    *   *Note: If you don't have Nodemon installed, you may need to install it globally first (e.g., `npm install -g nodemon`).* This command starts `index.js` and provides live refreshing during development.

3.  **Connect to MongoDB Shell (mongosh):**
    *   From the main `4F1B` folder, run the following command:
        `mongosh --host localhost --port 27017`
    *   This will connect to your MongoDB instance running via Compass and allow you to interact with the database.
    *   To view users in the `blog` database from the `mongosh` terminal, use these commands:
        *   Switch to the `blog` database: `use blog`
        *   Find all users: `db.users.find()`

## Functionalities

The application currently supports the following core functionalities:

*   **User Management:**
    *   Registration
    *   Login
*   **Dynamic Posts:**
    *   Images
    *   Titles
    *   Summaries
