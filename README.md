# BearBuddy Frontend

BearBuddy is a web app prototype designed for a senior capstone project. It provides a mobile-first dashboard for students to manage daily campus schedules, navigate buildings, and view route details.

---

## Tech Stack

* **Framework**: React (Vite)
* **Routing**: react-router-dom
* **State & Persistence**: React Hooks (useState, useEffect) and browser localStorage
* **Styling**: Native CSS and scoped inline styles

---

## Setup & Installation

### Prerequisites
* Node.js (v18+)
* npm

### Steps

1. Clone the repository:
   git clone https://github.com/poudelbeeplop/BearBuddy-frontend.git
   cd BearBuddy-frontend

2. Install dependencies:
   npm install

3. Run the development server:
   npm run dev

4. Open the local link printed in your terminal (typically http://localhost:5173) in your browser.

---

## Project Structure

* src/components/ - UI components (PillNav, navigation)
* src/pages/ - Page views (TodayPage, MapPage, SchedulePage, SecurityPage)
* src/services/ - Session management and data persistence
* src/constants/ - Routes and design values
* src/App.jsx - Router setup and persistent mobile frame layout

---

## Current Status

The application operates as a client-side prototype using browser localStorage. It is structured to connect directly to the team's SQL database API endpoints once the backend is ready.
