# Demo Guestbook

## Features
- Third-party authentication via Supabase
- Form submission and validation
- Data creation and retrieval
- HTTP backend API
- React-based frontend presentation
- Automated testing pipeline

## Objective
The objective of this project is to create a robust, production-style web application that reflects real-world architecture and serves as a solid foundation for implementing industry-standard automated testing methodologies.

## Tech Stack
- React
- Node.js
- Express
- Supabase
- PostgreSQL
- JavaScript

## Testing
- End-to-end testing through Playwright (**planned**)
- API integration testing through Postman (**in progress**)
- Database integration testing with Jest
- Backend unit testing with Jest

### API Testing - Postman
A Postman collection for manual and integration API testing is included in this repository.

Location:
`/postman/guestbook-api.postman_collection.json`

Import this collection into Postman to test:
- authentication flows
- protected routes
- message creation
- data retrieval

## Installation
- copy project from github
- example .env
- setup supabase
- run 