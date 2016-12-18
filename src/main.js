/**
* Import modules
*/
import { BrowserWindow, Menu, app } from 'electron';
import path from 'path';
import url from 'url';


/**
* Enable Widevine Content Decryption Module
*/
app.commandLine.appendSwitch('widevine-cdm-path', path.join(__dirname, 'lib/widewine-cdm/1.4.8.903/widevinecdmadapter.plugin'));
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.903');


/**
* Define global variable for the main window
*/
let mainWindow;


/**
* Create app menu template
*/
const menuTemplate = [{
  label: 'Netflix',
  submenu: [{
    label: 'About Netflix',
    role: 'about',
  }, {
    type: 'separator',
  }, {
    label: 'Hide Netflix',
    accelerator: 'Command+H',
    role: 'hide',
  }, {
    label: 'Quit Netflix',
    accelerator: 'Command+Q',
    role: 'quit',
  }],
}, {
  label: 'Edit',
  submenu: [{
    label: 'Undo',
    accelerator: 'Command+Z',
    role: 'undo',
  }, {
    label: 'Redo',
    accelerator: 'Command+Y',
    role: 'redo',
  }, {
    type: 'separator',
  }, {
    label: 'Cut',
    accelerator: 'Command+X',
    role: 'cut',
  }, {
    label: 'Copy',
    accelerator: 'Command+C',
    role: 'copy',
  }, {
    label: 'Paste',
    accelerator: 'Command+V',
    role: 'paste',
  }, {
    label: 'Select All',
    accelerator: 'Command+A',
    role: 'selectall',
  }],
}, {
  label: 'View',
  submenu: [{
    label: 'Reload',
    accelerator: 'Command+R',
    click: (menuItem, mainWindow) => {
      if (mainWindow) {
        mainWindow.reload();
      }
    },
  }],
}, {
  label: 'Window',
  submenu: [{
    label: 'Zoom',
    role: 'zoom',
  }, {
    label: 'Minimize',
    accelerator: 'Command+M',
    role: 'minimize',
  }, {
    type: 'separator',
  }, {
    label: 'Toggle Frameless Window',
    accelerator: 'Command+E',
    type: 'checkbox',
    checked: false,
    click: (menuItem, mainWindow) => {
      const isChecked = !menuItem.checked;

      if (isChecked) {
        createWindow();
      } else {
        createFramelessWindow();
      }
    },
  }, {
    label: 'Float on Top',
    accelerator: 'Command+T',
    type: 'checkbox',
    checked: false,
    click: (menuItem, mainWindow) => {
      const isChecked = !menuItem.checked;

      mainWindow.setAlwaysOnTop(!isChecked);
    },
  }, {
    type: 'separator',
  }, {
    label: 'Show Inspector',
    accelerator: 'Command+Alt+I',
    click: (menuItem, mainWindow) => {
      mainWindow.webContents.openDevTools();
    },
  }],
}];


/**
* Define window settings
*/
const windowSettings = {
  backgroundColor: '#000',
  width: 800,
  height: 600,
  useContentSize: false,
  resizable: true,
  center: true,
  alwaysOnTop: false,
  frame: true,
  title: 'Netflix',
  webPreferences: {
    nodeIntegration: false,
    plugins: true,
  },
};


/**
* Create new window
*/
const createWindow = () => {
  if (mainWindow) {
    mainWindow.close();
  }

  windowSettings.frame = true;
  mainWindow = new BrowserWindow(windowSettings);
  mainWindow.loadURL('https://www.netflix.com/');
};


/**
* Activate app
*/
const activateApp = () => {
  createWindow();
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
};


/**
* Create new frameless window
*/
const createFramelessWindow = () => {
  if (mainWindow) {
    mainWindow.close();
  }

  windowSettings.frame = false;
  mainWindow = new BrowserWindow(windowSettings);
  mainWindow.loadURL('https://www.netflix.com/');
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.insertCSS('html, body { -webkit-user-select: none; -webkit-app-region: drag; }');
  });
};


app.on('ready', activateApp);
