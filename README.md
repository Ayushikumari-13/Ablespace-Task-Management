AbleSpace Task Management

A full-stack Task Management System built for the AbleSpace Full Stack
Developer technical assessment.

Dashboard Preview

Features

Guest login with JWT access token

Responsive task-management dashboard

Sidebar navigation

Create tasks

Task title and description

Task status: To Do, In Progress, Completed

Optional due date

Dashboard statistics for Total, To Do, In Progress and Completed
tasks

Update task status

Delete tasks

Empty-state UI

Light/dark theme support

MongoDB persistence

REST API

Frontend/backend separation

Tech Stack

Frontend

Next.js 16

React

TypeScript

Tailwind CSS

Next.js App Router

Backend

Node.js

TypeScript

NestJS

REST API

JWT authentication

MongoDB

Project Structure

ABLESPACE-TASK-MANAGEMENT/
├── backend/
├── frontend/
├── docs/
│   └── dashboard.png
└── README.md

Getting Started

Prerequisites

Node.js 18+

npm

MongoDB

Clone

git clone https://github.com/Ayushikumari-13/Ablespace-Task-Management.git
cd Ablespace-Task-Management

Backend Setup

cd backend
npm install
npm run start:dev

Create backend/.env:

PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/ablespace
JWT_SECRET=change-this-development-secret
FRONTEND_URL=http://localhost:3000

Backend URL:

http://localhost:4000

Frontend Setup

Open another terminal:

cd frontend
npm install
npm run dev

Frontend URL:

http://localhost:3000

Guest Login

The frontend uses:

POST /api/auth/guest

After a successful guest login, the returned access token is stored in
browser local storage and the user is redirected to /dashboard.

Task Workflow

Open http://localhost:3000.

Click Continue as Guest.

Open the dashboard.

Click + Add Task.

Enter the title, description, status and optional due date.

Create the task.

Update the task status as work progresses.

Delete tasks when required.

Verify that dashboard statistics update correctly.

API

Authentication

POST http://localhost:4000/api/auth/guest

Task operations are consumed through the frontend task API hook.

Environment Variables

Do not commit real .env files or secrets.

Example:

PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/ablespace
JWT_SECRET=your-secret-here
FRONTEND_URL=http://localhost:3000

For production, use a strong JWT secret and a production MongoDB
connection string.

Build Verification

Run:

cd frontend
npm run build

Before submission, verify:

Guest login

Dashboard loading

Task creation

Status updates

Task deletion

MongoDB connectivity

Page refresh behaviour

Desktop and mobile layouts

Deployment

Before deployment:

Deploy the backend.

Configure production MongoDB.

Configure production environment variables.

Deploy the frontend.

Replace the local API URL with the production backend URL.

Test guest login on the live site.

Test create/update/delete task flows.

Test desktop and mobile layouts.

Live Application

Live URL: Add after deployment.

Backend API URL: Add after deployment.

Part 2 -- Product Understanding

The assessment also asks for an exploration of the AbleSpace Take Data
screen from the Caseload tab.

Submit either:

A document containing screenshots and the workflow explanation, or

A walkthrough video.

Add the final screenshots/video link and UX/UI observations here before
submission.

Assessment Checklist

Requirement                   Status

Next.js frontend              Done
Tailwind CSS                  Done
Guest Login                   Done
Reusable components           Done
Task management dashboard     Done
Theme support                 Done
MongoDB                       Done
REST API                      Done
Public GitHub repository      Done
README                        Done
Working deployed URL          Add after deployment
Part 2 submission             Add before submission
Multiple meaningful commits   Continue with small commits

Author

Ayushi Kumari

GitHub: https://github.com/Ayushikumari-13

License

Developed as a technical assessment project for evaluation purposes.
