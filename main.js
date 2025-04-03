const { app, BrowserWindow } = require("electron");
const path = require("path");
const { fork } = require("child_process");

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  win.loadFile(path.join(__dirname, "frontend", "build", "index.html"));
}

app.whenReady().then(() => {
  // Inicia o backend (ajuste o caminho se necessário)
  fork(path.join(__dirname, "backend", "server.js"));

  // Cria a janela Electron com o frontend React
  createWindow();
});
