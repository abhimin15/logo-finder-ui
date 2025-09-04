# Logo Finder UI

A React-based web application for managing and viewing logos. This application provides a clean interface for uploading images and viewing existing logos with their metadata.

## Features

- **View Logos**: Display existing logos in a table format with columns for Name, Size, and Location
- **Upload Images**: Upload new logo images through a file input interface
- **Tab Navigation**: Clean tab-based interface for switching between viewing and uploading
- **Real-time Updates**: Automatically refresh logo list after successful uploads
- **Responsive Design**: Modern black and white theme with responsive layout

## Technology Stack

- **Frontend**: React 19.1.1
- **State Management**: React Context API with useReducer
- **Styling**: Inline styles with CSS
- **API Integration**: Fetch API for backend communication

## Project Structure

```
src/
├── components/
│   ├── Tabs.js          # Main tab navigation component
│   ├── LogoTable.js     # Table component for displaying logos
│   └── ImageUpload.js   # Image upload component
├── store/
│   └── LogoContext.js   # Context provider for state management
├── App.js              # Main application component
└── index.js            # Application entry point
```

## API Endpoints

The application communicates with a backend API hosted at `https://logo-finder.onrender.com`:

- **GET** `/getlogo` - Retrieve list of existing logos
- **POST** `/upload-image` - Upload a new image file

### API Response Format

The `/getlogo` endpoint is expected to return an array of logo objects:

```json
[
  {
    "name": "logo-name.png",
    "size": "48 KB",
    "location": "/assets/logo-name.png"
  }
]
```

### Upload Format

The `/upload-image` endpoint accepts multipart form data with the image file in the `image` field.

## Getting Started

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Usage

1. **Viewing Logos**: Click on the "View Logo" tab to see existing logos in a table format
2. **Uploading Images**: 
   - Click on the "Upload Image" tab
   - Select an image file using the file input
   - Click the "Submit" button to upload
   - The app will automatically switch to the "View Logo" tab and refresh the data

## State Management

The application uses React Context API with useReducer for state management:

- **Logo State**: Manages the list of logos, loading states, and error handling
- **Actions**: 
  - `fetchLogos()`: Retrieves logos from the API
  - `uploadImage(file)`: Uploads a new image file

## Styling

The application uses a clean black and white theme with inline styles for consistency and easy customization.

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
