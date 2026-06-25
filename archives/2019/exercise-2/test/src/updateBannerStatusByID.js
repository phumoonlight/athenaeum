/**
 * @api {put} /v1/banners/:id/status Update Banner Status By ID
 * @apiName UpdateBannerStatusByID
 * @apiGroup Banner
 * @apiVersion 0.1.0
 *
 * @apiPermission none
 *
 * @apiParam (Params) {String} id ID of Banner.
 * @apiParam (Body) {String} updatedBy Editor of banner.
 * @apiParam (Body) {String="online","offline","delete"} status Status of banner.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *     "updateBy" : "watchapon",
 *     "status" : "online",
 * }
 *
 * @apiSuccess (Success 200) {String} id unique ID of banner.
 * @apiSuccess (Success 200) {Number} companyID ID of company.
 * @apiSuccess (Success 200) {String} platform Platform of banner.
 * @apiSuccess (Success 200) {Number} bannerTypeID ID of banner type.
 * @apiSuccess (Success 200) {String} targetType Target types of banner.
 * @apiSuccess (Success 200) {String} status Status of banner.
 * @apiSuccess (Success 200) {String} createdBy Creator of banner.
 * @apiSuccess (Success 200) {Date} createdAt Create date of banner.
 * @apiSuccess (Success 200) {String} updatedBy Update date of banner.
 * @apiSuccess (Success 200) {Date} updatedAt Editor of banner.
 * @apiSuccess (Success 200) {Date} startDate Started date of banner.
 * @apiSuccess (Success 200) {Date} expireDate Expired date of banner.
 * @apiSuccess (Success 200) {Number} jobID ID of job.
 * @apiSuccess (Success 200) {String} title Title of banner.
 * @apiSuccess (Success 200) {String} message Message of banner.
 * @apiSuccess (Success 200) {String} url Url of Target types(External link, Landing page).
 * @apiSuccess (Success 200) {Boolean} hasPin Pin status of banner.
 * @apiSuccess (Success 200) {Object} imagePath Image path of banner.
 * @apiSuccess (Success 200) {String} imagePath.app App size url of image.
 * @apiSuccess (Success 200) {String} imagePath.desktop Desktop size url of image.
 * @apiSuccess (Success 200) {String} imagePath.mobile Mobile size url of image.
 * @apiSuccess (Success 200) {String} imagePath.logo Company logo url of image.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200
 * {
 *     "id" : "5c9c729b0fc2e000786099cb",
 *     "companyID" : 174614,
 *     "platform" : "web",
 *     "bannerTypeID" :1,
 *     "targetType" : "externalLink",
 *     "status" : "online",
 *     "createdBy" : "watchapon",
 *     "createdAt" : "2017-05-01T12:30:45.000Z",
 *     "updatedBy" : "watchapon",
 *     "updatedAt" : "2017-05-01T12:30:45.000Z",
 *     "expireDate" : "2017-05-01T12:30:45.000Z",
 *     "expiredAt" : "2017-06-01T12:30:45.000Z",
 *     "jobID" : 176549,
 *     "title" : "THiNKNET",
 *     "message" : "มาร่วมงานกับเรา",
 *     "url" : "https://www.jobthai-upgrade/company/29",
 *     "hasPin" : true,
 *     "imagePath" : {
 *        "app": "banner/topcompany_167127_20042009052733_app.jpg",
 *        "desktop" : "banner/topcompany_167127_20042009052733_desktop.jpg",
 *        "mobile" : "banner/topcompany_167127_20042009052733_mobile.jpg",
 *        "logo": "logo/logo_167127_20042009052733.jpg",
 *      }
 * }
 *
 * @apiError UnprocessableEntity Data is unable to be processed.
 * @apiErrorExample {json} UnprocessableEntity
 * HTTP/1.1 422 UnprocessableEntity
 * [
 *    {
 *        "param": "status",
 *        "msg": "status is required."
 *    },
 *    {
 *        "param": "updatedBy",
 *        "msg": "updatedBy is required."
 *    },
 * ]
 *
 */
