/**
 * @api {put} /v1/banners/:id Edit Banner
 * @apiName EditBanner
 * @apiGroup Banner
 * @apiVersion 0.1.0
 *
 * @apiPermission none
 *
 * @apiParam (Params) {String} id unique ID of banner.
 * @apiParam (Body) {String} updatedBy Editor of banner.
 * @apiParam (Body) {Number} [companyID] ID of Company.
 * @apiParam (Body) {String="web","app"} [platform] Platform of banner.
 * @apiParam (Body) {Number} [bannerTypeID] ID of banner type.
 * @apiParam (Body) {String="allPosition","onePosition","landingPage","externalLink"} [targetType] Target types of banner.
 * @apiParam (Body) {String="online","offline","delete","wait"} [status] Status of banner.
 * @apiParam (Body) {Date} [startDate] Started date of banner.
 * @apiParam (Body) {Date} [expireDate] Expired date of banner.
 * @apiParam (Body) {Number} [jobID] ID of job.
 * @apiParam (Body) {String} [title] Title of banner.
 * @apiParam (Body) {String} [message] Message of banner.
 * @apiParam (Body) {String} [url] Url of Target types(External link, Landing page).
 * @apiParam (Body) {Boolean} [hasPin] Pin status of banner.
 * @apiParam (Body) {Object} [image] Image data of banner.
 * @apiParam (Body) {String} [image.app] App size data of image.
 * @apiParam (Body) {String} [image.desktop] Desktop size data of image.
 * @apiParam (Body) {String} [image.mobile] Mobile size data of image.
 * @apiParam (Body) {String} [image.logo] Company logo data of image.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *     "updateBy" : "watchapon",
 *     "company" : 174641,
 *     "platform" : "web",
 *     "bannerTypeID" : 1,
 *     "targetType" : "externalLink",
 *     "status" : "online",
 *     "startDate" : "2017-05-01T12:30:45.000Z",
 *     "expireDate" : "2017-06-01T12:30:45.000Z",
 *     "jobID" : 176549,
 *     "title" : "THiNKNET",
 *     "message" : "มาร่วมงานกับเรา",
 *     "url" : "https://www.jobthai-upgrade/company/29",
 *     "hasPin" : true,
 *     "image" : {
 *        "app": : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Vw8AAoEBfymqrywAAAAASUVORK5CYII=",
 *        "desktop" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Vw8AAoEBfymqrywAAAAASUVORK5CYII=",
 *        "mobile" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Vw8AAoEBfymqrywAAAAASUVORK5CYII=",
 *        "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Vw8AAoEBfymqrywAAAAASUVORK5CYII=",
 *      }
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
 *        "param": "companyID",
 *        "msg": "companyID is number."
 *    },
 *    {
 *        "param": "bannerTypeID",
 *        "msg": "bannerTypeID is number."
 *    },
 *    {
 *        "param": "jobID",
 *        "msg": "jobID is number."
 *    },
 * ]
 *
 */
