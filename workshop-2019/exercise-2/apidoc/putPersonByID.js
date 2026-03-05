/**
 *
 * @api {put} /people/:id Update a person
 * @apiName UpdatePerson
 * @apiGroup Person
 * @apiVersion 0.1.0
 *
 * @apiParam {String} id Firstname of Person
 *
 * @apiSuccess (Success 200) {String} _id id of person / mongodb auto generate
 * @apiSuccess (Success 200) {String} firstname firstname of person
 * @apiSuccess (Success 200) {String} lastname lastname of person
 * @apiSuccess (Success 200) {String} userid id of person
 *
 *
 * @apiParamExample {json} Input
 *    {
 *      "firstname": "Work",
 *      "lastname": "Doe"
 *    }
 *
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *    {
 *      "_id": "5cde5034ee4b3d38d066ad90",
 *      "firstname": "Work",
 *      "lastname": "Doe",
 *      "userid": "5"
 *    }
 *
 * @apiErrorExample {json} Update error
 *    HTTP/1.1 500 Internal Server Error
 */
