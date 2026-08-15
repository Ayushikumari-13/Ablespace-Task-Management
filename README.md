# 🚀 AbleSpace Task Management

A full-stack Task Management application developed to provide a simple, modern, and efficient way to create, manage, organize, and track tasks.

The project follows a separate **Frontend + Backend architecture**, making the application modular, maintainable, and scalable.

---

## 📌 Overview

**AbleSpace Task Management** is a web-based productivity application designed to help users manage their daily tasks from a centralized dashboard.

The application provides an intuitive interface for managing tasks, viewing task-related information, and configuring application settings.

The project is divided into two major parts:

- **Frontend** – User interface and client-side application
- **Backend** – REST APIs and server-side application logic

---

## ✨ Features

### 🔐 Authentication

- User login
- User registration
- Secure authentication flow
- Protected application access

### 📊 Dashboard

- Centralized task overview
- Clean and responsive dashboard
- Task-related information at a glance
- Easy navigation between application modules

### ✅ Task Management

- Create tasks
- View tasks
- Update tasks
- Delete tasks
- Manage task status
- Organize tasks efficiently

### ⚙️ Settings

- Application settings page
- User-related configuration
- Clean and accessible settings interface

### 📱 Responsive Design

- Responsive user interface
- Works across desktop and smaller screen sizes
- Clean and modern layout

---

# 🛠️ Technology Stack

## Frontend

- Next.js
- React.js
- TypeScript
- HTML5
- CSS
- JavaScript
- REST API Integration

## Backend

- NestJS
- Node.js
- TypeScript
- REST APIs

## Development Tools

- Git
- GitHub
- npm
- Visual Studio Code

---

# 🏗️ Project Architecture

The application follows a client-server architecture.

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Frontend       │
                    │   Next.js / React   │
                    └──────────┬──────────┘
                               │
                         REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │       Backend       │
                    │    NestJS / Node    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Database       │
                    └─────────────────────┘
