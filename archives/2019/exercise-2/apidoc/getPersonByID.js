/**
 * @api {get} /people/:id Find a person by id
 * @apiName GetPersonByID
 * @apiGroup Person
 * @apiVersion 0.1.0
 *
 * @apiParam (param) {String} id to search for userid
 *
 * @apiSuccess (Success 200) {String} _id id of person / mongodb auto generate
 * @apiSuccess (Success 200) {String} firstname firstname of person
 * @apiSuccess (Success 200) {String} lastname lastname of person
 * @apiSuccess (Success 200) {String} userid id of person / auto generate
 *
 *
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * [
 *    {
 *          "_id": "5cde5015ee4b3d38d066ad8c",
 *          "firstname" : "beat",
 *          "lastname" : "panupong",
 *          "userid" : "1"
 *    },
 *    {
 *          "_id": "5cde501cee4b3d38d066ad8d",
 *          "firstname" : "beat",
 *          "lastname" : "kaewkudlor",
 *          "userid" : "2"
 *    }
 * ]
 *
 * @apiErrorExample {json} Task not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
