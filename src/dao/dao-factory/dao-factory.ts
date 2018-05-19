import * as mongoose from "mongoose";
import { CarDaoInterface } from "../car-dao-interface";
import { CarDao } from "../car-dao";
import { DaoFactoryInterface } from "./dao-factory-interface";

/**
 * @exports
 * @class MongoDaoFactory
 * @implements { DaoFactoryInterface }
 * 
 */
export class MongoDaoFactory implements DaoFactoryInterface{
    private carDao : CarDaoInterface;
    /**
     * @constructor
     * @param { mongoose.Connection } connection 
     * 
     * @memberOf MongoDaoFactory
     */
    constructor(connection : mongoose.Connection) {
        this.carDao = new CarDao(connection);
    }

    /**
     * 
     * @returns { AuthDaoInterface }
     * 
     * @memberOf MongoDaoFactory
     */
    getCarDao(): CarDaoInterface {
        return this.carDao;
    }

}