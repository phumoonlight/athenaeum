/**
 * @api {put} /v1/banners/update/status Update Banner Status
 * @apiName UpdateBannerStatus
 * @apiGroup Banner
 * @apiVersion 0.1.0
 *
 * @apiPermission none
 *
 * @apiSuccess (Success 200) {String} message message from service.
 * @apiSuccess (Success 200) {Object} data metadata.
 * @apiSuccess (Success 200) {Object} data.count count of updated banners.
 * @apiSuccess (Success 200) {Number} data.count.online count of updated banners to status online.
 * @apiSuccess (Success 200) {Number} data.count.offline count of updated banners to status offline.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200
 * {
 *     message: "Success",
 *     data: {
 *       count: {
 *         online: 5,
 *         offline: 3
 *       }
 *     }
 * }
 *

 */
