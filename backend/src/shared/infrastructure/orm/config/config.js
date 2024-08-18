import config from "../../../../config/index.js";

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
    url: config.db_url,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Importante si usas conexiones SSL sin un certificado firmado por una entidad de certificación.
      },
    },
  },
};
