const {app, BrowserWindow} = require(`electron`);
const path = require(`path`);
const url = require(`url`);

let win;

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600});

  // Load the dist folder from Angular
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: `file:`,
      slashes: true
    })
  );

  // The following is optional and will open the DevTools
  // win.webContents.openDevTools

  win.on(`closed`, () => {
    win = null;
  });
}

app.on(`ready`, createWindow);

// On MacOS, closing the window doesn't kill the app.
app.on(`window-all-closed`, () => {
  if (process.platform !== `darwin`) {
    app.quit();
  }
});

// Initialise the app's main window
app.on(`activate`, () => {
  if (win === null) {
    createWindow();
  }
})
