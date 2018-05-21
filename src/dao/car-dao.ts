import * as mongoose from "mongoose";
import * as Q from "q";
import { CarDaoInterface } from "./car-dao-interface";
import { CarSchema } from "../model/dao-schema/car-dao-schema"
import { Car } from "../entity/dao-entity/car-entity";

//logger configuration
import { LogConfig } from "../util/log4js-config";
const log = new LogConfig().getLogger("CarDao");

type carType = Car & mongoose.Document;


/**
 * @exports
 * @class CarDao
 * @implements { CarDaoInterface }
 */
export class CarDao implements CarDaoInterface{
    carDaoModel : mongoose.Model<carType>;

    /**
     * @constructor
     * @param { mongoose.Connection } connection 
     * 
     * @memberOf CarDao
     */
    constructor(connection : mongoose.Connection){
        this.carDaoModel = connection.model<carType>('car', CarSchema)
    }


    
    /**
     * create new Car for signUp
     * @public 
     * @param { Car } carObject 
     * @returns { Q.Promise<any> }
     * 
     * @memberOf CarDao
     */
    public createNewCar(carObject : Car): Q.Promise<any> {
        let deferred : Q.Deferred<any> =  Q.defer();
        log.debug("create new acr with car details: ", carObject);

        this.carDaoModel.create(carObject, (error: Error, car : any)=>{
            try{
                if(error){
                    log.warn(" createNewCar err: ", error);
                    deferred.reject(error);
                }
                else {
                    log.debug("createNewCardata: ", car);
                    deferred.resolve(car);
                }
            }
            catch(exception){
                log.debug("Unwanted error");
                throw new exception("Unwanted db error in create car")
            }
        });

        return deferred.promise;
    }

    /**
     * 
     * @param { string } carName 
     * @returns { Q.Promise<any> }
     * 
     * @memberOf CarDao
     */
    public getCarByCarName(carName: string) : Q.Promise<any>{
        let deferred : Q.Deferred<any> =  Q.defer();
        log.debug("get car with carName: ", carName);

        this.carDaoModel.findOne({ carName }, (error: Error, car : any)=>{
            try{
                if(error){
                    log.warn(" getCarByCarName err: ", error);
                    deferred.reject(error);
                }
                else {
                    log.debug("getCarByCarName cardata: ", car);
                    deferred.resolve(car);
                }
            }
            catch(exception){
                log.debug("Unwanted error");
                throw new exception("Unwanted db error in get car")
            }
        });

        return deferred.promise;
    }


}