const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let main;

function createWindow() {
  main = new BrowserWindow({
    width: 1000,
    height: 800
  });

  main.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  main.on("closed", () => (main = null));

  //   main.webContents.openDevTools();
}

app.on("ready", createWindow);
app.on("activate", () => {
  if (!main) createWindow();
});
