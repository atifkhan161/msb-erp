const { app, BrowserWindow } = require('electron');
const url = require("url");
const path = require('path');

const server = require('./server/index');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});