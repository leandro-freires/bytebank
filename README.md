# Bytebank
A banking application developed as a Tech Challenge for FIAP's Post Tech Front-end Engineer course.

## Prerequisites

Before running this project, make sure you have installed:

- Node.js (Latest LTS version)
- npm (Node Package Manager)
- Angular CLI 19.2.14 (`npm install -g @angular/cli`)

## Project Setup

1. **Clone the repository**

```bash
git clone https://github.com/leandro-freires/bytebank 
```

2. **Install Dependencies**

```bash
cd bytebank
```
```bash
npm install
```

This will install the following required dependencies:

### Core Dependencies
- Angular (v19.2.0)
- Bootstrap (v5.3.6)
- NGX Currency (v19.0.0)
- Material Icons (v1.13.14)

## Running the Application

The application requires two processes to run simultaneously:

1. **Start the Mock Backend Server**

```bash
npm run json-serve
```
This will start the JSON Server on `http://localhost:3000`

2. **Start the Angular Application**

   In a new terminal window:

```bash
ng serve
```

Navigate to `http://localhost:4200` in your browser

### Alternative Start Method
You can start both servers simultaneously using:

```bash
npm run start:dev
```

## Development Notes

- The application will automatically reload when you make changes to source files
- The mock backend (json-server) provides a simulated API for development
- Bootstrap is included for styling and responsive design
- NGX Currency is used for currency formatting
- Material Icons are available for UI elements

