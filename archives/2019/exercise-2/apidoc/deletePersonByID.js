/**
 * @api {delete} /people/:_id Remove a person by id
 * @apiName DeletePerson
 * @apiGroup Person
 * @apiVersion 0.1.0
 *
 * @apiParam {String} id _id of person
 *
 * @apiParamExample {json} Input
 * localhost:3000/people/5cde70ca718b5c67aab37118
 *
 * @apiSuccessExample {json} Success
 *  {
 *      "n": 0,
 *      "ok": 1,
 *      "deletedCount": 0
 *   }
 * @apiErrorExample {json} Delete error
 *    HTTP/1.1 500 Internal Server Error
 */
