import { CarDaoInterface } from "../dao/car-dao-interface";
import { Request, Response } from "express";

/**
 * @export 
 * @interface CarControllerInterface
 */
export interface CarControllerInterface {
    carDao : CarDaoInterface;
    createNewCar(request: Request, response: Response) : Q.Promise<any>;
    getCarByCarName(request: Request, response: Response) : Q.Promise<any>;
}
