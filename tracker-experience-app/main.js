const { app, BrowserWindow, ipcMain } = require('electron');
const {PythonShell} = require("python-shell");
const {join} = require("path");

let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1250,
        height: 800,
        backgroundColor: '#ffffff',
        // logo path
        icon: `file://${__dirname}/dist/tracker-experience-app/browser/favicon.png`,
        webPreferences: {
            nativeWindowOpen: true,
            nodeIntegration: true,
            contextIsolation: false,
            preload: join(__dirname, 'preload.js')
        }
    });
    win.loadURL(`file://${__dirname}/dist/tracker-experience-app/browser/index.html`);

    //// uncomment below to open the DevTools.
    // win.webContents.openDevTools();
    // Event when the window is closed.
    win.on('closed', function () {
        win = null
    })
}

ipcMain.on('run-python', (event, arg) => {
    console.log('message: ' + arg);
    let options = {
        mode: 'text',
        pythonPath: 'python3',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: __dirname + '/script/',
        args: [arg]
    };
    PythonShell.run('main.py', options)
        .then(result => {
            console.log(result);
            event.reply('python-success', result)
        })
        .catch(err => {
            event.reply('python-error', err.message)
        });
});

// Create window on electron intialization
app.on('ready', createWindow);
// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS specific close process
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // macOS specific close process
    if (win === null) {
        createWindow()
    }
});
