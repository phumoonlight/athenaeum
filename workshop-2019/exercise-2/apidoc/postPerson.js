/**
 * @api {post} /people/ Register a new person
 * @apiName PostNewPerson
 * @apiGroup Person
 * @apiVersion 0.1.0
 *
 * @apiSuccess (Success 201) {String} _id id of person / mongodb auto generate
 * @apiSuccess (Success 201) {String} firstname firstname of person
 * @apiSuccess (Success 201) {String} lastname lastname of person
 * @apiSuccess (Success 201) {String} userid id of person
 *
 * @apiParamExample {json} Input
 *    {
 *      "firstname": "Study",
 *      "lastname": "Jonh"
 *    }
 *
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *      "_id": "5cde5034ee4b3d38d066ad90",
 *      "firstname": "Study",
 *      "lastname": "Jonh",
 *      "userid": "5"
 * }
 *
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
