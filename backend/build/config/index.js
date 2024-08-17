"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.default = {
    port: process.env.PORT || 3001,
    db_url: process.env.DB_URL,
    db_port: process.env.DB_PORT,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME,
    salt_bcrypt: process.env.SALT_BCRYPT,
    jwt_key: process.env.JWT_KEY,
    mail: process.env.MAIL,
    pass_mail: process.env.PASS_MAIL,
    url_client: process.env.URL_CLIENT,
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
