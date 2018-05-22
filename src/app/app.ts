import * as express from "express";
import { Request, Response, Router } from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import CONFIG = require("./../config/config");
import * as expressSession from "express-session";
import * as path from 'path';

//db-connection
import * as mongoose from "mongoose";
import ConnectMongo = require("connect-mongo");
let connection: mongoose.Connection;
let isMongoConnectionSuccess : boolean = false;

//initialize dependencies

const cors = require('cors');

//util 
import { LogConfig } from "../util/log4js-config";
import { CarRouterInterface } from "../router/car-router-interface";
import { MongoDbConnectionInterface } from "../util/database/mongo-connection-interface";
import { MongoDbConnection } from "../util/database/mongo-connection";
import { DaoFactoryInterface } from "../dao/dao-factory/dao-factory-interface";
import { MongoDaoFactory } from "../dao/dao-factory/dao-factory";
import { CarControllerInterface } from "../controller/car-controller-interface";
import { CarController } from "../controller/car-controller";
import { CarRouter } from "../router/car-router";
import { Helper } from "../util/helper";



//app start
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
// app.set('view engine', 'ejs');

app.use('/assets', express.static(('assets')));
//logger configuration`
const log = new LogConfig().getLogger("App");

let carRouter : CarRouterInterface;


/**
 * global Promise rejection handler
 */
process.on("unhandledRejection", (error:Error) => {
  log.warn("Handling unhandledRejection: ", error);
});

process.on("uncaughtException", (error: Error) => {
  log.warn("Handling Exception: ", error);
})


//db connection
createDBConnection();

/**
 * initialize mongo db connection
 * @function
 * @returns { Promise<any> }
 */
async function createDBConnection() : Promise<any> {
  let mongoDbConnection : MongoDbConnectionInterface= new MongoDbConnection(CONFIG.MONGO_DB_URL);
  connection = mongoDbConnection.getConnection();
  isMongoConnectionSuccess  = await mongoDbConnection.checkConnectionstatus(connection);
  log.debug("isMongoConnectionSuccess: ", isMongoConnectionSuccess);
  if(isMongoConnectionSuccess) {
	initializeMongoStore();
  } else{ log.debug("mongo is diconnected") }
  
}

/**
 * send status to client in response based on Mongo connection
 * @param  {Response} response
 * @returns {Response}
 */
function getMongoConnectionStatus(response : Response) : Response {
	let status: number, statusText: string, message: string;
	if (isMongoConnectionSuccess) {
		status = 500;
		statusText = "failure";
		message = "MongoDB is Not Connected";
	} else {
		status = 200;
		statusText = "success";
		message = "MongoDB is Connected, thanks for asking!";
	}
	return response.status(status).header('Content-Type', 'application/json').send(Helper.getResponse(statusText, message));
}

function initializeMongoStore() {
	log.debug("inside initializeMongoStore")
	const MongoStore = ConnectMongo(expressSession);
	const mongoStoreOptions = {
			mongooseConnection: connection,
			stringify: true,
	};
	const mongoStore = new MongoStore(mongoStoreOptions);
	
	let sessionSettings = {
		secret: 'SELFsuccessSecret',
		resave: true,
		saveUninitialized: false,
		store: mongoStore,
		clear_interval: 900,
		cookie : {
			httpOnly : true,
			secure: false,
			maxAge: 2 * 60 * 60 * 1000 
		}
	}; 
	app.use(expressSession(sessionSettings)); 

	initializeDependecies();
}


/**
 * for initialize all dependencies
 * @returns { void }
 */
function initializeDependecies() : void {
  	let daoFactory : DaoFactoryInterface = new MongoDaoFactory(connection);

	let carController : CarControllerInterface = new CarController(daoFactory);
	carRouter= new CarRouter(carController)

	getRoutes();
}

/**
 * get routers
 * @returns { void }
 */
function getRoutes() : void {
	app.use("/car", carRouter.getRouter());
}


app.listen(CONFIG.PORT, () => {
  log.info("Authorization API server listening on port %d ", CONFIG.PORT);
});


module.exports = app;
module.exports.connection = connection;