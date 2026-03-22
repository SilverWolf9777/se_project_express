# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Project Description

This is a RESTful API backend for the WTWR (What to Wear?) application. The API provides endpoints for:

- **User Management**: Create and retrieve user profiles with user information including name and avatar URL
- **Clothing Items**: Create, retrieve, and delete clothing items organized by weather type
- **Like/Unlike Functionality**: Users can like and unlike clothing items using MongoDB array operations ($addToSet and $pull)

The server handles data validation, error handling with appropriate HTTP status codes, and maintains relationships between users and clothing items through MongoDB references.

## Technologies & Techniques

- **Express.js** - Web framework for building the REST API
- **MongoDB** - NoSQL database for storing users and clothing items
- **Mongoose** - ODM (Object Data Modeling) library for MongoDB with schema validation
- **Node.js** - JavaScript runtime environment
- **Nodemon** - Development tool for auto-restarting the server during development
- **ESLint & Prettier** - Code linting and formatting tools
- **Validator** - Library for URL validation in schema fields

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12

### project demo video

[click here to see project demo](https://youtu.be/7foTjOBMa5c)
