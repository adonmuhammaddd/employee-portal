# Employee Portal

Employee Portal. Manage Employee records using Tailwind CSS for styling and supports Server-Side Rendering (SSR) using Angular Universal.

## Features

- Employee management interface
- Server-side rendering with Angular Universal
- Tailwind CSS for modern, utility-first styling
- Angular 19+ with strict TypeScript settings
- Development and production configurations
- SSR support with Express server
- Script to generate fake employee data

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)

### Installation

1. Clone or download this repository.
2. Install dependencies:

```bash
npm install
```

### Development Server

To start the development server:

```bash
npm start
```

Navigate to `http://localhost:4200/`. The app will automatically reload on code changes.

### Server-Side Rendering (SSR)

To build and run the SSR version:

```bash
npm run build:ssr
npm run serve:ssr:employee-portal
```

This runs the app with Express.js for SSR support.

### Code Generation

Generate new Angular elements using Angular CLI:

```bash
ng generate component component-name
```

### Build

Build the project for production:

```bash
ng build
```

### Running Tests

Run unit tests using Karma:

```bash
ng test
```

### Generating Fake Employee Data

To populate the app with test data:

```bash
npm run generate-employee
```

This runs the `src/generateFakeEmpl.js` script.

## Project Structure

- `src/` – Main application source
- `dist/` – Build output
- `public/` – Static assets
- `tailwind.config.js` – Tailwind CSS configuration
- `angular.json` – Angular CLI configuration
- `tsconfig*.json` – TypeScript configurations

## Technologies Used

- Angular 19.2+
- Tailwind CSS
- Express.js (for SSR)
- TypeScript
- RxJS
- Moment.js

## License

This project is licensed under the MIT License.
