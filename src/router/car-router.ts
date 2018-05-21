import * as Q from "q";
import { Router, Request, Response } from "express";
import { CarRouterInterface } from "./car-router-interface";

//logger configuration
import { LogConfig } from "../util/log4js-config";
import { CarControllerInterface } from "../controller/car-controller-interface";
const log = new LogConfig().getLogger("CarRouter");

/**
 * @exports
 * @class CarRouter
 * @implements { CarRouterInterface }
 */
export class CarRouter implements CarRouterInterface {
    private router: Router;
    carController : CarControllerInterface;

    /**
     * 
     * @param { CarControllerInterface } carController
     * 
     * @memberOf CarRouter
     */
    constructor(carController: CarControllerInterface){
        this.carController = carController;
        this.router = Router();
        this.init()
    }

    /**
     * @returns Router
     * 
     * @memberOf CarRouter
     */
    getRouter(): Router {
        return this.router;
    }

    /**
     * @private
     * @return void 
     * 
     * @memberOf CarRouter
     */
    private init(): void {
        this.router.post('/addCar', this.createNewCar.bind(this));
        this.router.get('/getCar/:carName', this.findCarByCarName.bind(this));

    }
    
    /**
     * 
     * @param { Request } request 
     * @param { Response } response
     * @returns {*} 
     * 
     * @memberOf CarRouter
     */
    createNewCar(request: Request, response: Response): any {
        log.debug("create new Car: ", request.body);
        let createNewCarPromise : Q.Promise<any> = this.carController.createNewCar(request, response);

        createNewCarPromise.then((Car: any)=>{
            log.debug("createNewCarPromise: ", Car);
            return response.status(200).send(Car);
        });
        createNewCarPromise.catch((error: Error)=>{
            log.warn("createNewCarPromise: ", error);
            return response.status(500).send(error);
        });
    }


    /**
     * get Car by Car name
     * @param { Request } request 
     * @param { Response } response
     * @returns {*}
     * 
     * @memberOf CarRouter
     */
    findCarByCarName(request: Request, response: Response) : any {

        let getCarByCarNamePromise : Q.Promise<any> = this.carController.getCarByCarName(request, response);

        getCarByCarNamePromise.then((Car: any)=>{
            log.debug("getCarByCarNamePromise: ", Car);
            return response.status(200).send(Car);
        });
        getCarByCarNamePromise.catch((error: Error)=>{
            log.warn("getCarByCarNamePromise: ", error);
            return response.status(500).send(error);
        });
    }


}