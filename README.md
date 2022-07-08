# Backend of Social Media Application

## Purpose
This is the backend of a social media application where users can post thoughts, connect with friends, and react to other users' thoughts. The purpose of this project is to provide a developer with a flexible database that is functionally useable on the frontend of their site. 

### User Story
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

## Application Details
Since this is purely a backend application, there is no live deployment. To use or test the app, follow the installation instructuions.

This application uses the mongoose package to connect the server to the MongoDB database.

### Installation
To use the app, clone the repository to your local machine and run an `npm install`. Then run `npm start` to start the server and automatically create the database. Test the API endpoints using your preferred method (Postman, Insomnia, etc.). 

Server will run locally on port 3001.

### Code Summary
There are 2 Models: User & Thought. The Thought Model also has a ReactionSchema defined for use only in the reactions array of the Thought.

API routes are split into the following files: user-routes and thoughts-routes. The thoughts-routes also contain endpoints for users to post and delete reactions. The user-routes contain endpoints for users to post and delete friends.

Each has api endpoints written for get all, get one based on id, delete one based on id, update one, and post one. 

The API endpoints are:
- /api/users
- /api/users/:id
- /api/users/:userId/friends/:friendId
- /api/thoughts
- /api/thoughts/:id
- /api/thoughts/:thoughtId/reactions

### Technologies Used
Backend: Javascript, Node.js

Project dependencies: Express.js, mongoose, Day.js (for dateFormat utility)

## Deployed Application

The first video demonstrates all criteria and routes except the delete routes: [Walkthru Video 1](https://drive.google.com/file/d/1vdI1M7ccTSw65hTlCDzDJWL0vTRok_t_/view)

Second video showcases all delete routes: [Walkthru Video 2](https://drive.google.com/file/d/1o4aGVLGKpfa4fnjOAmDoEFqryqQ-PYOk/view)
