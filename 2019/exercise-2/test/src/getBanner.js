/**
 * @api {get} /v1/banners Get Banner
 * @apiName GetBanners
 * @apiGroup Banner
 * @apiVersion 0.1.0
 *
 * @apiPermission none
 *
 * @apiParam (Query) {Array} ID of company to use search banner. Ex: [companyIDs=Array(83610,874641)] .
 * @apiParam (Query) {Number} limit Define limit to response.
 * @apiParam (Query) {Number} page Define page to response.
 * @apiParam (Query) {String} status Define for search banner from banner status (online, offline, wait, delete).
 * @apiParam (Query) {String} bannerTypeID Define for search banner from bannerTypeID.
 * @apiParam (Query) {Boolean} isShuffle Define for shuffle banner list (true = shuffle).
 * @apiParam (Query) {Boolean} hasPin Define for search banner hasPin.
 * @apiParam (Query) {String} sort Define for sort banner list. Ex: [sort=-companyID]
 *
 * @apiSuccess (Success 200) {Number} total Number of banner found.
 * @apiSuccess (Success 200) {Number} onlineTotal Number of banner found and status is online.
 * @apiSuccess (Success 200) {Number} expireSoonTotal Number of banner found and status near expiration.
 * @apiSuccess (Success 200) {Array} data Banner list.
 * @apiSuccess (Success 200) {String} data.id unique ID of banner.
 * @apiSuccess (Success 200) {Number} data.companyID ID of company.
 * @apiSuccess (Success 200) {String} data.platform Platform of banner.
 * @apiSuccess (Success 200) {String} data.bannerTypeID Type ID of banner.
 * @apiSuccess (Success 200) {String} data.targetType Target types of banner.
 * @apiSuccess (Success 200) {String} data.status Status of banner.
 * @apiSuccess (Success 200) {String} data.createdBy  Creator of banner.
 * @apiSuccess (Success 200) {Date} data.createdAt Create date of banner.
 * @apiSuccess (Success 200) {Date} data.startDate Started date of banner.
 * @apiSuccess (Success 200) {Date} data.expireDate Expired date of banner.
 * @apiSuccess (Success 200) {Number} data.jobID ID of job.
 * @apiSuccess (Success 200) {String} data.title Title of banner.
 * @apiSuccess (Success 200) {String} data.message Message of banner.
 * @apiSuccess (Success 200) {String} data.url Url of Target types(External link, Landing page).
 * @apiSuccess (Success 200) {Boolean} data.hasPin Pin status of banner.
 * @apiSuccess (Success 200) {Object} data.imagePath Image data of banner.
 * @apiSuccess (Success 200) {String} data.imagePath.app App size url of image.
 * @apiSuccess (Success 200) {String} data.imagePath.desktop Desktop size url of image.
 * @apiSuccess (Success 200) {String} data.imagePath.mobile Mobile size url of image.
 * @apiSuccess (Success 200) {String} data.imagePath.logo Company logo url of image.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     total: 1,
 *     onlineTotal: 1,
 *     expireSoonTotal: 0,
 *     data: [{
 *       "id" : "5c9c729b0fc2e000786099cb",
 *       "companyID" : 167127,
 *       "platform" : "web",
 *       "bannerTypeID" : 1,
 *       "targetType" : "externalLink",
 *       "status" : "online",
 *       "createdBy" : "watchapon",
 *       "createAt" : "2017-05-01T12:30:45.000Z",
 *       "expireDate" : "2017-05-01T12:30:45.000Z",
 *       "expiredAt" : "2017-06-01T12:30:45.000Z",
 *       "jobID" : 176549,
 *       "title" : "THiNKNET",
 *       "message" : "มาร่วมงานกับเรา",
 *       "url" : "https://www.jobthai-upgrade/company/29",
 *       "hasPin" : true,
 *       "imagePath" : {
 *          "app": "banner/topcompany_167127_20042009052733_app.jpg",
 *          "desktop" : "banner/topcompany_167127_20042009052733_desktop.jpg",
 *          "mobile" : "banner/topcompany_167127_20042009052733_mobile.jpg",
 *          "logo": "logo/logo_167127_20042009052733.jpg",
 *        }
 *      }]
 * }
 *
 */
