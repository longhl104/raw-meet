# Raw Meet Web

Angular web application for Raw Meet - A social network where users share authentic, unfiltered moments.

## Features

- View posts and profiles
- Comment on posts
- User authentication with Google OAuth
- Profile management
- **Note**: Posting is only available on mobile (Android app) as uploads from gallery are not allowed

## Environments

- **local**: Development environment
- **production**: Production environment

## Development server

Run `npm start` or `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Environment-specific commands:
- `npm run serve:local` - Run with local configuration
- `npm run serve:production` - Run with production configuration

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Environment-specific builds:
- `npm run build:local` - Build for local environment
- `npm run build:production` - Build for production environment

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Tech Stack

- Angular 18
- Angular Material
- TypeScript
- RxJS
- SCSS

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open your browser and navigate to `http://localhost:4200`
