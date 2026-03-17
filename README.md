# Aspire Card Management Dashboard

A modern, responsive card management dashboard built with React 19 and TypeScript. This application allows users to view, manage, and add virtual debit cards with a clean, intuitive interface.

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite)
![Vitest](https://img.shields.io/badge/Tested_with-Vitest-6E9F18?logo=vitest)

## 🚀 Live Demo

**[View Live App →](https://aspire-project-delta.vercel.app/)**

## Features

- **Card Management**: View and manage multiple virtual debit cards
- **Card Carousel**: Swipe through cards with smooth Embla Carousel integration
- **Freeze/Unfreeze Cards**: Toggle card status with instant feedback
- **Add New Cards**: Create new cards with form validation
- **Show/Hide Card Number**: Privacy toggle for sensitive card information
- **Transaction History**: View recent transactions with expandable accordion
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Persistent Storage**: Card data persists across browser sessions via localStorage

## Tech Stack

| Category         | Technology                     |
| ---------------- | ------------------------------ |
| Framework        | React 19                       |
| Language         | TypeScript 5.9                 |
| Build Tool       | Vite 8                         |
| Styling          | Tailwind CSS 4                 |
| State Management | Zustand 5                      |
| Form Handling    | React Hook Form + Zod          |
| Carousel         | Embla Carousel                 |
| Testing          | Vitest + React Testing Library |

## Prerequisites

Before running this project, ensure you have:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (or yarn/pnpm)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd aspire-project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will open at **http://localhost:5173**

## Available Scripts

| Command                 | Description                       |
| ----------------------- | --------------------------------- |
| `npm run dev`           | Start development server with HMR |
| `npm run build`         | Build for production              |
| `npm run preview`       | Preview production build locally  |
| `npm run lint`          | Run ESLint                        |
| `npm run test`          | Run tests in watch mode           |
| `npm run test:ui`       | Run tests with Vitest UI          |
| `npm run test:coverage` | Generate test coverage report     |

## Project Structure

```
src/
├── assets/              # SVG icons and images
├── components/
│   ├── Card/            # Card-related components
│   │   ├── Card.tsx           # Individual card display
│   │   ├── CardActions.tsx    # Freeze, GPay, etc. actions
│   │   ├── CardCarousel.tsx   # Swipeable card carousel
│   │   └── ...
│   ├── Modal/           # Modal components
│   │   └── AddCardModal.tsx   # Add new card form
│   ├── Navigation/      # Navigation components
│   ├── Sidebar/         # Desktop sidebar
│   ├── Transactions/    # Transaction list components
│   └── ui/              # Reusable UI components
├── config/              # Configuration and constants
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── store/               # Zustand state management
├── test/                # Test utilities and setup
└── types/               # TypeScript type definitions
```

## Testing

The project includes comprehensive tests with **60+ test cases** covering:

- Component rendering
- User interactions
- Form validation
- State management

Run tests:

```bash
# Run all tests
npm run test

# Run with coverage
npm run test:coverage

# Run with UI
npm run test:ui
```

## Key Design Decisions

1. **Zustand for State Management**: Lightweight alternative to Redux with built-in persistence middleware for localStorage integration.

2. **React Hook Form + Zod**: Type-safe form validation with excellent performance (minimal re-renders).

3. **Component Memoization**: Strategic use of `React.memo`, `useMemo`, and `useCallback` to prevent unnecessary re-renders.

4. **Centralized Constants**: All design tokens (colors, animations, breakpoints) are defined in `src/config/constants.ts` for consistency.

5. **Mobile-First Responsive Design**: Uses Tailwind's `md:` breakpoint (768px) to provide optimized layouts for both mobile and desktop.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for demonstration purposes.
