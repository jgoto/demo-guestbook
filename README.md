[![.github/workflows/ci.yml](https://github.com/jgoto/demo-guestbook/actions/workflows/ci.yml/badge.svg)](https://github.com/jgoto/demo-guestbook/actions/workflows/ci.yml)

# Demo Guestbook

A full-stack web application built as a **production-style sandbox project** for exploring modern web architecture, authentication flows, API design, and automated testing strategies.

This project is intentionally structured to mirror the architecture and development workflow of larger-scale applications, with a strong focus on **maintainability, testability, and CI/CD integration**.

---

## Overview

The Demo Guestbook allows authenticated users to submit and retrieve guestbook entries through a modern full-stack architecture.

The application serves as a hands-on environment for experimenting with:

- frontend and backend integration
- third-party authentication
- database interactions
- automated test pipelines
- CI/CD workflows
- production-style state and provider management

Its primary purpose is to function as a **technical sandbox for engineering best practices**, rather than simply a basic CRUD demo.

---

## Features

- **Third-party authentication** powered by Supabase Auth
- **React-based frontend UI**
- **Node.js / Express backend API**
- **Form handling and validation**
- **Guestbook entry creation and retrieval**
- **Persistent PostgreSQL data storage**
- **Automated testing workflows**
- **CI/CD integration with GitHub Actions**

---

## Architecture

The application follows a layered full-stack architecture:

- **Frontend:** React
- **Backend:** Node.js + Express
- **Authentication:** Supabase Auth
- **Database:** Supabase PostgreSQL
- **Testing:** Playwright, Vitest, Jest, Postman
- **CI/CD:** GitHub Actions

### Stack Diagram

- React frontend communicates with both:
  - the Node backend API
  - Supabase authentication services
- Backend API handles business logic and data access
- Supabase manages authentication and database persistence

This separation allows realistic testing of:

- API request flows
- token validation
- provider state synchronization
- database integration behavior

---

## Tech Stack

### Frontend
- React
- JavaScript
- React Testing Library
- Vitest

### Backend
- Node.js
- Express
- Jest

### Database & Auth
- Supabase
- PostgreSQL

### Testing & CI
- Playwright
- Postman
- GitHub Actions

---

## Testing Strategy

This project is designed around a **multi-layered testing approach**.

### Implemented
- **Backend unit testing** with Jest
- **Targeted React integration tests** for components and hooks using Vitest + React Testing Library

### In Progress
- **End-to-end testing** with Playwright
- **API integration testing** with Postman

### Planned
- **Database integration testing**
- Expanded **authentication flow and provider state testing**

The testing pipeline is intended to simulate **real-world QA workflows**, from isolated units to full browser automation.

---

## Project Objective

The objective of this project is to build a small but realistic application that can be used to explore the engineering challenges typically found in larger systems.

Key areas of focus include:

- authentication race conditions
- frontend state synchronization
- backend API reliability
- automated regression testing
- CI/CD enforcement through test gates

This makes the project both a **portfolio piece** and a **technical learning platform**.

---

## Architecture Diagram

```text
┌───────────────────────────────┐
│        React Frontend         │
│   - UI Components             │
│   - State Management          │
│   - Form Validation           │
└──────────────┬────────────────┘
               │
               │ HTTP / API Requests
               ▼
┌───────────────────────────────┐
│      Node.js + Express API    │
│   - Business Logic            │
│   - Route Handlers            │
│   - Token Verification        │
└──────────────┬────────────────┘
               │
               │ SQL / Service Calls
               ▼
┌───────────────────────────────┐
│   Supabase PostgreSQL DB      │
│   - Guestbook Entries         │
│   - User Data                 │
└───────────────────────────────┘


Authentication Flow
────────────────────────────────

┌───────────────────────────────┐
│        React Frontend         │
└──────────────┬────────────────┘
               │
               │ Auth Request
               ▼
┌───────────────────────────────┐
│      Supabase Auth Service    │
│   - Login / Signup            │
│   - Session Tokens            │
└──────────────┬────────────────┘
               │
               │ JWT / Session
               ▼
┌───────────────────────────────┐
│        React Frontend         │
└──────────────┬────────────────┘
               │
               │ Bearer Token
               ▼
┌───────────────────────────────┐
│      Node.js + Express API    │
└───────────────────────────────┘
```

--- 

## CI/CD

GitHub Actions is used to run automated test suites as part of the development workflow.

This includes:

- test execution on push / pull request
- regression detection
- pipeline validation
- support for future deployment automation

## Contributing
At this time, contributions are not being accepted.
This project is intended for personal development and portfolio use, so external pull requests are not part of the current workflow.