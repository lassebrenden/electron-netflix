/**
* Require modules
*/
const path = require('path');
const init = require('electron-compile').init;


/**
* Define app root
*/
const appRoot = path.join(__dirname);


/**
* Initiate compiler
*/
init(appRoot, './src/main');
