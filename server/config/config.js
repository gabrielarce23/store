var env = process.env.NODE_ENV || "development";
const { Logger, LoggerType } = require("../logs/logger");



Logger.log(`Cargando variables para el ambiente.`);
var config = require("./config.json");

var envConfig = config;

Object.keys(envConfig).forEach((key) => {
  process.env[key] = envConfig[key];
  Logger.log(`Variable ${key} valor ${process.env[key]}`);
});
