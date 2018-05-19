import { CarDaoInterface } from '../car-dao-interface';

/**
 * 
 * @export
 * @interface DaoFactoryInterface
 */
export interface DaoFactoryInterface {
    getCarDao() : CarDaoInterface;
}