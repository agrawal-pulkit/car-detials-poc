import * as mongoose from "mongoose";

/**
 * mongoose schema for car
 * @export
 * @constant CarSchema
 */
export const CarSchema : mongoose.Schema = new mongoose.Schema({
    brand : {
        type : String
    },
    carName : {
        type : String,
        required : true
    },
    model : {
        type : String
    },
    modelType : {
        type : String,
        default : 'Test'
    },
    description : {
        type : String
    },
    summary : {
        type : String
    },
    pricing : {},
    imageUrls : {},
    keyPoints : {},
    reviews : {}

}, { collection : 'cars', strict : false});