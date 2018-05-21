/**
 * @export
 * @class Helper
 */
export class Helper {

    /**
     * get formatted response
     * @static
     * @param { string } status 
     * @param { string } message 
     * @returns { string }
     * 
     * @memberOf Helper
     */
    static getResponse(status: string, message: string) : string {
        return JSON.stringify({
            metadata: {
                status: status,
                message: {
                    "Application_Status": message
                }
            }
        });
    }


}