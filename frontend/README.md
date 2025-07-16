# Smart Complaint System – Frontend

## Overview
This is the frontend for the Smart Complaint System, a modern web application for managing and tracking complaints in an organization or institution. The frontend is built with React, uses Redux for state management, and Tailwind CSS for styling. It communicates with a Node.js/Express backend via RESTful APIs.

## Features
- Student and Admin dashboards
- Complaint submission, tracking, and management
- Profile management (view/edit profile, change password)
- Authentication (login/signup)
- Notification center
- Responsive and modern UI

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm (v8 or higher)

### Installation
1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the App
Start the development server:
```sh
npm run dev
```
The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Available Scripts
- `npm run dev` – Start the development server
- `npm run build` – Build the app for production
- `npm run preview` – Preview the production build
- `npm run lint` – Run ESLint for code quality

## Project Structure
```
frontend/
  ├── public/                # Static assets
  ├── src/
  │   ├── api/               # Axios instance and API utilities
  │   ├── assets/            # Images and static assets
  │   ├── components/        # React components
  │   │   ├── Admin/         # Admin dashboard and tools
  │   │   ├── Auth/          # Login, signup, auth forms
  │   │   ├── Landing/       # Landing and About Us pages
  │   │   ├── Student/       # Student dashboard, complaints, profile
  │   │   └── Navbar.jsx     # Main navigation bar
  │   ├── utils/             # Redux slices, helpers
  │   ├── App.jsx            # Main app component and routes
  │   └── main.jsx           # Entry point
  ├── package.json
  └── README.md
```

## Environment Variables
- The frontend expects the backend API to be running at `http://localhost:8000` by default (see `src/api/axiosInstance.js`).
- Update the `baseURL` in `axiosInstance.js` if your backend runs elsewhere.

## Contribution Guidelines
1. Fork the repository and create a new branch for your feature or bugfix.
2. Follow the existing code style and structure.
3. Test your changes before submitting a pull request.
4. Add clear commit messages and documentation as needed.

## License
This project is for educational and demonstration purposes.
