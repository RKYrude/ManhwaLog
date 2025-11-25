# ManhwaLog [![JavaScript](https://img.shields.io/badge/JavaScript-yellow.svg)](https://www.javascript.com/) [![Express](https://img.shields.io/badge/Express-blueviolet.svg)](https://expressjs.com/) [![React](https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=react&logoColor=black)](https://reactjs.org/)

A personal project to track the Manhwas (South Korean Comics) I am reading or have read. 📖 This application helps manage and keep track of your favorite Manhwas with features to add, update, and delete entries. It uses a React frontend with an Express backend and a PostgreSQL database.

## 📑 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Installation](#-installation)
- [🎮 Usage](#-usage)
- [📂 Project Structure](#-project-structure)
- [⚙️ API Reference](#️-api-reference)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [🔗 Important Links](#-important-links)
- [📝 Footer](#-footer)

## ✨ Features

- **Add New Manhwa**: Easily add new Manhwa entries with details like title, cover URL, read at URL, last chapter, and status. ➕
- **Update Manhwa**: Modify existing Manhwa entries to keep track of reading progress and status changes. ✏️
- **Delete Manhwa**: Remove Manhwa entries that are no longer being followed. 🗑️
- **Filter Manhwa**: Filter Manhwas by status (Ongoing, Haitus, Completed, All). 👓
- **Search Manhwa**: Quickly search for specific Manhwas by title. 🔎
- **Responsive UI**: The React-based frontend provides a responsive and intuitive user interface. 📱
- **Real-time Updates:** Utilizes React Hot Toast for user notifications on successful actions. 🍞

## 🛠️ Tech Stack

- **Frontend**: React, React DOM, React Hot Toast, Sass, Vite ⚛️
- **Backend**: Node.js, Express 🌐
- **Database**: PostgreSQL 🐘
- **Other**: CORS, Dotenv, Axios ⚙️
- **Linting**: ESLint ⚠️

## 🚀 Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/RKYrude/ManhwaLog.git
    cd ManhwaLog
    ```

2.  **Backend Setup:**

    ```bash
    cd Backend
    npm install
    ```

3.  **Create a `.env` file** in the `Backend` directory. Add the following environment variables:

    ```
    PORT=<your_port>
    DATABASE_URL=<your_database_url>
    FRONTEND_CLIENT_URL=<your_frontend_url>
    ```

4.  **Frontend Setup:**

    ```bash
    cd ../Frontend
    npm install
    ```

5.  **Create a `.env` file** in the `Frontend` directory (if needed). Add the following environment variables:

    ```
    VITE_API_URL=<your_backend_url>
    ```

## 🎮 Usage

1.  **Start the Backend:**

    ```bash
    cd Backend
    npm start
    ```

    This will start the backend server using `node --watch server.js`. The server listens on the port specified in your `.env` file.

2.  **Start the Frontend:**

    ```bash
    cd Frontend
    npm run dev
    ```

    This will start the Vite development server for the frontend. The application will be accessible at the URL provided by Vite (usually `http://localhost:5173`).

3.  **Access the Application:**

    Open your browser and go to the frontend URL to start using the ManhwaLog application. 🌐

### Real World Use Cases

- **Personal Tracking**: As the original description states, it's primary use is for personal tracking of Manhwas you are currently reading or have completed reading.
- **Community Sharing**: You can share your list with friends or in online communities to showcase your favorite Manhwas. 🧑‍🤝‍🧑
- **Review and Recommendation**: Use the log as a basis for writing reviews and recommending Manhwas to others. ✍️

## 📂 Project Structure

```
ManhwaLog/
├── Backend/
│   ├── .env
│   ├── database.js
│   ├── node_modules/
│   ├── package.json
│   └── server.js
├── Frontend/
│   ├── .env
│   ├── .vite/
│   ├── components/
│   │   ├── addNewButt/
│   │   ├── addNewForm/
│   │   ├── edit-delete/
│   │   ├── filterMenu/
│   │   ├── hamMenu/
│   │   ├── header/
│   │   ├── manhwaCard/
│   │   └── searchBar/
│   ├── eslint.config.js
│   ├── index.html
│   ├── node_modules/
│   ├── package.json
│   ├── src/
│   │   ├── App.jsx
│   │   ├── assets/
│   │   ├── main.jsx
│   │   └── main.scss
│   ├── utils/
│   │   └── copyText.js
│   └── vite.config.js
└── README.md
```

-   **Backend**: Contains the server-side code, including:
    -   `.env`: Environment variables for database connection and port configuration.
    -   `database.js`: Configuration for connecting to the PostgreSQL database using `pg` and `dotenv`.
    -   `server.js`: Main entry point for the Express server, handling API endpoints for CRUD operations on Manhwa entries.
-   **Frontend**: Contains the client-side code, including:
    -   `.env`: Environment variables for the API URL.
    -   `components`: Reusable React components for the user interface.
        -   `addNewButt`: Component for adding new Manhwa entries.
        -   `addNewForm`: Form component for inputting new Manhwa details.
        -   `edit-delete`: Component for editing and deleting Manhwa entries.
        -   `filterMenu`: Component for filtering Manhwa entries by status.
        -   `hamMenu`: Hamburger menu component for mobile view.
        -   `header`: Header component with search and filter options.
        -   `manhwaCard`: Component to display individual Manhwa details.
        -   `searchBar`: Search bar component for finding Manhwas by title.
    -   `src`: Main source code directory.
        -   `App.jsx`: Main application component that orchestrates the UI and data flow.
        -   `assets`: Contains fonts and images.
        -   `main.jsx`: Entry point for the React application.
        -   `main.scss`: Global styles for the application.
    -   `utils`: Utility functions.
        -   `copyText.js`: Function for copying text to clipboard.

## ⚙️ API Reference

The backend provides the following API endpoints:

-   **GET /api/comics**: Retrieves all Manhwa entries from the database, sorted by ID in ascending order. Returns a JSON array of Manhwa objects.

    ```json
    [
      {
        "id": 1,
        "title": "Solo Leveling",
        "cover_url": "https://example.com/solo-leveling.jpg",
        "read_at": "https://example.com/solo-leveling",
        "last_ch": 175,
        "status": "COMPLETED",
        "last_read": "Sep 3"
      },
      ...
    ]
    ```

-   **POST /api/addNew**: Adds a new Manhwa entry to the database. Expects a JSON object in the request body with the following properties:

    ```json
    {
      "title": "Tower of God",
      "cover_url": "https://example.com/tower-of-god.jpg",
      "read_at": "https://example.com/tower-of-god",
      "last_ch": 500,
      "status": "ONGOING"
    }
    ```

    Returns a JSON object with a success message and the added Manhwa object.

    ```json
    {
      "message": "Added successful",
      "addedComic": {
        "id": 2,
        "title": "Tower of God",
        "cover_url": "https://example.com/tower-of-god.jpg",
        "read_at": "https://example.com/tower-of-god",
        "last_ch": 500,
        "status": "ONGOING",
        "last_read": "Sep 3"
      }
    }
    ```

-   **PATCH /api/update/:id**: Updates an existing Manhwa entry in the database. Expects a JSON object in the request body with the properties to update.

    ```json
    {
      "last_ch": 501,
      "status": "ONGOING"
    }
    ```

    Returns a JSON object with a success message and the updated Manhwa object.

    ```json
    {
      "message": "Update successful",
      "updatedComic": {
        "id": 2,
        "title": "Tower of God",
        "cover_url": "https://example.com/tower-of-god.jpg",
        "read_at": "https://example.com/tower-of-god",
        "last_ch": 501,
        "status": "ONGOING",
        "last_read": "Sep 3"
      }
    }
    ```

-   **DELETE /api/delete/:id**: Deletes a Manhwa entry from the database. Returns a JSON object with a success message.

    ```json
    {
      "message": "Deleted successful"
    }
    ```

## 🤝 Contributing

Contributions are always welcome! Please follow these steps:

1.  Fork the repository. 🍴
2.  Create a new branch for your feature or bug fix. 🌿
3.  Make your changes and commit them. ✍️
4.  Submit a pull request. 🚀

## 📜 License

This project has no license.

## 🔗 Important Links

-   **GitHub Repository**: [https://github.com/RKYrude/ManhwaLog](https://github.com/RKYrude/ManhwaLog) 🐱‍💻

## 📝 Footer

-   **Repository Name**: ManhwaLog 📚
-   **Repository URL**: [https://github.com/RKYrude/ManhwaLog](https://github.com/RKYrude/ManhwaLog) 🔗
-   **Author**: RKYrude 👨‍💻

⭐ Like this project? Give it a star on [GitHub](https://github.com/RKYrude/ManhwaLog)! ⭐
🍴 Fork it to make your own version! 🍴
🐛 Report any issues or suggestions! 🐛


---
**<p align="center">Generated by [ReadmeCodeGen](https://www.readmecodegen.com/)</p>**
