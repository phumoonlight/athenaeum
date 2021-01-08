import { app, BrowserWindow } from 'electron'

let electronWindow = null
app.whenReady().then(() => {
  electronWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // nodeIntegration: true,
      contextIsolation: true,
    },
  })
  electronWindow.loadFile('index.html')
})

// ipcMain.on("generatePassword", (event, data) => {
//   const randomPassword = data + Math.random().toString(36).substr(2, 5);
//   win.webContents.send("receivePassword", randomPassword);
// });
