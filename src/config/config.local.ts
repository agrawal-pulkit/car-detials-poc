var config : any = {}

config.dbDetails = {
    url : "mongodb://localhost/sample"
}
config.MONGO_DB_URL = "mongodb://localhost/car-db";

config.LOG_DIR = './logs/';
config.LOG_FILE_NAME = 'app.log';
config.LOG_ERROR_FILE_NAME = 'error.log';
config.LOG_MAX_FILE_SIZE = "10485760"; 
config.LOG_NO_OF_BACKUPS = "10";
config.LOG_ENABLE_CONSOLE_LOG = true;

module.exports = config;