"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
try {
    new app_1.EcommerceApp().start();
}
catch (e) {
    console.log(e);
    process.exit(1);
}
process.on('uncaughtException', err => {
    console.log('uncaughtException', err);
    process.exit(1);
});
