//logger configuration
import { LogConfig } from "../util/log4js-config";
const log = new LogConfig().getLogger("CarController");

import * as Q from "q";
import { Request, Response } from "express";
import { CarControllerInterface } from "./car-controller-interface";
import { MongoDaoFactory } from "../dao/dao-factory/dao-factory";
import { CarDaoInterface } from "../dao/car-dao-interface";
import { Car } from "../entity/dao-entity/car-entity";
import { DaoFactoryInterface } from "../dao/dao-factory/dao-factory-interface";



/**
 * @exports
 * @class CarController
 * @implements { CarControllerInterface }
 */
export class CarController implements CarControllerInterface {
    carDao: CarDaoInterface;

    /**
     * initialze Car Dao
     * @constructor 
     * @param { DaoFactoryInterface } daofactory 
     * 
     * @memberOf CarController
     */
    constructor(daofactory: DaoFactoryInterface) {
        this.carDao = daofactory.getCarDao();
    }

    /**
     * create new Car
     * @param { Request } request
     * @param { Response } response
     * @returns  { Q.Promise<any> }
     * 
     * @memberOf CarController
     */
    createNewCar(request: Request, response: Response): Q.Promise<any> {
        let carObject: Car = request.body;
        let deferred: Q.Deferred<any> = Q.defer();

        let getCarByCarNamePromise = this.carDao.getCarByCarName(carObject.carName);

        getCarByCarNamePromise.then((car: any) => {
            log.debug("getCarByCarName :", Car);
            if (car) { deferred.resolve({ status: "car already exist", carObject: car }) }
            else {
                let carData: Car = Car.getCarEntityFromCarDetails(carObject);
                let createNewcarPromise = this.carDao.createNewCar(carData);

                createNewcarPromise.then((car: any) => {
                    log.debug("createNewCar :", Car);
                    deferred.resolve({ status: "new car created successfully", carObject: car });
                })
                createNewcarPromise.catch((error: Error) => {
                    log.warn("error in createNewCar :", error);
                    deferred.reject({ status: error.message, carObject: null });
                })
            }
        })
        getCarByCarNamePromise.catch((error: Error) => {
            log.warn("error in getCarByCarName :", error);


            deferred.reject(error)
        })

        return deferred.promise;
    }

    /**
     * get Car by using CarName
     * @param { Request } request
     * @param { Response } response
     * @returns  { Q.Promise<any> }
     * 
     * @memberOf CarController
     */
    getCarByCarName(request: Request, response: Response): Q.Promise<any> {
        let carName: string = request.params.carName || request.headers.carName || request.query.carName;
        let deferred: Q.Deferred<any> = Q.defer();
        log.debug("getCarByCarName: ", carName);
        let getCarByCarNamePromise = this.carDao.getCarByCarName(carName);

        getCarByCarNamePromise.then((car: any) => {
            log.debug("getCarByCarName :", car);
            deferred.resolve({ status: carName, carObject: car });
        })
        getCarByCarNamePromise.catch((error: Error) => {
            log.warn("error in getCarByCarName :", error);
            deferred.reject({ status: error.message, carObject: null })
        })

        return deferred.promise;
    }

}