package server

import (
	"learn-gin/internal/controller"

	"github.com/gin-gonic/gin"
)

func initRouter() *gin.Engine {
	router := gin.Default()
	router.GET("/", controller.IndexGet)
	router.GET("/ping", controller.PingGet)
	return router
}
