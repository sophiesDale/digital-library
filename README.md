# Digital Library

## Description

This project is a digital library application designed to help readers keep track
of the books they own and their reading progress.

The goal of the project is to provide an organized overview of a personal book
collection and make it easier to manage owned and read books.

---

## Live Application

https://digital-library-o2b0.onrender.com

---

## Project Vision and Features

The full project is planned to include the following features:

* User registration and login
* Personal book collections per user
* Create, update, and delete book entries
* Categorize and organize books
* Track reading status (owned, reading, finished)
* Offline mode with synchronization when back online
* Progressive Web App (PWA) support

---

## Current Implementation

The current version of the project includes:

* REST API built with Node.js and Express
* Deployment on Render (cloud hosting)
* Working endpoints for managing books
* Environment variable configuration for database connection
* Backend structure prepared for PostgreSQL integration

---

## Database (PostgreSQL)

* PostgreSQL database hosted on Render
* Connection handled through environment variables (`DATABASE_URL`)
* Backend prepared for persistent data storage

Note: Full persistence for all routes (e.g. books/users) can be further expanded as the project evolves.

---

## Deployment

* Backend is deployed using Render
* Live API is accessible via the URL above
* Automatic deploys connected to GitHub

---

## Technical Stack

* Backend: Node.js, Express
* Database: PostgreSQL
* Hosting: Render
* API Testing: Postman

---

## Project Plan

Project progress and feature breakdown are planned to be tracked using a project
management tool (such as Trello), with features broken down into smaller work items.

https://trello.com/invite/b/696d432c8a5710bfef0aed60/ATTIb797a010344cbeae863f6083c82f9aa3E1A6D478/library

---

## Testing

The API was tested using Postman.
Requests were sent to the deployed API endpoints to verify correct behavior
for creating, retrieving, updating, and deleting data.

---

## Summary

This project demonstrates:

* Building a REST API with Express
* Deploying a backend to the cloud
* Connecting to a PostgreSQL database
* Structuring a scalable backend architecture
