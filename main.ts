import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
var open = require("open");

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: 1000,
    height: 600,
    minWidth: 700,
    minHeight: 700,
    frame: false,
    title: "Yumpu Magazin Suche",
    icon: path.join(__dirname, 'assets/icons/png/64x64.png')
  });

  win.webContents.on('new-window', function (event, url) {
    event.preventDefault();
    open(url);
  });

  win.setMenu(null)
  //win.webContents.openDevTools();


  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  //win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}

ipcMain.on("test", (event, arg) => {
  // Create a browser window
  var win = new BrowserWindow({
    width: 1200,
    height: 600,
    center: true,
    resizable: true,
    frame: true,
    transparent: false
  });

  win.setMenu(null)
  // Load the page + route
  win.loadURL(`file://${__dirname}/dist/index.html#/external/embed/${arg}`);
})