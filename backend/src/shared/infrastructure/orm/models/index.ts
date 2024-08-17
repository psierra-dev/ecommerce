"use strict";

import {Sequelize}  from "sequelize-typescript";
const env = process.env.NODE_ENV || "development";
import config  from "../config/config.js";

let sequelize: Sequelize;


sequelize = new Sequelize(config[env])

sequelize.addModels([__dirname + '/**/*.model.ts']);

sequelize.authenticate().then(() => console.log('db runnig')).catch(e => console.log("error db ", e))
console.log(sequelize.models, '--models');


export default sequelize
