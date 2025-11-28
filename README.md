# MatBook Assignment – Software Engineer

## Overview

This project is a full-stack dynamic form builder system for an "Employee Onboarding" form.  
The backend exposes a dynamic form schema and submission-related APIs.  
The frontend renders the form dynamically, handles form submissions, and displays prior submissions in a paginated and sortable table.

## Milestones

- **Milestone 1 – Frontend**
  - Dynamic form page
  - Submissions table page
  - TanStack Query / Form / Table
  - Tailwind CSS

- **Milestone 2 – Backend**
  - RESTful APIs
  - Validation against form schema
  - MongoDB Atlas persistence
  - Server-side pagination & sorting

## Tech Stack

- **Frontend:** React (Vite), JavaScript, Tailwind CSS, @tanstack/react-query, @tanstack/react-form, @tanstack/react-table
- **Backend:** Node.js, Express, MongoDB Atlas, Mongoose
- **Deployment:** I will after deployed

## How to Run Locally

### Backend

```bash
cd backend
npm install
# create .env with:
# MONGODB_URI=your_mongodb_atlas_uri
# PORT=4000
npm run dev
Backend runs at http://localhost:4000


### Frontend
cd frontend
npm install
# optional: create .env with:
# VITE_API_BASE_URL=http://localhost:4000/api
npm run dev
Frontend runs at http://localhost:5173