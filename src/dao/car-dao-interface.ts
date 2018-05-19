/**
 * @exports 
 * @interface CarDaoInterface
 */
export interface CarDaoInterface { 
    createNewCar(car: any) : Q.Promise<any>; 
    getCarByCarName(carName: string) : Q.Promise<any>;
}