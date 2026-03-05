/**
 * @api {post} /v1/banners Create Banner
 * @apiName CreateBanner
 * @apiGroup Banner
 * @apiVersion 0.1.0
 *
 * @apiPermission none
 *
 * @apiParam (Body) {Number} companyID ID of company.
 * @apiParam (Body) {String="web","app"} platform Platform of banner.
 * @apiParam (Body) {Number} bannerTypeID ID of banner type.
 * @apiParam (Body) {String="allPosition","onePosition","landingPage","externalLink"} targetType Target types of banner.
 * @apiParam (Body) {String="online","offline","delete","wait"} status Status of banner.
 * @apiParam (Body) {String} createdBy Creator of banner.
 * @apiParam (Body) {Date} startDate Started date of banner.
 * @apiParam (Body) {Date} expireDate Expired date of banner.
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
 * @apiParamExample {json} Request-Example(Web)
 * {
 *     "companyID" : 167127",
 *     "platform" : "web",
 *     "bannerTypeID" : 1,
 *     "targetType" : "externalLink",
 *     "status" : "online",
 *     "createdBy" : "watchapon",
 *     "startDate" : "2017-05-01T12:30:45.000Z",
 *     "expireDate" : "2017-06-01T12:30:45.000Z",
 *     "jobID" : 176549,
 *     "title" : "THiNKNET",
 *     "message" : "มาร่วมงานกับเรา",
 *     "url" : "https://www.jobthai-upgrade/company/29",
 *     "hasPin" : true,
 *     "image" : {
 *        "desktop" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Vw8AAoEBfymqrywAAAAASUVORK5CYII=",
 *        "mobile" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Vw8AAoEBfymqrywAAAAASUVORK5CYII=",
 *        "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Vw8AAoEBfymqrywAAAAASUVORK5CYII=",
 *      }
 * }
 * @apiParamExample {json} Request-Example(App)
 * {
 *     "companyID" : 167127",
 *     "platform" : "app",
 *     "bannerTypeID" : 1,
 *     "targetType" : "externalLink",
 *     "status" : "online",
 *     "createdBy" : "watchapon",
 *     "startDate" : "2017-05-01T12:30:45.000Z",
 *     "expireDate" : "2017-06-01T12:30:45.000Z",
 *     "jobID" : 176549,
 *     "title" : "THiNKNET",
 *     "message" : "มาร่วมงานกับเรา",
 *     "url" : "https://www.jobthai-upgrade/company/29",
 *     "hasPin" : true,
 *     "image" : {
 *        "app": : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Vw8AAoEBfymqrywAAAAASUVORK5CYII="    }
 *     }
 *
 * @apiSuccess (Success 201) {String} id unique ID of banner.
 * @apiSuccess (Success 201) {Number} companyID ID of company.
 * @apiSuccess (Success 201) {String} platform Platform of banner.
 * @apiSuccess (Success 201) {Number} bannerTypeID ID of banner type.
 * @apiSuccess (Success 201) {String} targetType Target types of banner.
 * @apiSuccess (Success 201) {String} status Status of banner.
 * @apiSuccess (Success 201) {String} createdBy Creator of banner.
 * @apiSuccess (Success 201) {Date} createdAt Create date of banner.
 * @apiSuccess (Success 201) {Date} startDate Started date of banner.
 * @apiSuccess (Success 201) {Date} expireDate Expired date of banner.
 * @apiSuccess (Success 201) {Number} jobID ID of job.
 * @apiSuccess (Success 201) {String} title Title of banner.
 * @apiSuccess (Success 201) {String} message Message of banner.
 * @apiSuccess (Success 201) {String} url Url of Target types(External link, Landing page).
 * @apiSuccess (Success 201) {Boolean} hasPin Pin status of banner.
 * @apiSuccess (Success 201) {Object} imagePath Image path of banner.
 * @apiSuccess (Success 201) {String} imagePath.app App size url of image.
 * @apiSuccess (Success 201) {String} imagePath.desktop Desktop size url of image.
 * @apiSuccess (Success 201) {String} imagePath.mobile Mobile size url of image.
 * @apiSuccess (Success 201) {String} imagePath.logo Company logo url of image.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 201
 * {
 *     "id" : "5c9c729b0fc2e000786099cb",
 *     "companyID" : 167127,
 *     "platform" : "web",
 *     "bannerTypeID" :1,
 *     "targetType" : "externalLink",
 *     "status" : "online",
 *     "createdBy" : "watchapon",
 *     "createAt" : "2017-05-01T12:30:45.000Z",
 *     "expireDate" : "2017-05-01T12:30:45.000Z",
 *     "expiredAt" : "2017-06-01T12:30:45.000Z",
 *     "jobID" : 176549,
 *     "title" : "THiNKNET",
 *     "message" : "มาร่วมงานกับเรา",
 *     "url" : "https://www.jobthai-upgrade/company/29",
 *     "hasPin" : true,
 *     "imagePath" : {
 *        "app": "banner/topcompany_167127_20142019052733_app.jpg",
 *        "desktop" : "banner/topcompany_167127_20142019052733_desktop.jpg",
 *        "mobile" : "banner/topcompany_167127_20142019052733_mobile.jpg",
 *        "logo": "logo/logo_167127_20142019052733.jpg",
 *      }
 * }
 *
 * @apiError UnprocessableEntity Data is unable to be processed.
 * @apiErrorExample {json} UnprocessableEntity
 * HTTP/1.1 422 UnprocessableEntity
 * [
 *    {
 *        "param": "companyID",
 *        "msg": "companyID is required."
 *    },
 *    {
 *        "param": "platform",
 *        "msg": "platform is required."
 *    },
 *    {
 *        "param": "bannerTypeID",
 *        "msg": "bannerTypeID is required."
 *    },
 *    {
 *        "param": "targetType",
 *        "msg": "targetType is required."
 *    },
 *    {
 *        "param": "status",
 *        "msg": "status is required."
 *    },
 *    {
 *        "param": "createdBy",
 *        "msg": "createdBy is required."
 *    },
 *    {
 *        "param": "startDate",
 *        "msg": "startDate is required."
 *    },
 *    {
 *        "param": "expireDate",
 *        "msg": "expireDate is required."
 *    }
 * ]
 *
 */
