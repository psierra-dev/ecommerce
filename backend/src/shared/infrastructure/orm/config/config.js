import config from "../../../../config/index.js";

const DATABASE_URL = process.env.DB_URL;

export default {
  development: {
    //url: DATABASE_URL,
    dialect: "postgres",
    username: config.db_user,
    port: config.db_port,
    database: config.db_name,
    password: config.db_password,
  },
  test: {
    url: DATABASE_URL,
    dialect: "postgres",
  },
  production: {
    url: DATABASE_URL,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Importante si usas conexiones SSL sin un certificado firmado por una entidad de certificación.
      },
    },
  },
};
