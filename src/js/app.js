import { appConfig } from "./config.js";
import AppController from "./controller/appcontroller.js";

const app = new AppController(appConfig);

app.run();
console.log('App ready');
