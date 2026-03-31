# Hospital Management System - Frontend

A responsive and modular React-based frontend for the Hospital Management System. This client-side application communicates with a dedicated Node.js/Express REST API backend to deliver a complete hospital management experience, covering patient records, appointments, and administrative workflows.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Connecting to the Backend](#connecting-to-the-backend)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Routing | React Router DOM v7 |
| HTTP Client | Axios |
| Notifications | React Hot Toast, React Toastify |
| Icons | React Icons |
| Carousel | React Multi Carousel |
| Linting | ESLint 9 with React Hooks plugin |

---

## Project Structure

```
frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## Getting Started

### Prerequisites

Ensure the following are installed on your system before proceeding:

- Node.js >= 18.x
- npm >= 9.x
- The [Hospital Management System Backend](https://github.com/Shubham8468) must be running locally or deployed

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Shubham8468/hospital-management-frontend.git
cd hospital-management-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and configure your environment variables (see [Environment Variables](#environment-variables)).

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## Environment Variables

Create a `.env` file in the root of the project with the following variables:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

> All environment variables exposed to the client must be prefixed with `VITE_` for Vite to include them in the build.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Starts the Vite development server with Hot Module Replacement |
| `npm run build` | Builds the application for production to the `dist/` folder |
| `npm run preview` | Serves the production build locally for testing |
| `npm run lint` | Runs ESLint across all `.js` and `.jsx` files |

---

## Connecting to the Backend

This frontend is designed to work exclusively with the Hospital Management System backend built with Node.js and Express.

- Backend Repository: [hospital-management-backend](https://github.com/Shubham8468)
- All API requests are made using Axios with the base URL configured via the `VITE_API_BASE_URL` environment variable.
- Ensure the backend server is running before starting the frontend application.

---

## Dependencies

### Production

| Package | Version | Purpose |
|---|---|---|
| react | ^19.2.4 | Core UI library |
| react-dom | ^19.2.4 | DOM rendering for React |
| react-router-dom | ^7.13.2 | Client-side routing |
| axios | ^1.14.0 | HTTP requests to the backend API |
| react-hot-toast | ^2.6.0 | Lightweight toast notifications |
| react-toastify | ^11.0.5 | Advanced notification system |
| react-icons | ^5.6.0 | Icon library |
| react-multi-carousel | ^2.8.6 | Responsive carousel component |

### Development

| Package | Version | Purpose |
|---|---|---|
| vite | ^8.0.1 | Build tool and dev server |
| eslint | ^9.39.4 | Code linting |
| eslint-plugin-react-hooks | ^7.0.1 | React Hooks linting rules |
| eslint-plugin-react-refresh | ^0.5.2 | Fast Refresh linting support |

---

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository.
2. Create a new feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature description"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request.

Please follow standard commit message conventions and ensure `npm run lint` passes before submitting.

---

## License

This project is licensed under the MIT License.

---

> Developed by [Shubham](https://github.com/Shubham8468) as part of a full-stack Hospital Management System project.