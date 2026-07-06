# IT-SUM Frontend

Enterprise-grade frontend architecture for **IT-SUM**, a modern educational platform built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

The frontend is designed around scalability, maintainability, performance, and a feature-oriented architecture, making it suitable for large educational systems with multiple user roles.

---

# Features

* Modern App Router Architecture
* React Server Components
* Feature-Based Folder Structure
* TypeScript First
* Tailwind CSS v4
* Shadcn UI Components
* Dark / Light Theme Support
* TanStack Query
* Zustand State Management
* React Hook Form + Zod Validation
* Axios API Layer
* Reusable UI System
* Authentication Ready
* Modular Providers
* Enterprise Scalable Structure

---

# Tech Stack

| Category         | Technology          |
| ---------------- | ------------------- |
| Framework        | Next.js 16          |
| UI               | React 19            |
| Language         | TypeScript          |
| Styling          | Tailwind CSS v4     |
| Components       | Base UI + Shadcn UI |
| Icons            | Lucide React        |
| Animation        | Motion + GSAP       |
| State Management | Zustand             |
| Server State     | TanStack Query      |
| Forms            | React Hook Form     |
| Validation       | Zod                 |
| Theme            | next-themes         |
| HTTP Client      | Axios               |
| Notifications    | Sonner              |

---

# Project Structure

## App Router

```text
app
│
├── error.tsx
├── favicon.ico
├── globals.css
├── layout.tsx
├── loading.tsx
├── not-found.tsx
├── page.tsx
│
├── (admin)
├── (auth)
├── (public)
├── (student)
└── api
```

---

## Source Structure

```text
src
│
├── assets
│   ├── fonts
│   ├── icons
│   └── images
│
├── components
│   ├── common
│   ├── forms
│   ├── layouts
│   ├── shared
│   └── ui
│
├── config
├── constants
├── features
│   ├── auth
│   ├── dashboard
│   ├── profile
│   ├── quizzes
│   ├── subjects
│   └── summaries
│
├── hooks
├── lib
├── middleware
├── providers
├── schemas
├── services
├── stores
├── styles
└── types
```

---

# Folder Responsibilities

## app/

Contains all App Router pages, layouts, loading states, route groups, and global application configuration.

---

## assets/

Stores static frontend assets.

```text
fonts/
icons/
images/
```

---

## components/

Reusable UI components shared across the application.

```text
common/
forms/
layouts/
shared/
ui/
```

---

## config/

Centralized application configuration.

Examples:

* API Endpoints
* Environment Variables
* Navigation
* Metadata
* Routes
* Sidebar Configuration

---

## constants/

Application-wide constants.

Examples:

* API Constants
* Cookie Keys
* Local Storage Keys
* Permissions
* Roles
* Regex Patterns
* Query Keys

---

## features/

Feature-based application modules.

Each feature owns its:

* Components
* Hooks
* Services
* Schemas
* Types

Current modules:

* Authentication
* Dashboard
* Profile
* Subjects
* Summaries
* Quizzes

---

## hooks/

Reusable custom React hooks.

---

## lib/

Core utilities and infrastructure.

Includes:

* Axios Instance
* API Client
* Authentication Helpers
* Query Client
* Font Configuration
* Utility Functions
* Interceptors

---

## middleware/

Frontend middleware utilities.

* Authentication
* Permission Guards

---

## providers/

Global React Providers.

* Theme Provider
* Query Provider
* Application Provider

---

## schemas/

Zod validation schemas.

---

## services/

API communication layer.

Each service communicates with backend endpoints.

---

## stores/

Global Zustand stores.

Examples:

* Authentication
* UI
* Application State

---

## styles/

Global style utilities and design tokens.

---

## types/

Shared TypeScript types.

Examples:

* API
* Auth
* User
* Subjects
* Summaries
* Pagination
* Requests
* Responses

---

# Architecture Principles

* Feature-first architecture
* Separation of concerns
* Reusable UI components
* Typed API layer
* Centralized configuration
* Scalable state management
* Server-first rendering
* Minimal client components
* Maintainable folder structure

---

# State Management

## Client State

* Zustand

Used for:

* Authentication
* UI State
* Global App State

---

## Server State

TanStack Query manages:

* Data Fetching
* Caching
* Background Refetching
* Mutations
* Optimistic Updates

---

# Forms

Validation stack:

* React Hook Form
* Zod

Provides:

* Type-safe forms
* Runtime validation
* Better developer experience

---

# Styling

The project uses:

* Tailwind CSS v4
* CSS Variables
* Design Tokens
* Responsive Utilities

---

# Animations

* Motion
* GSAP

Used for:

* Page transitions
* UI interactions
* Hero animations
* Scroll animations

---

# Theme Support

Powered by:

* next-themes

Supports:

* Light Theme
* Dark Theme
* System Theme

---

# UI Components

Built using:

* Base UI
* Shadcn UI
* Lucide React

All components are reusable and accessible.

---

# Networking

Axios provides:

* Centralized API Client
* Request Interceptors
* Response Interceptors
* Authentication Handling
* Error Handling

---

# Performance

Frontend is optimized using:

* React Server Components
* Code Splitting
* Lazy Loading
* Optimized Fonts
* Static Rendering
* Streaming
* Suspense
* Partial Prerendering
* Image Optimization

---

# Installation

```bash
git clone <repository>

cd frontend

npm install
```

---

# Development

Start the local development server.

```bash
npm run dev
```

Application:

```text
http://localhost:3000
```

---
# Environment Variables

Create a `.env` file in the project root using the provided example.

```bash
copy .env.example .env
```

Update the environment variables before running the application.

Example:

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1

# Application
NEXT_PUBLIC_APP_NAME=IT-SUM

# Environment
NODE_ENV=development
```

> **Important**
>
> Never commit `.env` files to the repository.
>
> Only update `.env.example` when new environment variables are introduced.

---


# Required Checks (Before Every Commit)

Every change **must** pass the development quality gate before it can be committed or submitted for review.

```bash
npm run check
```

This command verifies:

* TypeScript type safety
* ESLint rules
* Code formatting
* Unit tests
* Production build

If **any** step fails, the code **must not** be committed or merged.

---

# Final Verification (Before Pull Request / Merge)

Before opening a Pull Request or merging into the main branch, run the complete verification pipeline.

```bash
npm run check:full
```

This command additionally verifies:

* Test coverage
* End-to-end tests
* Security audit

A Pull Request **must not** be merged unless this command completes successfully.

---

# Production Build

Generate the optimized production build.

```bash
npm run build
```

Run the production server.

```bash
npm run start
```


# Development Dependencies

```text
Next.js 16
React 19
TypeScript
Tailwind CSS v4
TanStack Query
Axios
Zustand
React Hook Form
Zod
Motion
GSAP
Base UI
Shadcn UI
Lucide React
Sonner
next-themes
```

---

# Design Goals

* Enterprise Ready
* High Performance
* Modular
* Maintainable
* Scalable
* Reusable
* Type Safe
* Accessible
* Developer Friendly

---

# Future Improvements

* Internationalization (i18n)
* Offline Support (PWA)
* Storybook
* Unit Testing
* End-to-End Testing
* Performance Dashboard
* Accessibility Auditing
* Feature Flags
* Error Monitoring
* Analytics Integration

---

# License

This project is part of the **IT-SUM** ecosystem and is intended for educational and institutional use.
