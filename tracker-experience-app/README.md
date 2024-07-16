# Technology Experience Tracker

## Clone Repository and Switch to Develop Branch

To get started, clone the repository and switch to the develop branch:

```sh
git clone https://github.com/ArzuvBahramov/Technology-Experience-Tracker.git
cd Technology-Experience-Tracker
git checkout develop
```

## Requirements

- Python 3
- Node.js
- npm

## Installation Guides

### Python 3

For instructions on installing Python 3, refer to this [guide on Medium](https://medium.com/@ingimareys93/how-to-install-python-3-6eae4d2d14f8).

### Node.js

For installing Node.js on macOS, Windows, and Linux, follow this [Ghost.org tutorial](https://ghost.org/tutorials/node/#:~:text=Install%20Node%20on%20macOS.%20To,version%20of%20Node%20that%E2%80%99s%20installed).

## Setup Instructions

1. Navigate to the `tracker-experience-app` folder:

    ```sh
    cd tracker-experience-app
    ```

2. Open the `main.js` file and locate the `run-python` line:

    ```js
    ipcMain.on('run-python', (event, arg) => {
        // existing code
    });
    ```

    Update the `pythonPath` variable to 'Python' or to your virtual environment's Python path if using `venv`.

3. Install the `pandas` module for Python:

    ```sh
    pip install pandas
    ```

4. Install the necessary Node.js packages:

    ```sh
    npm install
    ```

5. Build the Electron application:

    ```sh
    npm run electron-build
    ```

You are now ready to run the Technology Experience Tracker application. Enjoy!
