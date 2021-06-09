package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func startServer() {
	route := gin.Default()

	route.GET("/", func(context *gin.Context) {
		context.JSON(http.StatusOK, gin.H{
			"status": "ok",
		})
	})

	route.GET("/ping", func(context *gin.Context) {
		context.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	route.Run(`:%s`, "4000")
}
