
/**
 * @exports
 * @class Car
 */
export class Car {
    brand : string;
    carName: string;
    model : string;
    modelType : string;
    description : string;
    summary : string;
    pricing : any;
    keyPoints: any;
    imageUrls: Array<string>;
    reviews: Array<any>


    /**
     * generate car objct for new Car
     * @param {*} carObject 
     * @returns Car
     * @memberOf Car
     */
    static getCarEntityFromCarDetails(carObject : any) : Car{
        let car : Car = {
            brand : carObject.brand,
            carName : carObject.carName,
            model : carObject.model,
            modelType : carObject.modelType ? carObject.modelType : "",
            description : carObject.description ? carObject.description : "",
            summary : carObject.summary ? carObject.summary : "",
            pricing : {
                price : carObject.pricing.price,
                cuurency : carObject.pricing.cuurency ? carObject.pricing.cuurency : ""
            },
            keyPoints: carObject.keyPoints ? carObject.keyPoints : {},
            imageUrls: carObject.imageUrls ? carObject.imageUrls  : [],
            reviews: carObject.reviews ? carObject.imageUrls : []
        };
        return car;
    }

}